import { defineStore } from "pinia";
import {
  queryUserInfo,
  queryRegionList,
  queryWorkSeasonList,
  queryProductTypeList,
  queryWorkTypeList,
} from "@/services/index";
import { computedMenuResource, computedPermissions } from "@/router";
import type { MenuItem, Permissions } from "@/router";
import routerMap from "@/router/routerMap";

type SourceList = Array<{ value: string | number; label: string }>;

export default defineStore("mainStore", {
  state() {
    return {
      userInfo: {} as any,
      menuItems: [] as MenuItem[],
      permissions: new Set() as Permissions,
      regionList: [] as SourceList,
      workSeasonList: [] as SourceList,
      productTypeList: [] as SourceList,
      workTypeList: [] as SourceList,
    };
  },
  actions: {
    queryUserInfo: function () {
      return queryUserInfo().then((res: any) => {
        const { code, data } = res;
        if (code === 0) {
          this.userInfo = res.data;
          this.permissions = computedPermissions(data?.resourceTree ?? []);
          this.menuItems = computedMenuResource(
            this.permissions,
            routerMap as any,
          );
        }
        return res;
      });
    },
    queryRegionList: function () {
      return queryRegionList().then((res: any) => {
        const { code, data } = res;
        if (code === 0) this.regionList = data;

        return res;
      });
    },
    queryWorkSeasonList: function () {
      return queryWorkSeasonList().then((res: any) => {
        const { code, data } = res;
        if (code === 0) {
          this.workSeasonList =
            data?.map?.((item: any) => ({
              value: item.dictId,
              label: item.dictName,
            })) ?? [];
        }

        return res;
      });
    },

    queryProductTypeList: function () {
      return queryProductTypeList().then((res: any) => {
        const { code, data } = res;
        if (code === 0) {
          this.productTypeList =
            data?.map?.((item: any) => ({
              value: item.dictId,
              label: item.dictName,
            })) ?? [];
        }

        return res;
      });
    },

    queryWorkTypeList: function (dictId?: string) {
      return queryWorkTypeList(dictId).then((res: any) => {
        const { code, data } = res;
        if (code === 0) {
          this.workTypeList =
            data?.map?.((item: any) => ({
              value: item.jobTypeId,
              label: item.jobTypeName,
            })) ?? [];
        }

        return res;
      });
    },
  },
});
