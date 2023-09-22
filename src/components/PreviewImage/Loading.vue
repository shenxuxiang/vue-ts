<script setup lang="ts">
import { computed } from "vue";

type LoadingProps = {
  open: boolean;
  theme?: "light" | "dark" | string;
  size?: "default" | "large" | "small";
};

const props = withDefaults(defineProps<LoadingProps>(), {
  theme: "light",
  size: "default",
});

const dotColor = computed(() => {
  switch (props.theme) {
    case "light":
      return "#f2f2f2";
    case "dark":
      return "#b3b3b3";
    default:
      return props.theme;
  }
});
</script>

<template>
  <transition name="qm-vnit-loading">
    <div v-show="open" :class="['qm-vnit-loading', size]">
      <template v-for="n in 6" :key="n">
        <div class="qm-vnit-loading-dot" :style="{ background: dotColor }" />
      </template>
    </div>
  </transition>
</template>

<style lang="less">
.qm-vnit-loading-enter-from,
.qm-vnit-loading-leave-to {
  opacity: 0;
}
.qm-vnit-loading-enter-active,
.qm-vnit-loading-leave-active {
  transition: opacity 0.3s ease;
}

.qm-vnit-loading-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 100;
}
.qm-vnit-loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100px;
  height: 100px;
  margin: auto;
  z-index: 100;
  &.default {
    transform: scale(0.7);
  }
  &.small {
    transform: scale(0.5);
  }
  &.large {
    transform: scale(1);
  }
}
.qm-vnit-loading-dot {
  position: absolute;
  border-radius: 50%;
  background: #f2f2f2;
  animation: revolve_ani 2s cubic-bezier(0.25, 0.01, 0.1, 1) infinite;

  &:nth-child(1) {
    top: 0px;
    left: 40px;
    width: 20px;
    height: 20px;
    animation-delay: 0;
    transform-origin: 10px 50px;
    opacity: 0.99;
  }
  &:nth-child(2) {
    top: 2px;
    left: 42px;
    width: 16px;
    height: 16px;
    animation-delay: 110ms;
    transform-origin: 8px 48px;
    opacity: 0.9;
  }
  &:nth-child(3) {
    top: 3px;
    left: 43px;
    width: 14px;
    height: 14px;
    animation-delay: 220ms;
    transform-origin: 7px 47px;
    opacity: 0.8;
  }
  &:nth-child(4) {
    top: 4px;
    left: 44px;
    width: 12px;
    height: 12px;
    animation-delay: 330ms;
    transform-origin: 6px 46px;
    opacity: 0.7;
  }
  &:nth-child(5) {
    top: 6px;
    left: 46px;
    width: 8px;
    height: 8px;
    animation-delay: 440ms;
    transform-origin: 4px 44px;
    opacity: 0.6;
  }
  &:nth-child(6) {
    top: 7px;
    left: 47px;
    width: 6px;
    height: 6px;
    animation-delay: 550ms;
    transform-origin: 3px 43px;
    opacity: 0.5;
  }
}

@keyframes revolve_ani {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
