<script setup lang="ts">
import type { QueryList, Cols } from "@/components/ContentFormHeader";
import ContentFormHeader from "@/components/ContentFormHeader";
import { reactive, ref, watch, computed, toRef } from "vue";
import { Table, Pagination } from "ant-design-vue";
import type { TableProps } from "ant-design-vue";
import type { VNode, CSSProperties } from "vue";
import { downloadFile, isArray } from "@/utils";

// 获取数组项的类型
type ReturnColumn<T> = T extends Array<infer E> ? E : never;

type TableColumns = TableProps["columns"];

type TableColumn = ReturnColumn<TableColumns>;

// 合成类型
export type Columns = Array<
  TableColumn &
    QueryList[0] & {
      visibleInTable?: boolean;
      dataFormat?: (value: any) => { [propName: string]: any };
    }
>;

type Sorter = Array<{ field: string; direction: boolean }>;

type ContentFormTableProps = {
  cols?: Cols;
  rowKey: string;
  columns: Columns;
  bordered?: boolean;
  // 是否允许在组件初始化时就可以请求表格数据，默认为 true
  immediate?: boolean;
  showExport?: boolean;
  exportFileName?: string;
  submitButtonText?: string;
  scroll?: TableProps["scroll"];
  style?: CSSProperties | string;
  paginationSize?: "default" | "small";
  tableSize?: "small" | "middle" | "large";
  rowSelection?: TableProps["rowSelection"];
  // 在正式请求表格数据之前，会触发 beforeQueryAction 行为，返回 false 将中断请求。
  beforeQueryAction?: (query: any) => boolean;
  // 获取表格数据
  queryTableList: (query: any) => Promise<any>;
  showTotal?: (total: number) => VNode | string;
  // 导出表格数据
  exportTableList?: (query: any) => Promise<any>;
  class?: string | string[] | { [propName: string]: string };
  // 允许用户可以自定义 response，以便组件统一处理。
  customResponse?: (data: any) => { total: number; tableList: any[] };
};

type ContentFormTableEvents = (
  e: "paginationChange",
  pageNum: number,
  pageSize: number,
) => void;

const props = withDefaults(defineProps<ContentFormTableProps>(), {
  bordered: true,
  immediate: true,
  showTotal: (total: number) => `共${total}条数据`,
  customResponse: (data: any) => ({ tableList: data.list, total: data.total }),
});
const emit = defineEmits<ContentFormTableEvents>();
defineOptions({ inheritAttrs: false });
const className = toRef(props, "class");
// 合成 columns: { queryList, tableColumns }
const combinationColumns = computed(computedColumns);
// 查询条件
const searchCondition = ref(computedInitialSearchCondition());
const tableResource = reactive({
  total: 0,
  pageNum: 1,
  pageSize: 10,
  tableList: [] as any[],
});
const loading = ref(false);
// 排序
let sorter = ref<Sorter>([]);

// eslint-disable-next-line
watch(
  [
    () => tableResource.pageNum,
    () => tableResource.pageSize,
    sorter,
    searchCondition,
  ],
  getTableList,
  { immediate: props.immediate },
);

// 计算 queryList、tableColumns
function computedColumns() {
  const newQueryList: QueryList = [];
  const newTableColumns: TableColumns = [];

  props.columns.forEach((item) => {
    const { visibleInTable = true, component, formType } = item;

    if (formType || component) {
      newQueryList.push({
        // @ts-ignore
        name: item.name || item.dataIndex,
        title: item.title,
        watch: item.watch,
        options: item.options,
        formType: item.formType,
        component: item.component,
        dataFormat: item.dataFormat,
        properties: item.properties,
        placeholder: item.placeholder,
        initialValue: item.initialValue,
      });
    }

    if (visibleInTable === true) {
      newTableColumns.push(item);
    }
  });

  return { queryList: newQueryList, tableColumns: newTableColumns };
}

