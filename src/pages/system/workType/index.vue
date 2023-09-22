<script setup lang="ts">
import { Button, Popconfirm, Space, message } from "ant-design-vue";
import ContentFormTable from "@/components/ContentFormTable";
import WorkTypeModal from "./WorkTypeModal.vue";
import { isEmpty, toFixed } from "@/utils";
import useMainStore from "@/store/main";
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import {
  addSystemWorkType,
  updateSystemWorkType,
  deleteSystemWorkType,
  queryWorkTypeTableList,
  querySystemWorkTypeDetail,
} from "@/services/systemWorkType";

const mainStore = useMainStore();
const { queryProductTypeList } = mainStore;
const { productTypeList, userInfo } = storeToRefs(mainStore);
const { buttonNameList } = userInfo.value;

isEmpty(productTypeList) && queryProductTypeList();

const pageNum = ref(1);
const pageSize = ref(10);
const jobTypeId = ref("");
const showModal = ref(false);
const tableRef = ref<InstanceType<typeof ContentFormTable>>();
const columns = computed(() => [
  {
    title: "序号",
    dataIndex: "index",
  },
  {
    title: "关键字搜索",
    dataIndex: "keyword",
    formType: "input",
    visibleInTable: false,
  },
  {
    title: "作业类型名称",
    dataIndex: "jobTypeName",
  },
  {
    title: "更新人",
    dataIndex: "updator",
  },
  {
    title: "生产环节",
    dataIndex: "dictName",
    name: "dictId",
    formType: "select",
    options: productTypeList.value,
  },
  {
    title: "最近更新时间",
    dataIndex: "updateTime",
  },
  {
    title: "排序",
    dataIndex: "sort",
  },
  {
    title: "描述",
    dataIndex: "description",
  },
  {
    title: "默认作业幅宽(米)",
    dataIndex: "defaultWorkWidth",
    render: (meter: number) => toFixed(meter, 1, 2),
  },
  {
    title: "操作",
    dataIndex: "action",
  },
]);

async function handleDelete(id: string) {
  try {
    const { code }: any = await deleteSystemWorkType(id);
    if (code === 0) {
      message.success("删除成功！");
      tableRef.value?.forceUpdate();
    }
  } catch (error) {}
}

function handleAdd() {
  jobTypeId.value = "";
  showModal.value = true;
}

function handleEdit(id: string) {
  jobTypeId.value = id;
  showModal.value = true;
}

function handleSuccess() {
  showModal.value = false;
  tableRef.value?.forceUpdate();
}

function handleClose() {
  showModal.value = false;
}

function handlePaginationChange(current: number, size: number) {
  pageSize.value = size;
  pageNum.value = current;
}
</script>

<template>
  <section>
    <ContentFormTable
      rowKey="jobTypeId"
      :columns="columns"
      :queryTableList="queryWorkTypeTableList"
      @paginationChange="handlePaginationChange"
    >
      <template #extra>
        <Button type="primary" ghost @click="handleAdd">新增</Button>
      </template>
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'index'">
          {{ (pageNum - 1) * pageSize + index + 1 }}
        </template>

        <template v-else-if="column.dataIndex === 'defaultWorkWidth'">
          {{ toFixed(record.defaultWorkWidth, 1, 2) }}
        </template>

        <template v-else-if="column.dataIndex === 'action'">
          <Space style="margin-left: -16px">
            <template v-if="buttonNameList?.includes('btn.WorkType.remove')">
              <Popconfirm
                title="此操作将永久删除数据，是否继续？"
                @confirm="handleDelete(record.jobTypeId)"
              >
                <Button danger type="link"> 删除 </Button>
              </Popconfirm>
            </template>

            <template v-if="buttonNameList?.includes('btn.WorkType.update')">
              <Button type="link" @click="handleEdit(record.jobTypeId)">
                编辑
              </Button>
            </template>
          </Space>
        </template>
      </template>
    </ContentFormTable>

    <WorkTypeModal
      :open="showModal"
      :jobTypeId="jobTypeId"
      :onClose="handleClose"
      :onSuccess="handleSuccess"
      :productTypeList="productTypeList"
      :addSystemWorkType="addSystemWorkType"
      :updateSystemWorkType="updateSystemWorkType"
      :getSystemWorkTypeDetail="querySystemWorkTypeDetail"
    />
  </section>
</template>
