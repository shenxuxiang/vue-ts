<script setup lang="ts">
import "dayjs/locale/zh-cn";
import { reactive } from "vue";
import { RouterView } from "vue-router";
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
const theme = reactive({
  token: { colorPrimary: "#6C69FF", colorLink: "#6C69FF" },
});
</script>

<template>
  <ConfigProvider :locale="zhCN" :theme="theme">
    <RouterView />
  </ConfigProvider>
</template>
