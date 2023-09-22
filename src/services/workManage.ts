import { axios } from "@/utils";

export const queryWorkManageTableList = (query: any) =>
  axios.post("/v1.0/driverWork/page", query);

export const deleteRecord = (workId: string) =>
  axios.post("/v1.0/driverWork/delete", { workId });
