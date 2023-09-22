<script setup lang="ts">
import {
  Modal,
  Input,
  Select,
  Form,
  InputNumber,
  message,
} from "ant-design-vue";
import { ref, shallowRef, watch } from "vue";

type DictModalProps = {
  open: boolean;
  dictId: string;
  close: () => void;
  success: () => void;
  addSystemDict: (query: any) => Promise<any>;
  updateSystemDict: (query: any) => Promise<any>;
  querySystemDictDetail: (query: any) => Promise<any>;
  dictTypeList: Array<{ title: string; key: string | number }>;
};

const props = withDefaults(defineProps<DictModalProps>(), {});
const { TextArea } = Input;
const labelCol = { span: 4 };
const wrapperCol = { span: 18 };
const { useForm, Item: FormItem } = Form;

const loading = ref(false);
const formModels = ref({
  dictName: "",
  dictTypeCode: null! as string,
  sort: null! as number,
  description: "",
});
const rules = shallowRef({
  dictName: [{ required: true, message: "字典项名称不能为空！" }],
  dictTypeCode: [{ required: true, message: "字典类型不能为空！" }],
  sort: [{ required: true, message: "排序不能为空！" }],
});

const { validate, resetFields, validateInfos } = useForm(formModels, rules);

watch([() => props.open, () => props.dictId], async () => {
  if (props.open && props.dictId) {
    try {
      const { code, data } = await props.querySystemDictDetail(props.dictId);
      if (code === 0) {
        const { dictTypeCode, dictName, sort, description } = data;
        formModels.value = { dictTypeCode, dictName, sort, description };
      }
    } catch (error) {}
  }
});

async function handleOk() {
  loading.value = true;
  try {
    await validate();
    const params = { ...formModels.value };
    let res: any;
    if (props.dictId) {
      res = await props.updateSystemDict({ ...params, dictId: props.dictId });
    } else {
      res = await props.addSystemDict(params);
    }

    if (res.code === 0) {
      message.success(props.dictId ? "修改成功！" : "新增成功！");
      props.success();
    }
  } catch (error) {}

  loading.value = false;
}

function handleCancel() {
  if (loading.value) {
    message.warning("正在提交，不可取消！");
    return;
  }

  props.close();
}

function afterClose() {
  resetFields();
}
</script>

<template>
  <Modal
    :open="open"
    :width="600"
    :closable="false"
    :maskClosable="false"
    :afterClose="afterClose"
    :confirmLoading="loading"
    :title="dictId ? '编辑' : '新增'"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <Form :wrapperCol="wrapperCol" :labelCol="labelCol">
      <FormItem
        name="dictName"
        label="字典项名称"
        v-bind="validateInfos.dictName"
      >
        <Input
          v-model:value="formModels.dictName"
          placeholder="请输入字典项名称"
        />
      </FormItem>
      <FormItem
        name="dictTypeCode"
        label="字典类型"
        v-bind="validateInfos.dictTypeCode"
      >
        <Select
          v-model:value="formModels.dictTypeCode"
          allowClear
          placeholder="请选择字典类型"
        >
          <Select.Option
            v-for="item in dictTypeList"
            :key="item.key"
            :value="item.key"
          >
            {{ item.title }}
          </Select.Option>
        </Select>
      </FormItem>

      <FormItem name="sort" label="显示排序" v-bind="validateInfos.sort">
        <InputNumber
          v-model:value="formModels.sort"
          placeholder="请输入排序"
          :step="1"
          style="width: 100%"
        />
      </FormItem>
      <FormItem name="description" label="用户描述">
        <TextArea
          v-model:value="formModels.description"
          placeholder="请输入至少五个字符"
          :rows="5"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
