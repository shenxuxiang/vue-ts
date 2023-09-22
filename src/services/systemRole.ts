import { axios } from "@/utils";

// 系统角色分页列表
export const queryRoleTableList = (query: any) =>
  axios.post("/v1.0/sysRole/page", query);
// 新增系统角色
export const addSystemRole = (query: any) =>
  axios.post("/v1.0/sysRole/add", query);
// 系统角色详情
export const querySystemRoleDetail = (roleId: string) =>
  axios.post("/v1.0/sysRole/detail", { roleId });
// 修改系统角色详情
export const updateSystemRoleDetail = (query: any) =>
  axios.post("/v1.0/sysRole/update", query);
// 删除系统角色
export const deleteSystemRole = (roleId: string) =>
  axios.post("/v1.0/sysRole/delete", { roleId });
// 获取所有页面节点
export const querySysResourceList = () =>
  axios.post("/v1.0/sysResource/treeList", {});
// 编辑角色权限
export const updateSysRolePermission = (query: any) =>
  axios.post("/v1.0/sysRole/permission", query);
// 角色列表（不分页）
export const queryRoleList = (query: any) =>
  axios.post("/v1.0/sysRole/list", query);
