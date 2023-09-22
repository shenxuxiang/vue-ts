<script setup lang="ts">
import {
  addSystemUser,
  deleteSystemUser,
  queryUserTableList,
  querySystemUserDetail,
  updateSystemUserDetail,
  resetSystemUserPassword,
} from "@/services/systemUser";
import { Space, Button, Popconfirm, message, Tag } from "ant-design-vue";
import ContentFormTable from "@/components/ContentFormTable";
import useSystemStore from "@/store/system";
import useMainStore from "@/store/main";
import UserModal from "./UserModal.vue";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { isEmpty } from "@/utils";
import dayjs from "dayjs";

const mainStore = useMainStore();
const systemStore = useSystemStore();
const { queryRegionList } = mainStore;
const { queryRoleList, queryDictIdTypeList } = systemStore;
const { regionList, userInfo } = storeToRefs(mainStore);
console.log(userInfo);
const { roleList, dictIdTypeList } = storeToRefs(systemStore);
const { buttonNameList } = userInfo.value;

isEmpty(regionList.value) && queryRegionList();
isEmpty(dictIdTypeList.value) && queryDictIdTypeList();
isEmpty(roleList.value) && queryRoleList({ status: 1 });

const userId = ref("");
const pageNum = ref(1);
const pageSize = ref(10);
const showModal = ref(false);
const tableRef = ref<InstanceType<typeof ContentFormTable>>();

const columns = computed(() => [
  {
    title: "序号",
    dataIndex: "userId",
  },
  {
    title: "关键字搜索",
    dataIndex: "keyword",
    formType: "input",
    visibleInTable: false,
  },
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "姓名",
    dataIndex: "realName",
  },
  {
    title: "证件号码",
    dataIndex: "idNumber",
  },
  {
    title: "角色",
    dataIndex: "roleList",
    name: "roleId",
    formType: "select",
    properties: { allowClear: true },
    options: roleList.value,
  },
  {
    title: "行政区",
    dataIndex: "regionName",
    name: "regionCode",
    formType: "cascader",
    options: regionList.value,
    properties: { changeOnSelect: true },
    dataFormat: (region: any) => {
      return { regionCode: region.slice(-1)[0] };
    },
  },
  {
    title: "状态",
    dataIndex: "status",
    sorter: {
      compare: (a: any, b: any) => a.status - b.status,
      multiple: 1,
    },
    render: (status: number) => {
      return status === 1 ? "启用" : "禁用";
    },
  },
  {
    title: "最近更新时间",
    dataIndex: "updateTime",
    sorter: {
      compare: (a: any, b: any) => a.updateTime - b.updateTime,
      multiple: 2,
    },
  },
  {
    title: "操作",
    dataIndex: "action",
  },
]);

// 用户删除
function handleDelete(userId: string) {
  deleteSystemUser(userId).then((res: any) => {
    if (res.code === 0) {
      message.success("用户删除成功！");
      tableRef.value?.forceUpdate();
    }
  });
}

// 用户编辑
function handleEdit(id: string) {
  userId.value = id;
  showModal.value = true;
  tableRef.value?.forceUpdate();
}

// 用户重置密码
function handleResetPassword(userId: string) {
  resetSystemUserPassword(userId).then((res: any) => {
    if (res.code === 0) message.success("用户密码重置成功！");
  });
}

// 换页
function handlePaginationChange(current: number, size: number) {
  pageSize.value = size;
  pageNum.value = current;
}

// 关闭弹框
function handleCloseModal() {
  showModal.value = false;
}

// 编辑/新增用户成功回调
function handleOperationSuccess() {
  showModal.value = false;
  tableRef.value?.forceUpdate();
}

function handleAddUser() {
  showModal.value = true;
  userId.value = "";
}
</script>

<template>
  <section>
    <ContentFormTable
      ref="tableRef"
      rowKey="usrId"
      :columns="columns"
      :queryTableList="queryUserTableList"
      @paginationChange="handlePaginationChange"
    >
      <template #extra>
        <Button type="primary" ghost @click="handleAddUser">新增</Button>
      </template>

      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'userId'">
          {{ (pageNum - 1) * pageSize + index + 1 }}
        </template>

        <template v-if="column.dataIndex === 'roleList'">
          {{
            record.roleList?.map?.((item: any) => item.roleName)?.join?.("，")
          }}
        </template>

        <template v-else-if="column.dataIndex === 'status'">
          <Tag v-if="record.status === 1" color="#87d068">启用</Tag>
          <Tag v-else color="#f50">禁用</Tag>
        </template>

        <template v-else-if="column.dataIndex === 'updateTime'">
          {{ dayjs(record.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>

        <Space
          v-else-if="column.dataIndex === 'action'"
          style="margin-left: -16px"
        >
          <template v-if="buttonNameList.includes('btn.User.remove')">
            <Popconfirm
              title="此操作将永久删除数据，是否继续？"
              @confirm="handleDelete(record.userId)"
            >
              <Button danger type="link"> 删除 </Button>
            </Popconfirm>
          </template>

          <template v-if="buttonNameList.includes('btn.User.update')">
            <Button type="link" @click="handleEdit(record.userId)">
              编辑
            </Button>
          </template>

          <template v-if="buttonNameList.includes('btn.User.resetPwd')">
            <Popconfirm
              title="此操作将重置用户密码，是否继续？"
              @confirm="handleResetPassword(record.userId)"
            >
              <Button type="link">重置密码</Button>
            </Popconfirm>
          </template>
        </Space>
      </template>
    </ContentFormTable>
    <UserModal
      :userId="userId"
      :open="showModal"
      :roleList="roleList"
      :regionList="regionList"
      :addUser="addSystemUser"
      :close="handleCloseModal"
      :dictIdTypeList="dictIdTypeList"
      :success="handleOperationSuccess"
      :updateUser="updateSystemUserDetail"
      :getUserDetail="querySystemUserDetail"
    />
  </section>
</template>
