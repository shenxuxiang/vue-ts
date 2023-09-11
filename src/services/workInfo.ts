import { axios } from "@/utils";

// 获取工作信息分页数据
export const queryWorkInfoPageList = (query: any) =>
  axios.post("/v1.0/driverWork/workInfoPage", query);
