import { axios } from "@/utils";

// 作业类型列表
export const queryWorkTypeTableList = (query: any) =>
  axios.post("/v1.0/sysJobType/page", query);
// 新增作业类型
export const addSystemWorkType = (query: any) =>
  axios.post("/v1.0/sysJobType/add", query);
// 编辑作业类型
export const updateSystemWorkType = (query: any) =>
  axios.post("/v1.0/sysJobType/update", query);
// 删除作业类型
export const deleteSystemWorkType = (jobTypeId: string) =>
  axios.post("/v1.0/sysJobType/delete", { jobTypeId });
// 作业类型详情
export const querySystemWorkTypeDetail = (jobTypeId: string) =>
  axios.post("/v1.0/sysJobType/detail", { jobTypeId });
