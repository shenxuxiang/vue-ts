import { axios } from "@/utils";

// APP版本分页列表
export const queryAppVersionTableList = (query: any) =>
  axios.post("/v1.0/appVersion/page", query);
// 新增APP版本
export const addSystemAppVersion = (query: any) =>
  axios.post("/v1.0/appVersion/add", query);
// 编辑APP版本
export const updateSystemAppVersion = (query: any) =>
  axios.post("/v1.0/appVersion/update", query);
// APP版本详情
export const querySystemAppVersionDetail = (appVersionId: string) =>
  axios.post("/v1.0/appVersion/detail", { appVersionId });
