import { axios } from "@/utils";

export const login = (query: any) => axios.post("/v1.0/login/admin", query);

export const logout = () => axios.post("/v1.0/sysUser/logout");

export const updatePassword = (query: any) =>
  axios.post("/v1.0/sysUser/changePassword", query);
