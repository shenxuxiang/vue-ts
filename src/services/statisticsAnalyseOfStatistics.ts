import { axios } from "@/utils";

export const queryProductionProcessPercent = (query: any) =>
  axios.post("/v1.0/workStatistic/productLink", query);

export const queryWorkTypePercent = (query: any) =>
  axios.post("/v1.0/workStatistic/workType", query);

export const queryOperatorSortTableDataSource = (query: any) =>
  axios.post("/v1.0/workStatistic/driverWorkRank", query);

export const queryRegionalDistributionTableDataSource = (query: any) =>
  axios.post("/v1.0/workStatistic/workArea", query);

export const queryTendenceDistributionTableDataSource = (query: any) =>
  axios.post("/v1.0/workStatistic/workTrend", query);

// 面积统计
export const queryWorkStatisticArea = (query: any) =>
  axios.post("/v1.0/workStatistic/area", query);

// 机手作业排名导出
export const exportDriverWorkRank = (query: any) =>
  axios.post("/v1.0/workStatistic/driverWorkRank/export", query, {
    responseType: "blob",
  });

// 作业区域分布-生产环节/作业类型导出
export const exportWorkArea = (query: any) =>
  axios.post("/v1.0/workStatistic/workArea/export", query, {
    responseType: "blob",
  });

// 作业区域分布-生产环节/作业类型导出
export const exportWorkTrend = (query: any) =>
  axios.post("/v1.0/workStatistic/workTrend/export", query, {
    responseType: "blob",
  });

// 作业地点
export const queryRegionList = (query: any = {}) =>
  axios.post("/v1.0/chinaProvince/region", query);
