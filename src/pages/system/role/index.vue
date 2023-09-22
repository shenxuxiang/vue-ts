<script setup lang="ts">
import {
  addSystemRole,
  deleteSystemRole,
  queryRoleTableList,
  querySystemRoleDetail,
  updateSystemRoleDetail,
  updateSysRolePermission,
} from "@/services/systemRole";
import { Tag, Button, Popconfirm, message } from "ant-design-vue";
import ContentFormTable from "@/components/ContentFormTable";
import PermissionModal from "./PermissionModal.vue";
import useSystemStore from "@/store/system";
import useMainStore from "@/store/main";
import RoleModal from "./RoleModal.vue";
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { isEmpty } from "@/utils";
import dayjs from "dayjs";

const mainStore = useMainStore();
const { userInfo } = storeToRefs(mainStore);
const { buttonNameList } = userInfo.value;

const systemStore = useSystemStore();
const { querySysResourceList } = systemStore;
const { systemResourceTree } = storeToRefs(systemStore);

isEmpty(systemResourceTree.value) && querySysResourceList();

const roleId = ref("");
const pageNum = ref(1);
const pageSize = ref(10);
const showRoleModal = ref(false);
const showPermissionModal = ref(false);
const tableRef = ref<InstanceType<typeof ContentFormTable>>();

const columns = computed(() => [
  {
    title: "序号",
    dataIndex: "roleId",
  },
  {
    title: "关键字搜索",
    dataIndex: "keyword",
    formType: "input",
    visibleInTable: false,
  },
  {
    title: "角色名称",
    dataIndex: "roleName",
  },
  {
    title: "状态",
    dataIndex: "status",
    sorter: {
      compare: (a: any, b: any) => a.status - b.status,
      multiple: 1,
    },
  },
  {
    title: "角色描述",
    dataIndex: "remark",
  },
  {
    title: "最近更新时间",
    dataIndex: "updateTime",
    sorter: {
      compare: (a: any, b: any) => a.updateTime - b.updateTime,
      multiple: 2,
    },
    render: (time: string) => {
      return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    title: "操作",
    dataIndex: "action",
  },
]);

async function handleDelete(roleId: string) {
  try {
    const res: any = await deleteSystemRole(roleId);
    if (res.code === 0) {
      message.success("删除成功！");
      tableRef.value!.forceUpdate();
    }
  } catch (error) {}
}

function handleEdit(id: string) {
  showRoleModal.value = true;
  roleId.value = id;
}

function handleAddRole() {
  showRoleModal.value = true;
  roleId.value = "";
}

function handleUpdatePermission(id: string) {
  showPermissionModal.value = true;
  roleId.value = id;
}

function handleCloseRoleModal() {
  showRoleModal.value = false;
}

function handleSuccessRoleModal() {
  showRoleModal.value = false;
  tableRef.value!.forceUpdate();
}

function handleClosePermissionModal() {
  showPermissionModal.value = false;
}

function handleSuccessPermissionModal() {
  showPermissionModal.value = false;
  tableRef.value!.forceUpdate();
}
</script>

<template>
  <section id="role-page">
    <ContentFormTable
      ref="tableRef"
      rowKey="roleId"
      :columns="columns"
      :queryTableList="queryRoleTableList"
    >
      <template #extra>
        <Button type="primary" ghost @click="handleAddRole">新增</Button>
      </template>

      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'roleId'">
          {{ (pageNum - 1) * pageSize + index + 1 }}
        </template>

        <template v-else-if="column.dataIndex === 'status'">
          <Tag v-if="record.status === 1" color="#87d068">启用</Tag>
          <Tag v-else color="#f50">禁用</Tag>
        </template>

        <template v-else-if="column.dataIndex === 'updateTime'">
          {{ dayjs(record.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>

        <template v-else-if="column.dataIndex === 'action'">
          <template v-if="buttonNameList.includes('btn.Role.remove')">
            <Popconfirm
              :overlayStyle="{ width: '300px' }"
              title="角色删除后，关联该角色的用户将无权限使用系统，是否确定继续？"
              @confirm="handleDelete(record.roleId)"
            >
              <Button danger type="link"> 删除 </Button>
            </Popconfirm>
          </template>

          <template v-if="buttonNameList.includes('btn.Role.update')">
            <Button type="link" @click="handleEdit(record.roleId)">
              编辑
            </Button>
          </template>

          <template v-if="buttonNameList.includes('btn.Role.assign')">
            <Button type="link" @click="handleUpdatePermission(record.roleId)">
              权限设置
            </Button>
          </template>
        </template>
      </template>
    </ContentFormTable>

    <RoleModal
      :roleId="roleId"
      :open="showRoleModal"
      :addRole="addSystemRole"
      :close="handleCloseRoleModal"
      :success="handleSuccessRoleModal"
      :updateRole="updateSystemRoleDetail"
      :getRoleDetail="querySystemRoleDetail"
    />

    <PermissionModal
      :roleId="roleId"
      :open="showPermissionModal"
      :resourceTree="systemResourceTree"
      :close="handleClosePermissionModal"
      :getRoleDetail="querySystemRoleDetail"
      :success="handleSuccessPermissionModal"
      :updateSysRolePermission="updateSysRolePermission"
    />
  </section>
</template>
