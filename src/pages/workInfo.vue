<script setup lang="ts">
import ContentFormTable from "@/components/ContentFormTable";
import OperatorSelect from "@/components/OperatorSelect.vue";
import { queryWorkInfoPageList } from "@/services/workInfo";
import { h, reactive, computed } from "vue";
import { isEmpty, toFixed } from "@/utils";
import { Button } from "ant-design-vue";
import useMainStore from "@/store/main";
import { storeToRefs } from "pinia";


const mainStore = useMainStore();
const { regionList, workSeasonList, productTypeList, workTypeList } =
  storeToRefs(mainStore);
const {
  queryRegionList,
  queryWorkSeasonList,
  queryProductTypeList,
  queryWorkTypeList,
} = mainStore;

// 发送请求-regionList
isEmpty(regionList.value) && queryRegionList();

isEmpty(workSeasonList.value) && queryWorkSeasonList();

isEmpty(productTypeList.value) && queryProductTypeList();

isEmpty(workTypeList.value) && queryWorkTypeList();

// 数据
const state = reactive({
  pageSize: 10,
  pageNum: 1,
});

const columns = computed(() => [
  {
    dataIndex: "index",
    title: "序号",
  },
  {
    title: "作业地点",
    name: "regionCode",
    formType: "cascader",
    dataIndex: "regionName",
    options: regionList.value,
    properties: { changeOnSelect: true },
    dataFormat: (value: string[]) => ({ regionCode: value.slice(-1)[0] }),
  },
  {
    dataIndex: "workEndTime",
    title: "作业日期",
    formType: "rangePicker",
    sorter: true,
    dataFormat: (values: any) => {
      return {
        startTime: values[0].format("YYYY-MM-DD HH:mm:ss"),
        endTime: values[1].format("YYYY-MM-DD HH:mm:ss"),
      };
    },
  },
  {
    title: "机手",
    dataIndex: "driver",
    name: "driverId",
    component: () => h(OperatorSelect),
  },
  {
    title: "生产环节",
    formType: "select",
    dataIndex: "productType",
    name: "productTypeValue",
    options: productTypeList.value,
    properties: { allowClear: true },
    watch: (value: string, formModels: any) => {
      formModels.workTypeId = null;
      queryWorkTypeList(value);
    },
  },
  {
    title: "作业类型",
    dataIndex: "workType",
    name: "workTypeId",
    formType: "select",
    options: workTypeList.value,
    properties: { allowClear: true },
  },
  {
    title: "作业面积（亩）",
    dataIndex: "area",
  },
  {
    title: "操作",
    dataIndex: "workId",
  },
]);

function handleNavigateToDetail(id: string) {
  window.open("/work-info-detail/" + id);
}

function handlePaginationChange(pageNum: number, pageSize: number) {
  Object.assign(state, { pageNum, pageSize });
}
</script>

<template>
  <div class="page">
    <ContentFormTable
      rowKey="workId"
      :columns="columns"
      :queryTableList="queryWorkInfoPageList"
      @paginationChange="handlePaginationChange"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'index'">
          {{ state.pageSize * (state.pageNum - 1) + index + 1 }}
        </template>

        <template v-else-if="column.dataIndex === 'area'">
          {{ toFixed(record.area, 1, 2) }}
        </template>

        <template v-if="column.dataIndex === 'workId'">
          <Button
            type="link"
            style="margin-left: -16px"
            @click="handleNavigateToDetail(record.workId)"
            >查看详情</Button
          >
        </template>
      </template>
    </ContentFormTable>
  </div>
</template>
