<script setup lang="ts">
import {
  addSystemAppVersion,
  updateSystemAppVersion,
  queryAppVersionTableList,
  querySystemAppVersionDetail,
} from "@/services/systemAppVersion";
import ContentFormTable from "@/components/ContentFormTable";
import { Space, Button, Modal, Image } from "ant-design-vue";
import AppVersionModal from "./AppVersionModal.vue";
import { h, ref, shallowRef } from "vue";
import useMainStore from "@/store/main";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";

const mainStore = useMainStore();
const { userInfo } = storeToRefs(mainStore);
const { buttonNameList } = userInfo.value;

const appVersionId = ref("");
const showAppVersionModal = ref(false);
const tableRef = ref<InstanceType<typeof ContentFormTable>>();
const columns = shallowRef([
  {
    title: "APP名称",
    dataIndex: "appName",
  },
  {
    title: "客户端",
    dataIndex: "clientTypeName",
  },
  {
    title: "版本号",
    dataIndex: "version",
  },
  {
    title: "更新类型",
    dataIndex: "updateTypeName",
  },
  {
    title: "更新内容",
    dataIndex: "content",
  },
  {
    title: "下载地址",
    dataIndex: "url",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    sorter: true,
  },
  {
    title: "操作",
    dataIndex: "action",
  },
]);

function handleAddAppVersion() {
  showAppVersionModal.value = true;
  appVersionId.value = "";
}

function handleEdit(id: string) {
  showAppVersionModal.value = true;
  appVersionId.value = id;
}

function handleLookQrCode(src: string) {
  Modal.confirm({
    title: "预览图片",
    content: h(Image, { src, width: 300 }),
  });
}

function handleCloseModal() {
  showAppVersionModal.value = false;
}

function handleSuccessModal() {
  showAppVersionModal.value = false;
  tableRef.value?.forceUpdate();
}
</script>

<template>
  <section>
    <ContentFormTable
      ref="tableRef"
      rowKey="appVersionId"
      :columns="columns"
      :queryTableList="queryAppVersionTableList"
    >
      <template #extra>
        <Button type="primary" ghot @click="handleAddAppVersion">新增</Button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
          <Space>
            <template v-if="buttonNameList.includes('btn.appVersion.update')">
              <Button type="link" @click="handleEdit(record.appVersionId)">
                编辑
              </Button>
            </template>

            <Button type="link" @click="handleLookQrCode(record.qrCodeUrl)">
              查看二维码
            </Button>
          </Space>
        </template>

        <template v-else-if="column.dataIndex === 'updateTime'">
          {{ dayjs(record.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </template>
    </ContentFormTable>

    <AppVersionModal
      :close="handleCloseModal"
      :open="showAppVersionModal"
      :appVersionId="appVersionId"
      :success="handleSuccessModal"
      :addAppVersion="addSystemAppVersion"
      :updateAppVersion="updateSystemAppVersion"
      :queryAppVersionDetail="querySystemAppVersionDetail"
    />
  </section>
</template>
