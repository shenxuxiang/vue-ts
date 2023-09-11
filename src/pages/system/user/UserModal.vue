<script setup lang="ts">
import {
  Modal,
  message,
  Input,
  Select,
  Form,
  Checkbox,
  Cascader,
  Radio,
} from "ant-design-vue";
import { ref, reactive, shallowReactive, watch } from "vue";
import { formatRegionCode, encrypto } from "@/utils";
import type { FormInstance } from "ant-design-vue";

const props = withDefaults(defineProps<UserModalProps>(), {});

const { TextArea, Password } = Input;

type UserModalProps = {
  open: boolean;
  userId: string;
  close: () => void;
  success: () => void;
  regionList: Array<any>;
  addUser: (query: any) => Promise<any>;
  updateUser: (query: any) => Promise<any>;
  getUserDetail: (userId: string) => Promise<any>;
  roleList: Array<{ label: string; value: string | number }>;
  dictIdTypeList: Array<{ label: string; value: string | number }>;
};

const FormItem = Form.Item;
const useForm = Form.useForm;

const loading = ref(false);
const formRef = ref<FormInstance>();
const labelCol = reactive({ span: 4 });
const wrapperCol = reactive({ span: 18 });
const formModels = ref({
  phone: "",
  status: 1,
  username: "",
  idNumber: "",
  realName: "",
  dictIdType: null! as string,
  description: "",
  password: "sqal@145680",
  clientTypeList: ["end"],
  roleIdList: [] as string[],
  regionCode: [] as string[],
});

const rules = shallowReactive({
  status: [{ required: true, message: "状态不能为空！" }],
  realName: [{ required: true, message: "姓名不能为空！" }],
  username: [{ required: true, message: "用户名不能为空！" }],
  roleIdList: [{ required: true, message: "角色不能为空！" }],
  idNumber: [{ required: true, message: "证件号码不能为空！" }],
  regionCode: [{ required: true, message: "行政区不能为空！" }],
  dictIdType: [{ required: true, message: "证件类型不能为空！" }],
  clientTypeList: [{ required: true, message: "客户端不能为空！" }],
  phone: [
    { required: true, message: "手机号不能为空！" },
    { pattern: /^1(3|4|5|7|8|9)\d{9}$/, message: "手机号码格式不正确！" },
  ],
  password: [
    { required: true, message: "密码不能为空！" },
    {
      message:
        "密码必须包含字母、数字、特殊字符（~!@#$%），密码长度必须满足8-16位",
      pattern:
        /^(?=.*\d+)(?=.*[~!@#$%]+)(?=.*[A-Za-z]+)[0-9a-zA-Z~!@#$%]{8,16}$/,
    },
  ],
});

// 获取用户详情
watch([() => props.open, () => props.userId], _getUserDetail);

const { validate, resetFields, validateInfos } = useForm(formModels, rules);

function afterClose() {
  resetFields();
}

function handleOk() {
  validate().then(() => {
    const params: any = { ...formModels.value };
    params.regionCode = params.regionCode.slice(-1)[0];

    loading.value = true;

    if (props.userId) {
      delete params.password;
      params.userId = props.userId;
      props
        .updateUser(params)
        .then((res: any) => {
          if (res.code === 0) {
            message.success("用户编辑成功！");
            props.success();
          }
        })
        .finally(() => (loading.value = false));
    } else {
      props
        .addUser({ ...params, password: encrypto(params.password) })
        .then((res: any) => {
          if (res.code === 0) {
            message.success("用户新增成功！");
            props.success();
          }
        })
        .finally(() => (loading.value = false));
    }
  });
}

function handleCancel() {
  if (loading.value) {
    message.warning("正在提交，无法取消！");
    return;
  }

  props.close();
}

function _getUserDetail() {
  if (props.userId && props.open) {
    props.getUserDetail(props.userId).then((res: any) => {
      const { code, data } = res;
      if (code === 0) {
        console.log(data);
        const {
          phone,
          status,
          username,
          idNumber,
          realName,
          roleList,
          dictIdType,
          regionCode,
          description,
          clientTypeList,
        } = data;

        formModels.value = {
          phone,
          status,
          username,
          idNumber,
          realName,
          dictIdType,
          description,
          clientTypeList,
          password: "sqal@145680",
          regionCode: formatRegionCode(regionCode),
          roleIdList: roleList.map((role: any) => role.roleId),
        };
      }
    });
  }
}
</script>

<template>
  <Modal
    title="新增用户"
    :open="open"
    :width="800"
    :closable="false"
    :maskClosable="false"
    :afterClose="afterClose"
    :confirmLoading="loading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <Form ref="formRef" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <FormItem name="username" label="用户名" v-bind="validateInfos.username">
        <Input
          v-model:value="formModels.username"
          autoComplete="off"
          placeholder="请输入用户名"
          :disabled="!!userId"
        />
      </FormItem>
      <FormItem name="password" label="密码" v-bind="validateInfos.password">
        <Password
          v-model:value="formModels.password"
          autoComplete="off"
          placeholder="请输入密码"
          :disabled="!!userId"
        />
      </FormItem>
      <FormItem
        name="roleIdList"
        label="角色"
        v-bind="validateInfos.roleIdList"
      >
        <Select
          v-model:value="formModels.roleIdList"
          mode="multiple"
          placeholder="请选择角色名称"
          :options="roleList"
        />
      </FormItem>
      <FormItem
        name="clientTypeList"
        label="客户端"
        v-bind="validateInfos.clientTypeList"
      >
        <Checkbox.Group v-model:value="formModels.clientTypeList">
          <Checkbox value="end">WEB 端</Checkbox>
          <Checkbox value="app">APP 端</Checkbox>
        </Checkbox.Group>
      </FormItem>
      <template v-if="formModels.clientTypeList.includes('end')">
        <FormItem
          name="regionCode"
          label="行政区"
          v-bind="validateInfos.regionCode"
        >
          <Cascader
            v-model:value="formModels.regionCode"
            changeOnSelect
            placeholder="请选择所属行政区"
            :options="regionList"
          />
        </FormItem>
      </template>
      <FormItem name="realName" label="姓名" v-bind="validateInfos.realName">
        <Input
          v-model:value="formModels.realName"
          placeholder="请输入姓名"
          :disabled="!!userId"
        />
      </FormItem>
      <FormItem
        name="dictIdType"
        label="证件类型"
        v-bind="validateInfos.dictIdType"
      >
        <Select
          v-model:value="formModels.dictIdType"
          placeholder="请选择证件类型"
          :options="dictIdTypeList"
        />
      </FormItem>
      <FormItem
        name="idNumber"
        label="证件号码"
        v-bind="validateInfos.idNumber"
      >
        <Input
          v-model:value="formModels.idNumber"
          placeholder="请输入证件号码"
        />
      </FormItem>
      <FormItem name="phone" label="手机号" v-bind="validateInfos.phone">
        <Input
          v-model:value="formModels.phone"
          style="width: 100%"
          placeholder="请输入手机号"
          :maxLength="11"
        />
      </FormItem>

      <FormItem name="status" label="状态" v-bind="validateInfos.status">
        <Radio.Group v-model:value="formModels.status">
          <Radio :value="1">启用</Radio>
          <Radio :value="2">禁用</Radio>
        </Radio.Group>
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
