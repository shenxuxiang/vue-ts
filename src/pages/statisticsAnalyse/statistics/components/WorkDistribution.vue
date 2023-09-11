<script setup lang="ts">
import { ref, computed, watchEffect, watch } from "vue";
import { Button, Table, Pagination } from "ant-design-vue";
import { toFixed, isArray, downloadFile } from "@/utils";
import BarChart from "./BarChart.vue";

type Sorter = Array<{ field: string; direction: boolean }>;

type WorkDistributionProps = {
  title: string;
  rowKey: string;
  endTime?: string;
  startTime?: string;
  regionCode?: string;
  dictIdWorkSeason?: string;
  queryTableList: (query: any) => Promise<any>;
  exportTableList: (query: any) => Promise<any>;
};

const props = withDefaults(defineProps<WorkDistributionProps>(), {});

const total = ref(0);
// '1' - 生产环节； '2' - 作业类型
const type = ref("1");
const pageNum = ref(1);
const pageSize = ref(10);
// 排序
const sorter = ref<Sorter>([]);
const tableList = ref<any[]>([]);
const headerList = ref<any[]>([]);
const columns = computed(computedColumns);

watch(
  [
    type,
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

// 计算 columns
function computedColumns() {
  return (
    headerList.value?.map?.((item: any) => {
      return {
        title: item.key,
        dataIndex: item.key,
        sorter: item.key !== props.rowKey,
      };
    }) ?? []
  );
}

// 触发请求
function triggerQueryTableList() {
  const params = {
    type: type.value,
    order: sorter.value,
    endTime: props.endTime,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    startTime: props.startTime,
    regionCode: props.regionCode,
    dictIdWorkSeason: props.dictIdWorkSeason,
  };

  props.queryTableList(params).then((res: any) => {
    const { code, data } = res;
    if (code === 0) {
      const { headerList: header, pageInfo } = data;
      total.value = pageInfo?.total ?? 0;
      headerList.value = header;
      tableList.value = pageInfo?.list ?? [];
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

// 导出
function handleExport() {
  const params = {
    type: type.value,
    endTime: props.endTime,
    startTime: props.startTime,
    regionCode: props.regionCode,
    dictIdWorkSeason: props.dictIdWorkSeason,
  };

  props.exportTableList(params).then((res: any) => {
    downloadFile(res.fileName, res.data);
  });
}
</script>

<template>
  <section>
    <div class="head">
      <h3>{{ title }}</h3>
      <Button.Group>
        <Button :type="type === '1' ? 'primary' : 'default'" @click="type = '1'"
          >生产环节</Button
        >
        <Button :type="type === '2' ? 'primary' : 'default'" @click="type = '2'"
          >作业类型</Button
        >
      </Button.Group>
    </div>
    <BarChart
      :categoryList="headerList"
      :dataSource="tableList"
      :rowKey="rowKey"
    />
    <div style="margin-top: 40px; text-align: right">
      <Button type="link" @click="handleExport">导出表格</Button>
    </div>
    <Table
      :key="type"
      bordered
      :rowKey="rowKey"
      :columns="columns"
      :pagination="false"
      :dataSource="tableList"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex !== rowKey">
          {{ toFixed(record[column.dataIndex as string], 1, 2) }}
        </template>
      </template>
    </Table>

    <Pagination
      v-model:current="pageNum"
      v-model:pageSize="pageSize"
      :total="total"
      class="pagination"
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
</style>
