<script setup lang="ts">
import { queryWorkManageTableList, deleteRecord } from "@/services/workManage";
import { h, ref, reactive, shallowReactive, computed } from "vue";
import ContentFormTable from "@/components/ContentFormTable";
import { Button, Popconfirm, message } from "ant-design-vue";
import OperatorSelect from "@/components/OperatorSelect.vue";
import { isEmpty, toFixed } from "@/utils";
import useMainstore from "@/store/main";
import { storeToRefs } from "pinia";

const mainStore = useMainstore();
const { userInfo, regionList, workSeasonList, productTypeList, workTypeList } =
  storeToRefs(mainStore);
const {
  queryRegionList,
  queryWorkSeasonList,
  queryProductTypeList,
  queryWorkTypeList,
} = mainStore;

isEmpty(regionList.value) && queryRegionList();

isEmpty(workSeasonList.value) && queryWorkSeasonList();

isEmpty(productTypeList.value) && queryProductTypeList();

isEmpty(workTypeList.value) && queryWorkTypeList();

// 修改状态
const modifyStateList = shallowReactive([
  { value: "1", label: "已修改" },
  { value: "0", label: "未修改" },
]);
// 数据
const state = reactive({
  pageSize: 10,
  pageNum: 1,
});

// ContentFormTable 组件实例
const pageRef = ref<InstanceType<typeof ContentFormTable> | null>(null);

const columns = computed(() => [
  {
    dataIndex: "index",
    title: "序号",
  },
  {
    dataIndex: "regionName",
    name: "regionCode",
    title: "作业地点",
    formType: "cascader",
    options: regionList.value,
  },
  {
    title: "作业日期",
    dataIndex: "workStartTime",
    formType: "rangePicker",
    properties: {
      showTime: true,
      format: "YYYY-MM-DD HH:mm:ss",
    },
    sorter: {
      multiple: 1,
      compare: (a: any, b: any) => a.chinese - b.chinese,
    },
    dataFormt: (values: any) => {
      return {
        startTime: values[0].format("YYYY-MM-DD HH:mm:ss"),
        endTime: values[1].format("YYYY-MM-DD HH:mm:ss"),
      };
    },
  },
  {
    title: "作业季",
    name: "workSeason",
    formType: "select",
    options: workSeasonList.value,
    dataIndex: "workSeasonDesc",
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
    name: "productTypeValue",
    dataIndex: "productType",
    options: productTypeList.value,
    watch: (value: string, formModels: any) => {
      queryWorkTypeList(value);
      formModels.workType = null;
    },
  },
  {
    title: "作业类型",
    name: "workTypeId",
    dataIndex: "workType",
    formType: "select",
    options: workTypeList.value,
  },
  {
    title: "作业面积（亩）",
    dataIndex: "area",
  },
  {
    title: "偏差分析",
    dataIndex: "offsetAnalysis",
    sorter: {
      compare: (a: any, b: any) => a.offsetAnalysis - b.offsetAnalysis,
      multiple: 2,
    },
  },
  {
    title: "修改状态",
    dataIndex: "isModify",
    formType: "select",
    options: modifyStateList,
    sorter: {
      compare: (a: any, b: any) => a.isModify - b.isModify,
      multiple: 3,
    },
  },
  {
    title: "操作",
    dataIndex: "workId",
  },
]);

function handleDelete(id: string) {
  deleteRecord(id).then((res: any) => {
    if (res.code === 0) {
      message.success("删除成功！");
      pageRef.value?.forceUpdate();
    }
  });
}

function handleNavigateToDetail(id: string) {
  console.log(id);
}

function handleNavigateEditDetail(id: string, record: any) {
  console.log(id, record);
}

function handlePaginationChange(pageNum: number, pageSize: number) {
  console.log(pageNum, pageSize);
  Object.assign(state, { pageNum, pageSize });
}
</script>

<template>
  <ContentFormTable
    ref="pageRef"
    bordered
    rowKey="workId"
    :columns="columns"
    :queryTableList="queryWorkManageTableList"
    @paginationChange="handlePaginationChange"
  >
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.dataIndex === 'index'">
        {{ state.pageSize * (state.pageNum - 1) + index + 1 }}
      </template>

      <template v-else-if="column.dataIndex === 'area'">
        {{ toFixed(record.area, 1, 2) }}
      </template>

      <template v-else-if="column.dataIndex === 'offsetAnalysis'">
        {{ toFixed(record.offsetAnalysis, 1, 2) }}
      </template>

      <template v-else-if="column.dataIndex === 'isModify'">
        {{ record.isModify === 0 ? "否" : "是" }}
      </template>

      <template v-else-if="column.dataIndex === 'workId'">
        <Button
          type="link"
          style="margin-left: -16px"
          @click="handleNavigateToDetail(record.workId)"
        >
          详情
        </Button>

        <Button
          v-if="userInfo?.buttonNameList?.includes?.('btn.Work.update')"
          type="link"
          style="margin-left: -16px"
          @click="handleNavigateEditDetail(record.workId, record)"
        >
          修改
        </Button>

        <Popconfirm
          v-if="userInfo?.buttonNameList?.includes?.('btn.Work.remove')"
          title="此操作将永久删除数据，是否继续？"
          @confirm="handleDelete(record.workId)"
        >
          <Button danger type="link" style="margin-left: -16px"> 删除 </Button>
        </Popconfirm>
      </template>
    </template>
  </ContentFormTable>
</template>