// 初始化 searchCondition
function computedInitialSearchCondition() {
  const result: { [propName: string]: any } = {};
  combinationColumns.value.queryList.forEach((item) => {
    const { dataIndex, name = dataIndex, dataFormat, initialValue } = item;
    if (initialValue) {
      if (typeof dataFormat === "function") {
        delete result[name!];
        Object.assign(result, dataFormat(initialValue));
      } else {
        result[name!] = initialValue;
      }
    }
  });

  return result;
}

// 获取表格相关资源
function getTableList() {
  const params = {
    ...searchCondition.value,
    pageSize: tableResource.pageSize,
    pageNum: tableResource.pageNum,
    order: sorter.value,
  };

  if (props.beforeQueryAction?.(params) ?? true) {
    loading.value = true;
    props
      .queryTableList(params)
      .then((res: any) => Object.assign(tableResource, props.customResponse(res.data)))
      .finally(() => (loading.value = false));
  }
}

// 提交
function handleSubmit(values: any) {
  searchCondition.value = values;
  Object.assign(tableResource, { pageSize: 10, pageNum: 1 });
}

// 重置
function handleReset(values: any) {
  searchCondition.value = values;
  Object.assign(tableResource, { pageSize: 10, pageNum: 1 });
}

// 导出
function handleExport(values: any) {
  props?.exportTableList?.(values)?.then((res: any) => {
    const { fileName, data } = res;
    downloadFile(props?.exportFileName ?? fileName, data);
  });
}

// 分页
function handlePaginationChange(pageNum: number, pageSize: number) {
  Object.assign(tableResource, { pageSize, pageNum });
  emit("paginationChange", pageNum, pageSize);
}

// 表格排序
function handleTableChange() {
  const sort = arguments[2];
  const result: Sorter = [];
  if (isArray(sort)) {
    sort.forEach((item: any) => {
      const { field, order } = item;
      order && result.push({ field, direction: order === "ascend" });
    });
  } else {
    sort.order &&
      result.push({ field: sort.field, direction: sort.order === "ascend" });
  }

  sorter.value = result;
}
// 强制更新数据
function forceUpdate() {
  getTableList();
}

defineExpose({ forceUpdate });
</script>

<template>
  <section :class="['qm-content-form-table', className]" :style="style">
    <template v-if="combinationColumns.queryList.length">
      <ContentFormHeader
        :cols="cols"
        :showExport="showExport"
        :submitButtonText="submitButtonText"
        :queryList="combinationColumns.queryList"
        @reset="handleReset"
        @export="handleExport"
        @submit="handleSubmit"
      >
        <template #insertNode>
          <slot name="insertHeadNode" />
        </template>
      </ContentFormHeader>
    </template>

    <div class="qm-content-form-table-body">
      <div class="qm-content-form-table-body-head">
        <p style="margin-left: 16px">查询表格</p>
        <slot name="extra"></slot>
      </div>

      <Table
        bordered
        v-bind="$attrs"
        :rowKey="rowKey"
        :scroll="scroll"
        :size="tableSize"
        :loading="loading"
        :pagination="false"
        :rowSelection="rowSelection"
        :dataSource="tableResource.tableList"
        :columns="combinationColumns.tableColumns"
        @change="handleTableChange"
      >
        <template #bodyCell="bodyCellProps">
          <slot name="bodyCell" v-bind="bodyCellProps"></slot>
        </template>
      </Table>
      <Pagination
        :pageSize="tableResource.pageSize"
        :current="tableResource.pageNum"
        :total="tableResource.total"
        :showTotal="showTotal"
        :size="paginationSize"
        class="qm-content-form-table-pagination"
        @change="handlePaginationChange"
      />
    </div>
  </section>
</template>

<style lang="less">
.qm-content-form-table {
  padding: 24px 24px 0;
}
.qm-content-form-table-body {
  padding: 24px;
  background: #fff;
  border-radius: 8px;
}
.qm-content-form-table-body-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  padding: 0 0 20px;
  box-sizing: content-box;
}
.qm-content-form-table-pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
}
</style>
