import { axios } from "@/utils";

// 字典分页列表
export const queryDictionaryTableList = (query: any) =>
  axios.post("/v1.0/sysDict/page", query);
// 字典类型列表
export const queryDictTypeList = () => axios.post("/v1.0/sysDictType/list", {});
// 新增字典
export const addSystemDict = (query: any) =>
  axios.post("/v1.0/sysDict/add", query);
// 编辑字典
export const updateSystemDict = (query: any) =>
  axios.post("/v1.0/sysDict/update", query);
// 字典详情
export const querySystemDictDetail = (dictId: string) =>
  axios.post("/v1.0/sysDict/detail", { dictId });
// 删除字典
export const deleteSystemDict = (dictId: string) =>
  axios.post("/v1.0/sysDict/delete", { dictId });
