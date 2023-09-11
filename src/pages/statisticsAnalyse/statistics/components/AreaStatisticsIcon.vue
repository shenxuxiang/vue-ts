<script setup lang="ts">
import { toFixed } from "@/utils";

type AreaStatisticsIconProps = {
  bgColor: string;
  context: string | number;
  title: string;
};

withDefaults(defineProps<AreaStatisticsIconProps>(), {});
</script>

<template>
  <section class="area-statistics-icon-x">
    <div class="icon" :style="{ background: bgColor }">
      <slot name="icon"></slot>
    </div>
    <div class="information">
      <p class="title">{{ title }}</p>
      <p class="context">{{ toFixed(context, 1, 2) }}</p>
    </div>
  </section>
</template>

<style lang="less">
.area-statistics-icon-x {
  min-width: 200px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 24px;
}
.icon {
  width: 65px;
  height: 65px;
  font-size: 30px;
  color: #fff;
  text-align: center;
  line-height: 65px;
  border-radius: 100%;
}
.information {
  margin-left: 20px;
}
.title {
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 1.5;
}
.context {
  margin: 0;
  padding: 0;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5;
}
</style>
