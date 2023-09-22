<script setup lang="ts">
import {
  exportWorkArea,
  exportWorkTrend,
  exportDriverWorkRank,
  queryOperatorSortTableDataSource,
  queryRegionalDistributionTableDataSource,
  queryTendenceDistributionTableDataSource,
} from "@/services/statisticsAnalyseOfStatistics";
import {
  WalletOutlined,
  BankFilled,
  GoldenFilled,
  ControlFilled,
} from "@ant-design/icons-vue";
import AreaStatisticsIcon from "./components/AreaStatisticsIcon.vue";
import OperatorWorkRank from "./components/OperatorWorkRank.vue";
import WorkDistribution from "./components/WorkDistribution.vue";
import ContentFormHeader from "@/components/ContentFormHeader";
import useStatisticsStore from "@/store/statistics";
import { ref, computed, watchEffect } from "vue";
import PieChart from "./components/PieChart.vue";
import { Row, Col } from "ant-design-vue";
import useMainStore from "@/store/main";
import { storeToRefs } from "pinia";
import { isEmpty } from "@/utils";
import dayjs from "dayjs";

const mainStore = useMainStore();
const { userInfo, regionList, workSeasonList, productTypeList, workTypeList } =
  storeToRefs(mainStore);
const {
  queryRegionList,
  queryWorkSeasonList,
  queryProductTypeList,
  queryWorkTypeList,
} = mainStore;

const statisticsStore = useStatisticsStore();
const { statisticArea, productionProcessPercent, workTypePercent } =
  storeToRefs(statisticsStore);
const {
  queryWorkStatisticArea,
  queryProductionProcessPercent,
  queryWorkTypePercent,
} = statisticsStore;

// 发送请求
isEmpty(regionList.value) && queryRegionList();
isEmpty(workTypeList.value) && queryWorkTypeList();
isEmpty(workSeasonList.value) && queryWorkSeasonList();
isEmpty(productTypeList.value) && queryProductTypeList();

// 工作地点
const workPlaceList = computed(() => {
  const { regionCode } = userInfo.value;
  if (isEmpty(regionList.value)) return [];
  return filterRegionList(regionCode, regionList.value);
});

const state = ref({
  endTime: dayjs().endOf("week").format("YYYY-MM-DD HH:mm:ss"),
  startTime: dayjs().startOf("week").format("YYYY-MM-DD HH:mm:ss"),
  regionCode: "",
  dictIdWorkSeason: "",
});

const queryList = computed(() => [
  {
    title: "选择日期",
    name: "time",
    formType: "rangePicker",
    initialValue: [dayjs().startOf("week"), dayjs().endOf("week")],
    properties: {
      showTime: true,
      format: "YYYY-MM-DD HH:mm:ss",
    },
    dataFormat: (values: any) => {
      console.log(values);
      return {
        startTime: values[0].startOf("day").format("YYYY-MM-DD HH:mm:ss"),
        endTime: values[1].endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      };
    },
  },
  {
    title: "作业季",
    name: "dictIdWorkSeason",
    formType: "select",
    options: workSeasonList.value,
    properties: { allowClear: true },
  },
  {
    title: "作业地点",
    name: "workPlace",
    formType: "cascader",
    options: workPlaceList.value,
    properties: { changeOnSelect: true },
    dataFormat: (value: any) => {
      return { regionCode: value.slice(-1)[0] };
    },
  },
]);

watchEffect(() => {
  const {
    endTime = "",
    startTime = "",
    regionCode = "",
    dictIdWorkSeason = "",
  } = state.value;
  const params = {
    endTime,
    startTime,
    regionCode,
    dictIdWorkSeason,
  };

  // 作业类型占比
  queryWorkTypePercent(params);
  // 面积通统计
  queryWorkStatisticArea(params);
  // 生产环节占比
  queryProductionProcessPercent(params);
});

function handleSubmit(values: any) {
  const {
    endTime = "",
    startTime = "",
    regionCode = "",
    dictIdWorkSeason = "",
  } = values;
  const newState = {
    endTime,
    startTime,
    regionCode,
    dictIdWorkSeason,
  };
  state.value = newState;
}

// 根据提供的 code，过滤出需要的内容
function filterRegionList(code: string, data: any) {
  const stack = [...data];

  while (stack.length) {
    const item = stack.shift();
    if (item.value === code) return [item];
    const { children } = item;
    if (children?.length > 0) {
      let length = children.length;
      while (length--) {
        stack.unshift(children[length]);
      }
    }
  }
  return [];
}
</script>

<template>
  <div class="statistics-page">
    <ContentFormHeader
      :cols="4"
      :queryList="queryList"
      @submit="handleSubmit"
      @reset="handleSubmit"
    />
    <section class="area-statistics">
      <AreaStatisticsIcon
        bgColor="#1890ff"
        title="作业面积（亩）"
        :context="statisticArea?.workArea ?? ''"
      >
        <template #icon>
          <WalletOutlined />
        </template>
      </AreaStatisticsIcon>

      <AreaStatisticsIcon
        bgColor="#91cc75"
        title="确权面积（亩）"
        :context="statisticArea?.dkArea ?? ''"
      >
        <template #icon>
          <BankFilled />
        </template>
      </AreaStatisticsIcon>

      <AreaStatisticsIcon
        bgColor="#73c0d1"
        title="作业面积（亩）"
        :context="statisticArea?.managedArea ?? ''"
      >
        <template #icon>
          <GoldenFilled />
        </template>
      </AreaStatisticsIcon>

      <AreaStatisticsIcon
        bgColor="#6C69FF"
        title="作业面积（亩）"
        :context="statisticArea?.circulationArea ?? ''"
      >
        <template #icon>
          <ControlFilled />
        </template>
      </AreaStatisticsIcon>
    </section>

    <Row style="margin-top: 20px">
      <Col span="11">
        <div style="border-bottom: 1px solid #ddd; padding: 0 24px">
          <h3>生产环节占比</h3>
        </div>
        <PieChart :dataSource="productionProcessPercent" />
      </Col>
      <Col span="11" offset="2">
        <div style="border-bottom: 1px solid #ddd; padding: 0 24px">
          <h3>作业类型占比</h3>
        </div>
        <PieChart :dataSource="workTypePercent" />
      </Col>
    </Row>

    <OperatorWorkRank
      v-bind="state"
      :workTypeList="workTypeList"
      :productTypeList="productTypeList"
      :queryWorkTypeList="queryWorkTypeList"
      :exportTableList="exportDriverWorkRank"
      :queryTableList="queryOperatorSortTableDataSource"
    />

    <WorkDistribution
      rowKey="行政区"
      title="作业区域分布"
      v-bind="state"
      :exportTableList="exportWorkArea"
      :queryTableList="queryRegionalDistributionTableDataSource"
    />

    <WorkDistribution
      rowKey="年份"
      title="作业趋势分布"
      v-bind="state"
      :exportTableList="exportWorkTrend"
      :queryTableList="queryTendenceDistributionTableDataSource"
    />
  </div>
</template>

<style lang="less">
.statistics-page {
  margin: 24px 24px 0;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  .content-form-head {
    padding-left: 0;
    padding-right: 0;
  }
}
.area-statistics {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>
