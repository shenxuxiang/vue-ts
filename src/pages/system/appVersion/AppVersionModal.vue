<script setup lang="ts">
import { ref, shallowRef, watch } from "vue";
import { Modal, Input, Radio, Form, message } from "ant-design-vue";
import UploadFile from "@/components/UploadFile";
import { getToken } from "@/utils";

type AppVersionModalProps = {
  open: boolean;
  close: () => void;
  success: () => void;
  appVersionId: string;
  addAppVersion: (query: any) => Promise<any>;
  updateAppVersion: (query: any) => Promise<any>;
  queryAppVersionDetail: (query: any) => Promise<any>;
};

const props = withDefaults(defineProps<AppVersionModalProps>(), {});
const { TextArea } = Input;
const labelCol = { span: 4 };
const wrapperCol = { span: 18 };
const { useForm, Item: FormItem } = Form;
const headers = { Authorization: getToken() };

const loading = ref(false);
const formModels = ref({
  clientType: 1,
  updateType: 1,
  appName: "阡陌农服",
  content: "",
  version: "",
  url: [] as any[],
});

const rules = shallowRef({
  url: [{ required: true, message: "上传安装包不能为空！" }],
  version: [{ required: true, message: "版本号不能为空！" }],
  appName: [{ required: true, message: "APP名称不能为空！" }],
  content: [{ required: true, message: "更新内容不能为空！" }],
  updateType: [{ required: true, message: "更新类型不能为空！" }],
  clientType: [{ required: true, message: "客户端类型不能为空！" }],
});

const { validate, resetFields, validateInfos } = useForm(formModels, rules);

watch([() => props.open, () => props.appVersionId], async () => {
  if (props.open && props.appVersionId) {
    try {
      const { code, data }: any = await props.queryAppVersionDetail(
        props.appVersionId,
      );
      if (code === 0) {
        const { version, clientType, updateType, url, content, appName } = data;
        formModels.value = {
          appName,
          content,
          version,
          clientType: clientType,
          updateType: updateType,
          url: [
            { url: url, uid: Math.random().toString(32).slice(2), name: url },
          ],
        };
      }
    } catch (error) {}
  }
});

async function handleOk() {
  try {
    await validate();

    const params = { ...formModels.value };
    params.url =
      formModels.value.url[0].url || formModels.value.url[0].response.data.path;

    let res: any;
    if (props.appVersionId) {
      res = await props.updateAppVersion({
        ...params,
        appVersionId: props.appVersionId,
      });
    } else {
      res = await props.addAppVersion(params);
    }

    if (res.code === 0) {
      message.success(props.appVersionId ? "修改成功！" : "新增成功！");
      props.success();
    }
  } catch (error) {}
}

function handleCancel() {
  if (loading.value) {
    message.warning("正在提交，不可取消！");
    return;
  }

  props.close();
}

function afterclose() {
  resetFields();
}

watch(
  () => formModels.value.url,
  () => {
    console.log(formModels.value.url);
  },
);
</script>

<template>
  <Modal
    :open="open"
    :width="720"
    :closable="false"
    :maskClosable="false"
    :afterClose="afterclose"
    :title="appVersionId ? '编辑' : '新增'"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <Form :labelCol="labelCol" :wrapperCol="wrapperCol">
      <FormItem name="appName" label="APP名称" v-bind="validateInfos.appName">
        <Input
          v-model:value="formModels.appName"
          placeholder="请输入APP名称"
          disabled
        />
      </FormItem>
      <FormItem name="version" label="版本号" v-bind="validateInfos.version">
        <Input
          v-model:value="formModels.version"
          placeholder="如：V1.0.0"
          :disabled="!!appVersionId"
        />
      </FormItem>
      <FormItem
        name="clientType"
        label="客户端类型"
        v-bind="validateInfos.clientType"
      >
        <Radio.Group
          v-model:value="formModels.clientType"
          :disabled="!!appVersionId"
        >
          <Radio :value="1">Android</Radio>
          <Radio :value="2">Ios</Radio>
        </Radio.Group>
      </FormItem>
      <FormItem
        name="updateType"
        label="更新类型"
        v-bind="validateInfos.updateType"
      >
        <Radio.Group v-model:value="formModels.updateType">
          <Radio :value="1">强制更新</Radio>
          <Radio :value="2">强提示更新</Radio>
          <Radio :value="3">弱提示更新</Radio>
        </Radio.Group>
      </FormItem>
      <FormItem name="content" label="更新内容" v-bind="validateInfos.content">
        <TextArea
          v-model:value="formModels.content"
          placeholder="最多200字"
          :rows="5"
        />
      </FormItem>

      <FormItem name="url" label="上传安装包" v-bind="validateInfos.url">
        <UploadFile
          v-model:fileList="formModels.url"
          listType="picture"
          action="/v1.0/file/upload"
          :maxCount="1"
          :multiple="false"
          :headers="headers"
          :disabled="!!appVersionId"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
