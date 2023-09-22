import { axios } from "@/utils";

// 系统用户分页列表
export const queryUserTableList = (query: any) =>
  axios.post("/v1.0/sysUser/page", query);
// 新增系统用户
export const addSystemUser = (query: any) =>
  axios.post("/v1.0/sysUser/add", query);
// 系统用户详情
export const querySystemUserDetail = (userId: string) =>
  axios.post("/v1.0/sysUser/detail", { userId });
// 修改系统用户详情
export const updateSystemUserDetail = (query: any) =>
  axios.post("/v1.0/sysUser/update", query);
// 重置系统用户密码
export const resetSystemUserPassword = (userId: string) =>
  axios.post("/v1.0/sysUser/resetPwd", { userId });
// 删除系统用户
export const deleteSystemUser = (userId: string) =>
  axios.post("/v1.0/sysUser/delete", { userId });
// 证件类型
export const queryDictIdTypeList = () =>
  axios.post("/v1.0/sysDict/page", { dictTypeCode: "ID_TYPE", pageSize: 9999 });
