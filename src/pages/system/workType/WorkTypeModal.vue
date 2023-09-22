<script setup lang="ts">
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  message,
} from "ant-design-vue";
import { reactive, shallowReactive, ref, watch } from "vue";

type WorkTypeModalProps = {
  open: boolean;
  jobTypeId: string;
  addSystemWorkType: (query: any) => Promise<any>;
  updateSystemWorkType: (query: any) => Promise<any>;
  getSystemWorkTypeDetail: (query: any) => Promise<any>;
  productTypeList: Array<{ label: string; value: string | number }>;
  onSuccess: () => void;
  onClose: () => void;
};

const props = withDefaults(defineProps<WorkTypeModalProps>(), {});
const labelCol = { span: 4 };
const wrapperCol = { span: 18 };
const { useForm, Item: FormItem } = Form;

const loading = ref(false);
const formModels = reactive({
  sort: "",
  jobTypeName: "",
  description: "",
  defaultWorkWidth: "",
  dictId: null! as string,
});
const rules = shallowReactive({
  dictId: [{ required: true, message: "所属生产环节不能为空！" }],
  jobTypeName: [{ required: true, message: "作业类型名称不能为空！" }],
  defaultWorkWidth: [{ required: true, message: "默认作业幅宽(米)不能为空！" }],
});

const { resetFields, validate, validateInfos } = useForm(formModels, rules);

watch([() => props.open, () => props.jobTypeId], _getSystemWorkTypeDetail);

function _getSystemWorkTypeDetail() {
  if (props.open && props.jobTypeId) {
    props.getSystemWorkTypeDetail(props.jobTypeId).then((res: any) => {
      const { code, data } = res;
      if (code === 0) {
        const { description, sort, dictId, jobTypeName, defaultWorkWidth } =
          data;
        Object.assign(formModels, {
          dictId,
          jobTypeName,
          description,
          sort,
          defaultWorkWidth,
        });
      }
    });
  }
}

async function handleOk() {
  loading.value = true;
  try {
    await validate();
    let res: any;
    if (props.jobTypeId) {
      res = await props.updateSystemWorkType({
        ...formModels,
        jobTypeId: props.jobTypeId,
      });
    } else {
      res = await props.addSystemWorkType(formModels);
    }

    if (res.code === 0) {
      message.success(props.jobTypeId ? "编辑成功！" : "新增成功！");
      props.onSuccess();
    }
  } catch (error) {}

  loading.value = false;
}

function handleCancel() {
  if (loading.value) {
    message.warning("正在提交，不可取消！");
    return;
  }
  props.onClose();
}

function afterClose() {
  resetFields();
}
</script>

<template>
  <Modal
    :width="800"
    :open="open"
    :closable="false"
    :maskClosable="false"
    :afterClose="afterClose"
    :title="props.jobTypeId ? '编辑' : '新增'"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <Form :labelCol="labelCol" :wrapperCol="wrapperCol">
      <FormItem
        name="dictId"
        label="所属生产环节"
        v-bind="validateInfos.dictId"
      >
        <Select
          v-model:value="formModels.dictId"
          placeholder="请选择所属生产环节"
          :options="productTypeList"
        />
      </FormItem>
      <FormItem
        name="jobTypeName"
        label="作业类型名称"
        v-bind="validateInfos.jobTypeName"
      >
        <Input
          v-model:value="formModels.jobTypeName"
          placeholder="请输入作业类型名称"
        />
      </FormItem>
      <FormItem name="sort" label="排序">
        <InputNumber
          v-model:value="formModels.sort"
          placeholder="请输入排序"
          style="width: 100%"
        />
      </FormItem>
      <FormItem
        name="defaultWorkWidth"
        label="默认作业幅宽"
        v-bind="validateInfos.defaultWorkWidth"
      >
        <InputNumber
          v-model:value="formModels.defaultWorkWidth"
          placeholder="请输入默认作业幅宽"
          style="width: 100%"
        />
      </FormItem>
      <FormItem name="description" label="用户描述">
        <Input
          v-model:value="formModels.description"
          placeholder="请输入用户描述"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
