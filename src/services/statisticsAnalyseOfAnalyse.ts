import { axios } from "@/utils";

export const queryProductAnalysisTableList = (query: any) =>
  axios.post("/v1.0/productAnalysis/analyse", query);

export const exportProductAnalysis = (query: any) =>
  axios.post("/v1.0/productAnalysis/export", query, { responseType: "blob" });
