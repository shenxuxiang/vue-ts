import { axios } from "@/utils";
// 用户信息
export const queryUserInfo = () => axios.post("/v1.0/sysUser/info");
// 作业地点
export const queryRegionList = () =>
  axios.post("/v1.0/chinaProvince/region", {});
// 工作季
export const queryWorkSeasonList = () =>
  axios.post("/v1.0/sysDict/list", { dictTypeCode: "WORK_SEASON" });
// 工作环节
export const queryProductTypeList = () =>
  axios.post("/v1.0/sysDict/list", { dictTypeCode: "PRODUCT_LINK" });
// 工作类型
export const queryWorkTypeList = (dictId?: string) =>
  axios.post("/v1.0/sysJobType/list", { dictTypeCode: "PRODUCT_LINK", dictId });
// 机手
export const queryOperatorList = (query: any) =>
  axios.post("/v1.0/sysUser/queryDriver", query);
