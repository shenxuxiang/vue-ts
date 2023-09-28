<script setup lang="ts">
import { throttle, getViewportSize, getTransformProperties } from "@/utils";
import Icon from "@/components/Icon";
import ToolBar from "./ToolBar.vue";
import Slider from "./Slider.vue";
import { ref, watch } from "vue";

export type PreviewImageProps = {
  pageSize?: number;
  imgs: string[];
  index?: number;
  open: boolean;
};

type PreviewImageEvents = {
  (e: "update:index", index: number): void;
  (e: "close"): void;
};

const props = withDefaults(defineProps<PreviewImageProps>(), {
  pageSize: 9,
  index: 0,
});
const emit = defineEmits<PreviewImageEvents>();
// 开关，表示用户正在拖拽图片（当为true时，图片将跟随用户鼠标进行移动）
let _isMoveing = false;
// 鼠标指针起始位置
const _mouseOriginPoint = { x: 0, y: 0 };
// 原始点位
const _originPoint = { x: 0, y: 0 };

const imgRef = ref<HTMLImageElement>();
const imgXRef = ref<HTMLDivElement>();
// 指示器（当前展示的是第几张图片）
const indicator = ref(0);

watch(
  () => props.index,
  () => {
    if (props.index === indicator.value) return;
    indicator.value = props.index!;
  },
  { immediate: true },
);

// 监听 mousewheel 事件，对图片进行缩放
const onMouseWheel = throttle(scrollMouseWheel, 50);
// 监听 mousemove 事件，对图片进行拖拽
const onMouseMove = throttle(handleMouseMove, 20);

// 当用户放开鼠标时触发。
function handleMouseUp(event: any) {
  event.preventDefault();
  const { offsetWidth, offsetHeight } = imgRef.value!;
  const { scaleX, scaleY } = getTransformProperties(imgRef.value!);

  const width = Math.abs(offsetWidth * scaleX);
  const height = Math.abs(offsetHeight * scaleY);
  const viewportSize = getViewportSize();

  if (width <= viewportSize.width && height <= viewportSize.height) {
    imgXRef.value!.style.cssText = `
        transform: translate3d(0px, 0px, 0px); 
        transition: transform .3s ease;
      `;
  } else {
    let limitedX = 0;
    let limitedY = 0;

    if (width > viewportSize.width) {
      limitedX = (width - viewportSize.width) / 2;
    }

    if (height > viewportSize.height) {
      limitedY = (height - viewportSize.height) / 2;
    }

    let { translateX, translateY } = getTransformProperties(imgXRef.value!);

    if (limitedX) {
      if (translateX > limitedX) {
        translateX = limitedX;
      } else if (translateX < -limitedX) {
        translateX = -limitedX;
      }
    } else {
      translateX = 0;
    }

    if (limitedY) {
      if (translateY > limitedY) {
        translateY = limitedY;
      } else if (translateY < -limitedY) {
        translateY = -limitedY;
      }
    } else {
      translateY = 0;
    }

    imgXRef.value!.style.cssText = `
        transform: translate3d(${translateX}px, ${translateY}px, 0px); 
        transition: transform .3s ease;
      `;
  }

  _isMoveing = false;
}
// 图片开始拖拽事件
function handleDragStart(event: any) {
  // 阻止默认行为，这样可以避免触发img元素的拖拽。
  event.preventDefault();
  _isMoveing = true;
  const { translateX, translateY } = getTransformProperties(imgXRef.value!);
  _mouseOriginPoint.x = event.clientX;
  _mouseOriginPoint.y = event.clientY;
  _originPoint.x = translateX;
  _originPoint.y = translateY;
}
// 当鼠标在 imgXRef 元素上移动时，图片将跟随鼠标移动
function handleMouseMove(event: any) {
  if (!_isMoveing) return;

  event.preventDefault();
  const { clientX, clientY } = event;
  const distanceX = clientX - _mouseOriginPoint.x;
  const distanceY = clientY - _mouseOriginPoint.y;
  // 注意，并不是图片在移动，而是图片外层的div容器在移动。
  // 并且，每次移动都是相对 dragStart 事件开始时的 _originPoint 点位进行计算，
  // 偏移量则是相对 dragStart 事件的 clientX、clientY 进行计算
  imgXRef.value!.style.cssText = `
      transform: translate3D(${_originPoint.x + distanceX}px, ${
        _originPoint.y + distanceY
      }px, 0px); 
    `;
}
// 鼠标滚轮事件
function scrollMouseWheel(event: any) {
  if (event.deltaY < 0) {
    handleEnlarge();
  } else {
    handleShrink();
  }
  // 每当鼠标滚轮滑动时，将重置 imgXRef 元素的位置。
  imgXRef.value!.style.cssText = `transform: translate3D(0px, 0px, 0px);`;
}
// 缩小
function handleShrink() {
  const { scaleX, scaleY, rotate } = getTransformProperties(imgRef.value!);

  let x = scaleX * 0.8;
  let y = scaleY * 0.8;
  if (Math.abs(x) < 1) x = Math.sign(x);
  if (Math.abs(y) < 1) y = Math.sign(y);

  imgRef.value!.style.cssText = `transform: scale(${x}, ${y}) rotate(${rotate}deg);`;
}
// 放大
function handleEnlarge() {
  const { scaleX, scaleY, rotate } = getTransformProperties(imgRef.value!);
  imgRef.value!.style.cssText = `transform: scale(${scaleX * 1.25}, ${
    scaleY * 1.25
  }) rotate(${rotate}deg);`;
}

