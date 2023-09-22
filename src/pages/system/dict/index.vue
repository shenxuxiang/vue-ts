<script setup lang="ts">
import {
  addSystemDict,
  deleteSystemDict,
  updateSystemDict,
  querySystemDictDetail,
  queryDictionaryTableList,
} from "@/services/systemDict";
import { ref, computed, watch } from "vue";
import { Button, Space, Popconfirm, message } from "ant-design-vue";
import ContentFormTable from "@/components/ContentFormTable";
import ModuleTree from "@/components/ModuleTree";
import useSystemStore from "@/store/system";
import DictModal from "./DictModal.vue";
import useMainStore from "@/store/main";
import { storeToRefs } from "pinia";
import { isEmpty } from "@/utils";
import dayjs from "dayjs";

const mainStore = useMainStore();
const { userInfo } = storeToRefs(mainStore);
const { buttonNameList } = userInfo.value;
const { queryWorkTypeList, queryProductTypeList, queryWorkSeasonList } =
  mainStore;

const systemStore = useSystemStore();
const { queryDictTypeList } = systemStore;
const { dictTypeList } = storeToRefs(systemStore);

isEmpty(dictTypeList.value) && queryDictTypeList();

const dictId = ref("");
const pageNum = ref(1);
const pageSize = ref(10);
const showModal = ref(false);
const dictType = ref<string[]>([]);
const tableRef = ref<InstanceType<typeof ContentFormTable>>();
const columns = computed(() => [
  {
    title: "序号",
    dataIndex: "dictId",
  },
  {
    title: "关键字搜索",
    dataIndex: "keyword",
    formType: "input",
    visibleInTable: false,
  },
  {
    title: "字典项名称",
    dataIndex: "dictName",
  },
  {
    title: "更新人",
    dataIndex: "updator",
  },
  {
    title: "最近更新时间",
    dataIndex: "updateTime",
    sorter: {
      compare: (a: any, b: any) => a.chinese - b.chinese,
      multiple: 2,
    },
  },
  {
    title: "操作",
    dataIndex: "action",
  },
]);

// 监听字典类型列表变化，当有值时将数组第一项的 key 赋值给 dictType 字典项，作为默认值。
watch(
  dictTypeList,
  () => {
    if (isEmpty(dictTypeList.value)) return;

    dictType.value = [dictTypeList.value[0]?.key as string];
  },
  { immediate: true },
);

// 字典类型改变
function handleChangeDictType(checkedKeys: string[]) {
  dictType.value = checkedKeys.slice(-1);
}

// 获取表格页面数据
function queryTableList(query: any) {
  return queryDictionaryTableList({
    ...query,
    dictTypeCode: dictType.value[0],
  });
}

function handleDelete(id: string) {
  deleteSystemDict(id).then((res: any) => {
    if (res.code === 0) {
      message.success("删除成功！");
      tableRef.value?.forceUpdate();
      switch (dictType.value[0]) {
        case "ID_TYPE":
          queryWorkTypeList();
          break;
        case "PRODUCT_LINK":
          queryProductTypeList();
          break;
        case "WORK_SEASON":
          queryWorkSeasonList();
          break;
      }
    }
  });
}

function handleEdit(id: string) {
  showModal.value = true;
  dictId.value = id;
}

function handleAddDict() {
  showModal.value = true;
  dictId.value = "";
}

function handleCloseModal() {
  showModal.value = false;
}

function handleSuccessModal() {
  showModal.value = false;
  tableRef.value?.forceUpdate();
  queryProductTypeList();
  queryWorkSeasonList();
  queryWorkTypeList();
}
</script>

<template>
  <section v-if="dictTypeList?.length" class="dictionary-page">
    <section class="side">
      <h3>字典类型</h3>
      <ModuleTree
        :treeData="dictTypeList"
        :checkedKeys="dictType"
        @update:checkedKeys="handleChangeDictType"
      />
    </section>

    <ContentFormTable
      ref="tableRef"
      :key="dictType?.[0]"
      rowKey="dictId"
      class="container"
      :columns="columns"
      :queryTableList="queryTableList"
    >
      <template #extra>
        <Button type="primary" ghost @click="handleAddDict">新增</Button>
      </template>
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'dictId'">
          {{ (pageNum - 1) * pageSize + index + 1 }}
        </template>

        <template v-else-if="column.dataIndex === 'updateTime'">
          {{ dayjs(record.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>

        <template v-else-if="column.dataIndex === 'action'">
          <Space style="margin-left: -16px">
            <template v-if="buttonNameList.includes('btn.Dict.remove')">
              <Popconfirm
                title="你确定要删除这行内容吗？"
                @confirm="handleDelete(record.dictId)"
              >
                <Button danger type="link"> 删除 </Button>
              </Popconfirm>
            </template>

            <template v-if="buttonNameList.includes('btn.Dict.update')">
              <Button type="link" @click="handleEdit(record.dictId)">
                编辑
              </Button>
            </template>
          </Space>
        </template>
      </template>
    </ContentFormTable>

    <DictModal
      :dictId="dictId"
      :open="showModal"
      :close="handleCloseModal"
      :dictTypeList="dictTypeList"
      :success="handleSuccessModal"
      :addSystemDict="addSystemDict"
      :updateSystemDict="updateSystemDict"
      :querySystemDictDetail="querySystemDictDetail"
    />
  </section>
</template>

<style lang="less" scoped>
.dictionary-page {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
}
.side {
  width: 240px;
  margin: 24px 24px 0 24px;
  padding: 24px;
  background: #fff;
  border-radius: 6px;
}
.container {
  flex: 1 0 0;
  padding-left: 0;
}
</style>
