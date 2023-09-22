<script setup lang="ts">
import { Upload, Button, message } from "ant-design-vue";
import type { UploadChangeParam } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { ref, watch } from "vue";

type UploadFileProps = {
  action: string;
  accept?: string;
  maxSize?: number;
  maxCount?: number;
  multiple?: boolean;
  disabled?: boolean;
  headers?: { [propName: string]: any };
  fileList?: UploadChangeParam["fileList"];
  listType?: "text" | "picture" | "picture-card";
};

const props = withDefaults(defineProps<UploadFileProps>(), {
  accept: "*",
  multiple: true,
  listType: "text",
});
const emit = defineEmits(["update:fileList"]);
// 当前文件数量，在限制文件上传数量时会被使用
let fileCount = props.fileList?.length ?? 0;
const _fileList = ref<UploadChangeParam["fileList"]>([]);

watch([() => props.fileList], () => {
  if (
    typeof props.fileList === "undefined" ||
    props.fileList === _fileList.value
  )
    return;
  _fileList.value = props.fileList;
  // 更新文件数量
  fileCount = props.fileList.length;
});

function handleFileChange(field: any) {
  const { maxSize, maxCount } = props;
  let newFileList = field.fileList;

  if (maxSize)
    newFileList = field.fileList.filter((file) => file.size! <= maxSize);

  if (maxCount) newFileList = newFileList.slice(0, maxCount);

  _fileList.value = newFileList;
  // 更新文件数量
  fileCount = newFileList.length;
  emit("update:fileList", newFileList);
}

function beforeUpload(file: UploadChangeParam["file"]) {
  const { size } = file;
  const { maxSize, maxCount } = props;
  if (maxSize && size! > maxSize) {
    message.warning("文件过大，无法上传！");
    return false;
  }
  if (maxCount && fileCount + 1 > maxCount) return false;
  fileCount++;
  return true;
}
</script>

<template>
  <Upload
    :accept="accept"
    :action="action"
    :headers="headers"
    :multiple="multiple"
    :disabled="disabled"
    :listType="listType"
    :file-list="_fileList"
    :beforeUpload="beforeUpload"
    @change="handleFileChange"
  >
    <slot>
      <Button :disabled="disabled"> 上传文件<UploadOutlined /> </Button>
    </slot>
  </Upload>
</template>
