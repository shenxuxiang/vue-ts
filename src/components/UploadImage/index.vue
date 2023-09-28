<script setup lang="ts">
  import PreviewImage from '@/components/PreviewImage';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { ref, nextTick, watch } from 'vue';
  import RenderItem from './RenderItem.vue';
  import { message } from 'ant-design-vue';

  export type FileList = {
    uid: string;
    name: string;
    url?: string;
    response?: any;
    percent?: number;
    rowSource?: File;
    status?: 'loading' | 'done' | 'error' | 'remove';
  }[];
  
  type UploadImageProps = {
    action: string;
    method?: string;
    maxSize?: number;
    maxCount?: number;
    multiple?: boolean;
    fileList?: FileList;
    previewFile?: (url: string) => void;
    headers?: () => { [key: string]: any };
  };

  type UploadImageEmits = {
    (e: 'error', error: any): void;
    (e: 'update:fileList', fileList: FileList): void;
  }

  const emit = defineEmits<UploadImageEmits>();
  const props = withDefaults(defineProps<UploadImageProps>(), {});

  
  const _fileList = ref<FileList>([]);
  const inputRef = ref<HTMLInputElement>();
  const uploadButtonRef = ref<HTMLLIElement>();

  const previewIdx = ref<number>(0);
  const previewImgs = ref<string[]>([]);
  const showPreviewImage = ref(false);

  watch(
    () => props.fileList, 
    function() {
      if (props.fileList === _fileList.value) return;

      _fileList.value = props.fileList!;
    },
    { immediate: true }
  );

  function handleFileChange(event: any) {
    let newFiles: File[] = Array.from(event.target.files);
    // 需要每次都将 input.value 给清空，这样用户再次上传时就可以选择相同的文件了。
    inputRef.value!.value = '';

    if (props.maxCount &&  _fileList.value.length >= props.maxCount) return;

    if (props.maxSize) {
      let length = newFiles.length;
      while (length--) {
        const file = newFiles[length];
        if (file.size > props.maxSize!) {
          newFiles.splice(length, 1);
          message.warning(file.name + '文件过大无法上传！');
        }
      }

      if (newFiles.length <= 0) return;
    }

    if (props.maxCount) {
      const surplus = props.maxCount - _fileList.value.length;
      newFiles = newFiles.slice(0, surplus);
    }

    const newFileList = newFiles.map(file => ({
      percent: 0,
      uid: Math.random().toString(32).slice(2) + Date.now(),
      name: file.name,
      rowSource: file,
      status: 'loading' as FileList[number]['status'],
    }));

    _fileList.value.push(...newFileList);
    triggerUpdateFileList();
    // 需要每次都将 input.value 给清空，这样用户再次上传时就可以选择相同的文件了。
    inputRef.value!.value = '';

    // 每次上传时，给上传按钮一个向右移动的动效。
    uploadButtonRef.value!.classList.add('enter-from');
    requestAnimationFrame(() => uploadButtonRef.value!.classList.remove('enter-from'));
  }

  function handleClick() {
    inputRef.value?.click();
  }

  // 图片上传成功
  function handleUploadSuccess(uid: string, res: any) {
    const target = _fileList.value.find(file => file.uid === uid);
    if (target) {
      target.status = 'done';
      target.percent = 100;
      target.response = res;
      triggerUpdateFileList();
    }
  }

  // 图片上传失败
  function handleUploadError(uid: string, error: any) {
    emit('error', error);
    const target = _fileList.value.find(file => file.uid === uid);
    if (target) {
      target.status = 'error';
      triggerUpdateFileList();
    }
  }

  // 移除
  function handleRemoveItem(uid: string) {
    _fileList.value = _fileList.value.filter(file => file.uid !== uid);
    triggerUpdateFileList();
  }

  function handlePreviewImage(url: string) {
    if (props.previewFile) {
      props.previewFile(url);
    } else {
      previewImgs.value = [url];
      showPreviewImage.value=  true;
    }
  }

  // 触发 'update:fileList' 事件
  function triggerUpdateFileList() {
    nextTick(() => emit('update:fileList', _fileList.value));
  }
</script>

<template>
  <div class="qm-vnit-upload-image">
    <ul :class="['qm-vnit-upload-image-list']">
      <template v-for="file in _fileList" :key="file.uid">
        <RenderItem
          v-bind="file"
          :metod="method"
          :action="action" 
          :headers="headers"
          @error="handleUploadError"
          @remove="handleRemoveItem"
          @preview="handlePreviewImage"
          @success="handleUploadSuccess"
        >
          <template #itemRender="{ src }">
            <slot name="itemRender" :src="src" />
          </template>
        </RenderItem>
      </template>
      <li v-show="!maxCount || _fileList.length < maxCount" class="qm-vnit-upload-image-label"  @click="handleClick" ref="uploadButtonRef">
        <slot name="default">
          <div class="qm-vnit-upload-image-slot">
            <PlusOutlined style="font-size: 16px; margin-bottom: 10px; color: rgba(0, 0, 0, 0.8);"/>
            <div>上传图片</div>
          </div>
        </slot>
        <input type="file" :multiple="multiple" style="display: none" ref="inputRef" @change="handleFileChange"/>
      </li>
    </ul>
  </div>
  <template v-if="!previewFile">
    <Teleport to="body">
      <PreviewImage
        :pageSize="1"
        :imgs="previewImgs"
        :index="previewIdx"
        :open="showPreviewImage"
        @close="showPreviewImage=!showPreviewImage"
      />
    </Teleport>
  </template>
</template>

<style lang="less">
  .qm-vnit-upload-image-label {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 102px;
    height: 102px;
    margin-bottom: 8px;
    border-radius: 8px;
    border: 1px dashed #d9d9d9;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.02);
    transition: all .3s ease;
    &:hover {
      border-color: #1677ff;
    }
    &.enter-from {
      transition: none;
      transform: translateX(-100px);
    }
  }
  .qm-vnit-upload-image-slot {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .qm-vnit-upload-image-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-content: flex-start;
  }
</style>

