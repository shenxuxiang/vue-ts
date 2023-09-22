<script setup lang="ts">
import { ref, watch, computed, watchEffect } from "vue";
import { getTransformProperties } from "@/utils";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

type PreviewImageProps = {
  open: boolean;
  imgs: string[];
  pageSize: number;
  indicator: number;
};

type PreviewImageEvents = (e: "update:indicator", indicator: number) => void;

const props = withDefaults(defineProps<PreviewImageProps>(), {});
const emit = defineEmits<PreviewImageEvents>();
const sliderRef = ref<HTMLDivElement>();
const isFirstPage = ref(false);
const isLastPage = ref(false);

// 底部 bar 的宽度
const foodBarWidth = computed(() => {
  if (props.imgs.length < props.pageSize) {
    return props.imgs.length * 120 + 68 + "px";
  } else {
    return props.pageSize * 120 + 68 + "px";
  }
});

watch(
  [
    () => props.open,
    () => props.imgs,
    () => props.pageSize,
    () => props.indicator,
  ],
  sliderAnimation,
);

// 计算 isFirstPage、isLastPage
watchEffect(() => {
  const { imgs, pageSize, indicator } = props;
  if (imgs.length <= pageSize) {
    isFirstPage.value = true;
    isLastPage.value = true;
    return;
  }

  if (indicator <= pageSize / 2) {
    isFirstPage.value = true;
    isLastPage.value = false;
  } else if (indicator > imgs.length - pageSize / 2) {
    isFirstPage.value = false;
    isLastPage.value = true;
  } else {
    isFirstPage.value = false;
    isLastPage.value = false;
  }
});

function sliderAnimation() {
  if (!sliderRef.value || !props.open) return;

  const { imgs, pageSize, indicator } = props;
  const idx = indicator + 1;
  const length = imgs.length;

  // 如果 imgs 的长度小于 pageSize 则不需要滑动动效（偏移量始终都是 0）。
  if (length <= pageSize) {
    sliderRef.value!.style.cssText = `
        transform: translate3d(0px, 0px, 0px);
        transition: transform 0s ease;
      `;
    return;
  }

  let cssText = "";
  const half = pageSize / 2;

  if (idx <= half) {
    cssText = `transform: translate3d(0px, 0px, 0px); transition: transform 0.3s ease;`;
  } else if (idx > length - half) {
    cssText = `transform: translate3d(${
      (pageSize - length) * 120
    }px, 0px, 0px); transition: transform 0.3s ease;`;
  } else {
    const distance = -(idx - half - 0.5) * 120;
    cssText = `transform: translate3d(${distance}px, 0px, 0px); transition: transform 0.3s ease;`;
  }

  sliderRef.value!.style.cssText = cssText;
}

function handleChangeIndicator(index: number) {
  emit("update:indicator", index);
}

// 上一页
function handlePrevPage() {
  // 第一页
  if (isFirstPage.value) return;
  isLastPage.value = false;

  const { translateX } = getTransformProperties(sliderRef.value!);
  let distance = translateX + props.pageSize * 120;
  if (distance >= 0) {
    distance = 0;
    isFirstPage.value = true;
  } else {
    isFirstPage.value = false;
  }
  sliderRef.value!.style.cssText = `transform: translate3d(${distance}px, 0px, 0px); transition: transform 0.3s ease;`;
}

// 下一页
function handleNextPage() {
  // 最后一页
  if (isLastPage.value) return;
  isFirstPage.value = false;

  const { translateX } = getTransformProperties(sliderRef.value!);
  const max = (props.imgs.length - props.pageSize) * 120;

  let distance = translateX - props.pageSize * 120;
  if (distance <= -max) {
    distance = -max;
    isLastPage.value = true;
  } else {
    isLastPage.value = false;
  }
  sliderRef.value!.style.cssText = `transform: translate3d(${distance}px, 0px, 0px); transition: transform 0.3s ease;`;
}
</script>

<template>
  <div class="qm-vnit-preview-image-bar" :style="{ width: foodBarWidth }">
    <div
      :class="['qm-vnit-preview-image-prevpage', { disabled: isFirstPage }]"
      @click="handlePrevPage"
    >
      <Icon name="arrow-left-bold" style="font-size: 30px" />
    </div>
    <div
      :class="['qm-vnit-preview-image-nextpage', { disabled: isLastPage }]"
      @click="handleNextPage"
    >
      <Icon name="arrow-right-bold" style="font-size: 30px" />
    </div>
    <div class="qm-vnit-preview-image-bar-slider-x">
      <ul ref="sliderRef" class="qm-vnit-preview-image-bar-slider">
        <template v-for="(item, index) in imgs" :key="item + index">
          <li
            :class="[
              'qm-vnit-preview-image-bar-slider-item',
              { active: index === indicator },
            ]"
            @click="handleChangeIndicator(index)"
          >
            <Image :src="item" alt="" />
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style lang="less">
.qm-vnit-preview-image-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  margin: auto;
  background: rgba(255, 255, 255, 0.2);
}
.qm-vnit-preview-image-prevpage,
.qm-vnit-preview-image-nextpage {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 34px;
  height: 100%;
  color: rgba(255, 255, 255, 0.2);
  line-height: 1;
  background-color: rgba(255, 255, 255, 0);
  transition: all 0.3s ease;
  cursor: pointer;
  &.disabled {
    cursor: not-allowed;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease 0.1s;
  }
}
.qm-vnit-preview-image-prevpage {
  left: 0;
}
.qm-vnit-preview-image-nextpage {
  right: 0;
}
.qm-vnit-preview-image-bar-slider-x {
  width: 100%;
  height: 100px;
  border-color: transparent;
  border-style: solid;
  border-width: 0 34px;
  overflow: hidden;
  box-sizing: border-box;
}
.qm-vnit-preview-image-bar-slider {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
  list-style: none;
  margin: 0;
  padding: 10px 0;
}
.qm-vnit-preview-image-bar-slider-item {
  flex-shrink: 0;
  width: 100px;
  height: 80px;
  margin: 0 10px;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  font-size: 0;
  line-height: 80px;
  text-align: center;
  user-select: none;
  transition: transform 0.3s ease;
  &.active {
    outline: 2px solid #1677ff;
    transform: scale(1.1);
  }
  & img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    vertical-align: middle;
  }
}
</style>
