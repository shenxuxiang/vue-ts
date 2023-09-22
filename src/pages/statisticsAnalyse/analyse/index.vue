<script setup lang="ts">
import {
  queryProductAnalysisTableList,
  exportProductAnalysis,
} from "@/services/statisticsAnalyseOfAnalyse";
import { UpOutlined, DownOutlined } from "@ant-design/icons-vue";
import ContentFormTable from "@/components/ContentFormTable";
import { Button, DatePicker, message } from "ant-design-vue";
import { isEmpty, toFixed } from "@/utils";
import useMainStore from "@/store/main";
import { ref, computed, h } from "vue";
import MapComp from "./MapComp.vue";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";

const mainStore = useMainStore();
const { workSeasonList, productTypeList, workTypeList } =
  storeToRefs(mainStore);
const { queryWorkSeasonList, queryProductTypeList, queryWorkTypeList } =
  mainStore;

// 页面正在加载中。。。
const pageLoading = ref(true);

// 发送请求
const p1 = isEmpty(workTypeList.value) && queryWorkTypeList();
const p2 = isEmpty(workSeasonList.value) && queryWorkSeasonList();
const p3 = isEmpty(productTypeList.value) && queryProductTypeList();

// p1、p2、p3 并发请求，当所有请求完成后才会展示页面内容
Promise.all([p1, p2, p3].filter(Boolean)).finally(
  () => (pageLoading.value = false),
);

// 是否展开地图。默认展开地图
const expand = ref(true);

const columns = computed(() => [
  {
    title: "年份",
    dataIndex: "year",
    component: () => h(DatePicker, { picker: "year", style: "width: 100%" }),
    visibleInTable: false,
    dataFormat(value: any) {
      return { year: value.format("YYYY") };
    },
    initialValue: dayjs(),
  },
  {
    title: "作业季",
    dataIndex: "dictIdWorkSeason",
    formType: "select",
    options: workSeasonList.value,
    visibleInTable: false,
    initialValue: workSeasonList.value[0]?.value,
  },
  {
    title: "生产环节",
    dataIndex: "dictIdProductLinkList",
    formType: "select",
    options: productTypeList.value,
    visibleInTable: false,
    initialValue: productTypeList.value?.map?.((item) => item.value),
    properties: {
      mode: "multiple",
    },
  },
  {
    title: "县级行政区",
    dataIndex: "areaName",
  },
  {
    title: "镇级行政区",
    dataIndex: "streetName",
  },
  {
    title: "村级行政区",
    dataIndex: "villageName",
  },
  {
    title: "确权面积（亩）",
    dataIndex: "confirmArea",
  },
  {
    title: "作业总面积（亩）",
    dataIndex: "workArea",
  },
  {
    title: "环节全覆盖面积（亩）",
    dataIndex: "linkFullArea",
  },
  {
    title: "覆盖率",
    dataIndex: "coverageRate",
    sorter: {
      compare: (a: any, b: any) => a.coverageRate - b.coverageRate,
      multiple: 1,
    },
  },
  {
    title: "环节全覆盖规模户面积（亩）",
    dataIndex: "linkFullScaleUserArea",
    sorter: {
      compare: (a: any, b: any) =>
        a.linkFullScaleUserArea - b.linkFullScaleUserArea,
      multiple: 1,
    },
  },
  {
    title: "环节全覆盖小农户面积（亩）",
    dataIndex: "linkFullSmallFarmerArea",
    sorter: {
      compare: (a: any, b: any) =>
        a.linkFullSmallFarmerArea - b.linkFullSmallFarmerArea,
      multiple: 1,
    },
  },
  {
    title: "小农户占比",
    dataIndex: "smallPercent",
    sorter: {
      compare: (a: any, b: any) => a.smallPercent - b.smallPercent,
      multiple: 2,
    },
  },
  {
    title: "操作",
    dataIndex: "action",
  },
]);

function mapLocation() {
  window.scrollTo(0, 0);
  expand.value = true;
}

// 验证查询表单
function invalidate(values: any) {
  const { year, dictIdProductLinkList, dictIdWorkSeason } = values;
  if (!year) {
    message.warning("年份不能为空！");
    return false;
  }
  if (!dictIdWorkSeason) {
    message.warning("作业季不能为空！");
    return false;
  } else if (isEmpty(dictIdProductLinkList)) {
    message.warning("生产环节不能为空！");
    return false;
  } else {
    // 每次分析时，将地图折叠
    expand.value = false;
    return true;
  }
}
</script>

<template>
  <div v-if="!pageLoading" style="position: relative">
    <div :class="['map-container', { fold: !expand }]">
      <MapComp />
    </div>
    <ContentFormTable
      showExport
      rowKey="villageCode"
      submitButtonText="开始分析"
      exportFileName="生产环节覆盖分析"
      :columns="columns"
      :immediate="false"
      :beforeQueryAction="invalidate"
      :exportTableList="exportProductAnalysis"
      :queryTableList="queryProductAnalysisTableList"
    >
      <template #insertHeadNode>
        <Button type="link" @click="expand = !expand">
          <span v-if="expand"> 地图收起&nbsp; <UpOutlined /> </span>
          <span v-else> 地图展开&nbsp;<DownOutlined /> </span>
        </Button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'confirmArea'">
          {{ toFixed(record.confirmArea, 1, 2) }}
        </template>

        <template v-else-if="column.dataIndex === 'workArea'">
          {{ toFixed(record.workArea, 1, 2) }}
        </template>

        <template v-else-if="column.dataIndex === 'linkFullArea'">
          {{ toFixed(record.linkFullArea, 1, 2) }}
        </template>

        <template v-else-if="column.dataIndex === 'coverageRate'">
          {{ toFixed(record.coverageRate, 1, 2) }}
        </template>

        <template v-else-if="column.dataIndex === 'linkFullScaleUserArea'">
          {{ toFixed(record.linkFullScaleUserArea, 1, 2) }}
        </template>

        <template v-else-if="column.dataIndex === 'linkFullSmallFarmerArea'">
          {{ toFixed(record.linkFullSmallFarmerArea, 1, 2) }}
        </template>

        <template v-else-if="column.dataIndex === 'smallPercent'">
          {{ toFixed(record.smallPercent, 1, 2) }}
        </template>

        <template v-else-if="column.dataIndex === 'action'">
          <Button type="link" style="margin-left: -16px" @click="mapLocation">
            地图定位
          </Button>
        </template>
      </template>
    </ContentFormTable>
  </div>
</template>

<style lang="less">
.map-container {
  height: calc(100vh - 168px);
  transition: height 0.3s ease;
  &.fold {
    height: 200px;
  }
}
</style>
