<script setup lang="ts">
  import Image from './Image.vue'; 
  import PreviewImage from '@/components/PreviewImage';
  import { ref, computed, CSSProperties, VNode } from 'vue';

  export type ImageGroupSlots = { default: () => Array<VNode> };
  export type ImageGroupProps = { 
    class?: string;
    bordered?: boolean
    options?: string[];
    style?: string | CSSProperties;
  };


  const slots = defineSlots<ImageGroupSlots>();
  defineOptions({ inheritAttrs: false });
  const props = withDefaults(defineProps<ImageGroupProps>(), { bordered: true });

  const indicator = ref(0);
  const className = props.class;
  const showPreview = ref(false);
  const children = computed(() => slots.default?.() ?? []);
  const imgs = computed(() => children.value.map(item => item.props!.src));

  function handlePreview (index: number) {
    indicator.value = index;
    showPreview.value = true;
  }
</script>

<template>
  <ul class="qm-vnit-image-group">
    <template v-if="options">
      <li 
        v-for="(item, index) in options" 
        :key="index" 
        :style="style"
        :class="['qm-vnit-image-group-item', className, { bordered }]" 
        @click="handlePreview(index)"
      >
        <Image :src="item" />
      </li>
    </template>
    <template v-else-if="children">
      <li 
        v-for="(item, index) in children" 
        :key="index" 
        :style="style"
        :class="['qm-vnit-image-group-item', className, { bordered }]" 
        @click="handlePreview(index)"
      >
        <component :is="item" v-bind="item.props" ></component>
      </li>
    </template>
  </ul>
  <Teleport to="body">
    <PreviewImage 
      :imgs="imgs"
      :index="indicator"
      :open="showPreview"
      @close="showPreview=false"
    />
  </Teleport>
</template>

<style lang="less">
  .qm-vnit-image-group {
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    list-style: none;
  }
  .qm-vnit-image-group-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 102px;
    height: 102px;
    margin: 0 8px 8px 0;
    box-sizing: border-box;
    cursor: pointer;
    &.bordered {
      padding: 8px;
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      background: #fff;
    }
    &::after {
      display: flex;
      justify-content: center;
      align-items: center;
      content: '预览';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      color: #fff;
      opacity: 0;
      background: rgba(0, 0, 0, 0.5);
      transition: opacity .3s ease-out;
    }
    &.bordered::after {
      top: 8px;
      bottom: 8px;
      left: 8px;
      right: 8px;
    }
    &:hover::after {
      opacity: 1;
      transition-delay: 50ms;
    }
  }
  .qm-vnit-image-group-item img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
</style>
