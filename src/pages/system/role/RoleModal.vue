<script setup lang="ts">
import { ref, shallowReactive, watch } from "vue";
import { Modal, Form, Input, Radio, message } from "ant-design-vue";


type RoleModalProps = {
  open: boolean;
  roleId: string;
  close: () => void;
  success: () => void;
  addRole: (query: any) => Promise<any>;
  updateRole: (query: any) => Promise<any>;
  getRoleDetail: (query: any) => Promise<any>;
};

const props = withDefaults(defineProps<RoleModalProps>(), {});

const { TextArea } = Input;
const labelCol = ref({ span: 4 });
const wrapperCol = ref({ span: 18 });
const { useForm, Item: FormItem } = Form;

const loading = ref(false);

const formModels = ref({
  roleName: "",
  remark: "",
  status: 1,
});

const rules = shallowReactive({
  status: [{ required: true, message: "状态不能为空！" }],
  roleName: [{ required: true, message: "角色名称不能为空！" }],
});

const { validate, resetFields, validateInfos } = useForm(formModels, rules);

watch([() => props.open, () => props.roleId], _getRoleDetail);

async function handleOk() {
  loading.value = true;
  try {
    await validate();
    const params = { ...formModels.value };
    if (props.roleId) {
      const res = await props.updateRole({ ...params, roleId: props.roleId });
      if (res.code === 0) {
        message.success("编辑成功！");
        props.success();
      }
    } else {
      const res = await props.addRole(params);
      if (res.code === 0) {
        message.success("新增成功！");
        props.success();
      } 
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

function _getRoleDetail() {
  if (props.roleId && props.open) {
    props.getRoleDetail(props.roleId).then((res: any) => {
      const { code, data } = res;
      if (code === 0) {
        const { roleName, remark, status } = data;
        formModels.value = { roleName, remark, status };
      }
    });
  }
}

function afterClose() {
  resetFields();
}
</script>

<template>
  <Modal
    :open="open"
    :width="800"
    :closable="false"
    :maskClosable="false"
    :afterClose="afterClose"
    :confirmLoading="loading"
    :title="roleId ? '编辑角色' : '新增角色'"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <Form :labelCol="labelCol" :wrapperCol="wrapperCol">
      <FormItem
        name="roleName"
        label="角色名称"
        v-bind="validateInfos.roleName"
      >
        <Input
          v-model:value="formModels.roleName"
          placeholder="请输入角色名称"
        />
      </FormItem>

      <FormItem name="remark" label="名称描述">
        <TextArea
          v-model:value="formModels.remark"
          placeholder="请输入至少五个字符"
          :rows="3"
        />
      </FormItem>
      <FormItem name="status" label="状态" v-bind="validateInfos.status">
        <Radio.Group v-model:value="formModels.status">
          <Radio :value="1">启用</Radio>
          <Radio :value="2">禁用</Radio>
        </Radio.Group>
      </FormItem>
    </Form>
  </Modal>
</template>
