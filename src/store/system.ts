import { defineStore } from "pinia";
import { queryDictIdTypeList } from "@/services/systemUser";
import { queryRoleList, querySysResourceList } from "@/services/systemRole";
import { queryDictTypeList } from "@/services/systemDict";

type List = Array<{ value: string | number; label: string }>;

type TreeNode = Array<{ key: string | number; title: string }>;

export default defineStore("systemStore", {
  state() {
    return {
      // 角色列表
      roleList: [] as List,
      // 获取所有页面节点
      systemResourceTree: [] as any,
      // 证件类型
      dictIdTypeList: [] as List,
      // 字典类型
      dictTypeList: [] as TreeNode,
    };
  },
  actions: {
    queryRoleList(query: any) {
      return queryRoleList(query).then((res: any) => {
        const { code, data } = res;
        if (code === 0)
          this.roleList =
            data?.map?.((item: any) => ({
              label: item.roleName,
              value: item.roleId,
            })) ?? [];

        return res;
      });
    },
    querySysResourceList() {
      return querySysResourceList().then((res: any) => {
        const { code, data } = res;
        if (code === 0) this.systemResourceTree = data || [];

        return res;
      });
    },
    queryDictIdTypeList() {
      return queryDictIdTypeList().then((res: any) => {
        const { code, data } = res;
        if (code === 0)
          this.dictIdTypeList =
            data?.list?.map((item: any) => ({
              label: item.dictName,
              value: item.dictId,
            })) ?? [];

        return res;
      });
    },
    queryDictTypeList() {
      return queryDictTypeList().then((res: any) => {
        const { code, data } = res;
        console.log(data);
        if (code === 0)
          this.dictTypeList =
            data?.map((item: any) => ({
              title: item.typeName,
              key: item.typeCode,
            })) ?? [];

        return res;
      });
    },
  },
});
