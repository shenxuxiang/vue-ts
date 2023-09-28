<script setup lang="ts">
  import { ref, computed } from 'vue';
  import Icon from '@/components/Icon';
  import UploadImage from '@/components/UploadImage';
  import type { FileList } from '@/components/UploadImage';
  export type { FileList } from '@/components/UploadImage';

  type UploadVideoProps = {
    action: string;
    method?: string;
    maxSize?: number;
    maxCount?: number;
    multiple?: boolean;
    fileList?: FileList;
    headers?: () => { [key: string]: any };
  };

  type UploadVideoEmits = {
    (e: 'error', error: any): void;
    (e: 'update:fileList', fileList: FileList): void;
  };

  const emit = defineEmits<UploadVideoEmits>();
  const props = withDefaults(defineProps<UploadVideoProps>(), {});

  const videoURL = ref('');
  const videoRef = ref<HTMLVideoElement>();
  const localVideos = ref<FileList>([]);
  const showPreview = ref(false);
  const videoPreviewRef = ref<HTMLVideoElement>();

  const videoList = computed({
    get: () => props.fileList || localVideos.value,
    set: (value: FileList) => emit('update:fileList', value),
  });

  function handlePreviewFile(url: string) {
    videoURL.value = url;
    showPreview.value = true;
  }

  function handleCanPlay(event: any) {
    const video = event.target;
    const { videoWidth, videoHeight } = video;
    const ratio = videoWidth / videoHeight;
    const maxWidth = document.documentElement.clientWidth * 0.7;
    const maxHeight = document.documentElement.clientWidth * 0.8;

    let width;
    let height;

    if (ratio > maxWidth / maxHeight) {
      if (videoWidth > maxWidth) {
        width = maxWidth;
        height = width / ratio;
      } else {
        width = videoWidth;
        height = videoHeight;
      }
    } else {
      if (videoHeight > maxHeight) {
        height = maxHeight;
        width = height / ratio;
      } else {
        width = videoWidth;
        height = videoHeight;
      }
    }

    video.width = width;
    video.height = height;
  }

  function handleClosePreview(event: any) {
    if (event.target === event.currentTarget) {
      videoPreviewRef.value!.pause();
      showPreview.value = false;
      videoURL.value = '';
    }
  }
</script>

<template>
  <UploadImage 
    :action="action" 
    :method="method"
    :headers="headers" 
    :maxSize="maxSize"
    :multiple="multiple" 
    :maxCount="maxCount" 
    :previewFile="handlePreviewFile"
    v-model:fileList="videoList"
    @error="$emit('error', $event)"
  >
    <template #itemRender="{ src }">
      <video v-if="src" class="qm-vnit-upload-video" muted ref="videoRef" preload="auto">
        <source :src="src">
      </video>
    </template>
  </UploadImage>
  <Teleport to="body">
    <transition name="uploadVidePreview">
      <div v-if="showPreview" class="qm-vnit-upload-video-previewe" @click="handleClosePreview">
        <video
          controls 
          @canplay="handleCanPlay"
          ref="videoPreviewRef"
          class="qm-vnit-upload-video-preview-content"
        >
          <source :src="videoURL">
        </video>
        <Icon 
          name="close"
          class="qm-vnit-upload-video-preview-close-icon"
          @click="handleClosePreview"
        />
      </div>
    </transition>
  </Teleport>
</template> 

<style lang="less">
  .uploadVidePreview-enter-from, .uploadVidePreview-leave-to {
    opacity: 0;
  }
  .uploadVidePreview-enter-active, .uploadVidePreview-leave-active {
    transition: opacity .3s ease;
  }
  .qm-vnit-upload-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .qm-vnit-upload-video-previewe {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  .qm-vnit-upload-video-preview-content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .qm-vnit-upload-video-preview-close-icon {
    position: absolute;
    right: 20px;
    top: 20px;
    padding: 3px 8px;
    color: #fff;
    border-radius: 4px;
    font-size: 24px !important;
    background-color: rgba(255, 255, 255, 0);
    transition: background-color 0.3s ease;
    cursor: pointer;
    &:hover {
      transition-delay: 0.1s;
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
</style>
