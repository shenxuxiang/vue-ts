import { defineStore } from "pinia";
import {
  queryRegionList,
  queryWorkTypeList,
  queryWorkSeasonList,
  queryProductTypeList,
} from "@/services/index";

type SourceList = Array<{ value: string | number; label: string }>;

export default defineStore("mainStore", {
  state() {
    return {
      regionList: [] as SourceList,
      workTypeList: [] as SourceList,
      workSeasonList: [] as SourceList,
      productTypeList: [] as SourceList,
    };
  },
  actions: {
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
