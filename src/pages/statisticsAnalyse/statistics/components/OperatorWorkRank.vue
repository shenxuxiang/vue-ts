<script setup lang="ts">
import { toFixed, isArray, downloadFile } from "@/utils";
import { ref, reactive, watch, watchEffect, shallowRef } from "vue";
import { Select, Space, Table, Pagination, Button } from "ant-design-vue";

type Sorter = Array<{ field: string; direction: boolean }>;

type OperatorWorkRankProps = {
  endTime?: string;
  startTime?: string;
  regionCode?: string;
  dictIdWorkSeason?: string;
  queryTableList: (query: any) => Promise<any>;
  exportTableList: (query: any) => Promise<any>;
  queryWorkTypeList: (query: any) => Promise<any>;
  workTypeList: Array<{ label: string; value: string | number }>;
  productTypeList: Array<{ label: string; value: string | number }>;
};

const props = withDefaults(defineProps<OperatorWorkRankProps>(), {});

// 作业类型
const total = ref(0);
const pageNum = ref(1);
const pageSize = ref(10);
// 排序
const sorter = ref<Sorter>([]);
const workType = ref<string>(null!);
// 生产环节
const productLink = ref<string>(null!);
// 表格数据
const tableResource = reactive({
  area: 0,
  tableList: [],
  driverCount: "0",
});

const columns = shallowRef([
  {
    title: "排名",
    dataIndex: "driverId",
  },
  {
    title: "机手姓名",
    dataIndex: "driverName",
  },
  {
    title: "证件号码",
    dataIndex: "idNumber",
  },
  {
    title: "生产环节",
    dataIndex: "productTypeName",
  },
  {
    title: "作业类型",
    dataIndex: "workTypeName",
  },
  {
    title: "作业面积（亩）",
    dataIndex: "area",
    sorter: true,
  },
]);

watch(productLink, (newValue) => {
  workType.value = null;
  props.queryWorkTypeList(newValue);
});

watch(
  [
    workType,
    productLink,
    () => props.endTime,
    () => props.startTime,
    () => props.regionCode,
    () => props.dictIdWorkSeason,
  ],
  () => {
    // sorter.value = [];
    pageNum.value = 1;
    pageSize.value = 10;
  },
);

// flush: 'post' 在 DOM 渲染完成后触发监听事件；
// 避免因为依赖多次发生改变，而导致的多次触发监听事件。
watchEffect(triggerQueryTableList, { flush: "post" });

function triggerQueryTableList() {
  const params = {
    order: sorter.value,
    endTime: props.endTime,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    jobTypeId: workType.value,
    startTime: props.startTime,
    regionCode: props.regionCode,
    dictIdProductLink: productLink.value,
    dictIdWorkSeason: props.dictIdWorkSeason,
  };

  props.queryTableList(params).then((res: any) => {
    const { code, data } = res;
    if (code === 0) {
      const { area, driverCount, pageInfo } = data;
      Object.assign(tableResource, {
        area,
        driverCount,
        tableList: pageInfo.list,
      });
      total.value = pageInfo.total;
    }
  });
}

// 表格排序
function handleTableChange() {
  const sort = arguments[2];
  const result: Sorter = [];

  if (isArray(sort)) {
    sort.forEach((item: any) => {
      item.order &&
        result.push({ field: item.field, direction: item.order === "ascend" });
    });
  } else {
    sort.order &&
      result.push({ field: sort.field, direction: sort.order === "ascend" });
  }

  sorter.value = result;
}

function handlePaginationChange(num: number, size: number) {
  pageNum.value = num;
  pageSize.value = size;
}

function handleExport() {
  const params = {
    order: sorter.value,
    endTime: props.endTime,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    jobTypeId: workType.value,
    startTime: props.startTime,
    regionCode: props.regionCode,
    dictIdProductLink: productLink.value,
    dictIdWorkSeason: props.dictIdWorkSeason,
  };

  props.exportTableList(params).then((res: any) => {
    downloadFile("机手作业排名", res.data);
  });
}
</script>

<template>
  <section>
    <div class="head">
      <h3>机手作业排名</h3>
      <Space>
        <Select
          v-model:value="productLink"
          :options="productTypeList"
          allowClear
          style="width: 200px"
          placeholder="情选择生产环节"
        />
        <Select
          v-model:value="workType"
          :options="workTypeList"
          allowClear
          style="width: 200px"
          placeholder="情选择作业类型"
        />
      </Space>
    </div>
    <div class="table-title">
      <p>
        作业机手数（人）
        <b style="font-size: 20px">{{ toFixed(tableResource.area, 1, 2) }}</b>
      </p>
      <p>
        作业面积（亩）
        <b style="font-size: 20px">{{ tableResource.driverCount }}</b>
      </p>
    </div>
    <div style="text-align: right">
      <Button type="link" @click="handleExport">导出表格</Button>
    </div>
    <Table
      bordered
      rewKey="driverId"
      :columns="columns"
      :pagination="false"
      :dataSource="tableResource.tableList"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'driverId'">
          {{ pageSize * (pageNum - 1) + index + 1 }}
        </template>
        <template v-else-if="column.dataIndex === 'area'">
          {{ toFixed(record.area, 1, 2) }}
        </template>
      </template>
    </Table>
    <Pagination
      class="pagination"
      :total="total"
      :current="pageNum"
      :pageSize="pageSize"
      @change="handlePaginationChange"
    />
  </section>
</template>

<style lang="less">
.head {
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  padding: 0 0 0 24px;
  border-bottom: 1px solid #ddd;
}
.table-title {
  padding: 24px 0;
  display: flex;
  justify-content: space-around;
  font-size: 15px;
  color: #333;
  line-height: 1;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}
</style>
