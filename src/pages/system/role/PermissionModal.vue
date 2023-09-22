<script setup lang="ts">
import { Modal, Input, Form, message } from "ant-design-vue";
import type { TreeData } from "@/components/ModuleTree";
import ModuleTree from "@/components/ModuleTree";
import { isEmpty } from "@/utils";
import { ref, watch } from "vue";

type RoleModalProps = {
  open: boolean;
  roleId: string;
  resourceTree: any[];
  close: () => void;
  success: () => void;
  getRoleDetail: (query: any) => Promise<any>;
  updateSysRolePermission: (query: any) => Promise<any>;
};

const props = withDefaults(defineProps<RoleModalProps>(), {});
const { TextArea } = Input;
const { useForm, Item: FormItem } = Form;
const loading = ref(false);
const labelCol = ref({ span: 4 });
const wrapperCol = ref({ span: 18 });

const formModels = ref({
  remark: "",
  roleName: "",
  permission: [] as string[],
  expandedKeys: [] as string[],
});
const { resetFields } = useForm(formModels);
const moduleTreeRef = ref<InstanceType<typeof ModuleTree>>();

watch([() => props.open, () => props.roleId], _getRoleDetail);

function _getRoleDetail() {
  if (props.roleId && props.open) {
    props.getRoleDetail(props.roleId).then((res: any) => {
      const { code, data } = res;
      if (code === 0) {
        const { roleName, remark, resourceIdList } = data;
        const parentKeys: Array<string | number> = [];
        resourceIdList.forEach((id: string) => {
          const keys = moduleTreeRef.value!.getParentKeys(id);
          parentKeys.push(...keys.slice(1));
        });

        formModels.value = {
          remark,
          roleName,
          // 每次都将 Tree 收起
          expandedKeys: [],
          permission: resourceIdList.filter((id) => !parentKeys.includes(id)),
        };
      }
    });
  }
}

function handleOk() {
  const resourceIdList: Array<string | number> = [];

  formModels.value.permission.forEach((id) => {
    resourceIdList.push(...moduleTreeRef.value!.getParentKeys(id));
  });

  props
    .updateSysRolePermission({
      roleId: props.roleId,
      resourceIdList: [...new Set(resourceIdList)],
    })
    .then((res: any) => {
      if (res.code === 0) {
        message.success("权限设置成功！");
        props.success();
      }
    });
}

function handleCancel() {
  if (loading.value) {
    message.warning("正在提交，不可取消！");
    return;
  }

  props.close();
}

// 计算 treeData
function computedTreeData(treeData: any[]) {
  const result: TreeData = [];
  treeData.forEach((item) => {
    const { name, resourceId, children, parentId } = item;

    result.push({
      parentKey: parentId,
      key: resourceId,
      title: name,
      children: isEmpty(children) ? undefined : computedTreeData(children)!,
    });
  });
  return result;
}

function afterClose() {
  resetFields();
}
</script>

<template>
  <Modal
    title="权限设置"
    :open="open"
    :width="800"
    :closable="false"
    :maskClosable="false"
    :afterClose="afterClose"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <Form :labelCol="labelCol" :wrapperCol="wrapperCol">
      <FormItem name="roleName" label="角色名称">
        <Input
          v-model:value="formModels.roleName"
          disabled
          placeholder="请输入角色名称"
        />
      </FormItem>

      <FormItem name="remark" label="名称描述">
        <TextArea
          v-model:value="formModels.remark"
          disabled
          :rows="3"
          placeholder="请输入至少五个字符"
        />
      </FormItem>

      <FormItem name="permission" label="web端权限">
        <ModuleTree
          ref="moduleTreeRef"
          v-model:checkedKeys="formModels.permission"
          v-model:expandedKeys="formModels.expandedKeys"
          :treeData="resourceTree"
          :computedTreeData="computedTreeData"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