function handleChangeIndicator(index: number) {
  indicator.value = index;
  emit("update:index", index);
  imgRef.value!.style.cssText = "";
  imgXRef.value!.style.cssText = "";
}

// 上一张
function handlePrevItem() {console.log(1111)
  if (indicator.value <= 0) return;
  handleChangeIndicator(indicator.value - 1);
}
// 下一张
function handleNextItem() {console.log(2222)
  if (indicator.value >= props.imgs.length - 1) return;
  handleChangeIndicator(indicator.value + 1);
}

// 关闭 PreviewImage 组件
function handleClosePreview(event: any) {
  if (event.target === event.currentTarget) {
    emit("close");
    setTimeout(() => {
      if (imgRef.value) imgRef.value.style.cssText = "";
      if (imgXRef.value) imgXRef.value.style.cssText = "";
    }, 300);
  }
}
</script>

<template>
  <transition name="previewImage">
    <section v-show="open" class="qm-vnit-preview-image">
      <!-- 图片预览部分 -->
      <div
        ref="imgXRef"
        class="qm-vnit-preview-image-x"
        @mousewheel="onMouseWheel"
        @mousemove="onMouseMove"
        @click="handleClosePreview"
      >
        <img
          ref="imgRef"
          :src="imgs[indicator]"
          @dragstart.stop="handleDragStart"
          @mouseup.stop="handleMouseUp"
        />
      </div>
      <!-- 顶部工具栏 -->
      <ToolBar :imageElement="imgRef!" @close="handleClosePreview" />
      <div
        :class="[
          'qm-vnit-preview-image-prev-buttton',
          { disabled: indicator <= 0 },
        ]"
        @click="handlePrevItem"
      >
        <Icon name="arrow-left-bold" style="font-size: 60px" />
      </div>
      <div
        :class="[
          'qm-vnit-preview-image-next-buttton',
          { disabled: indicator >= imgs.length - 1 },
        ]"
        @click="handleNextItem"
      >
        <Icon name="arrow-right-bold" style="font-size: 60px" />
      </div>
      <!-- 顶部滑块 -->
      <Slider
        :open="open"
        :imgs="imgs"
        :pageSize="pageSize"
        :indicator="indicator"
        @update:indicator="handleChangeIndicator"
      />
    </section>
  </transition>
</template>

<style lang="less">
.previewImage-enter-from,
.previewImage-leave-to {
  opacity: 0;
}
.previewImage-enter-active,
.previewImage-leave-active {
  transition: opacity 0.3s ease;
}

.qm-vnit-preview-image {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}
.qm-vnit-preview-image-x {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  & img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    cursor: grab;
    transition: transform 0.3s ease;
  }
}
.qm-vnit-preview-image-prev-buttton,
.qm-vnit-preview-image-next-buttton {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: calc(50% - 100px);
  width: 80px;
  height: 200px;
  background: rgba(255, 255, 255, 0);
  font-size: 50px;
  color: rgba(255, 255, 255, 0.2);
  line-height: 1;
  cursor: pointer;
  transition: all 0.3s ease 0.1s;
  z-index: 1;
  &.disabled {
    cursor: not-allowed;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease 0.1s;
  }
}
.qm-vnit-preview-image-prev-buttton {
  left: 0;
  border-radius: 0 4px 4px 0;
}
.qm-vnit-preview-image-next-buttton {
  right: 0;
  border-radius: 4px 0 0 4px;
}
</style>
