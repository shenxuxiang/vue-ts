import { defineStore } from "pinia";
import {
  queryWorkStatisticArea,
  queryProductionProcessPercent,
  queryWorkTypePercent,
} from "@/services/statisticsAnalyseOfStatistics";
export default defineStore("statisticsStore", {
  state() {
    return {
      // 统计面积
      statisticArea: {} as { [propName: string]: number | string },
      // 作业类型占比
      productionProcessPercent: [] as any,
      // 生产环节占比
      workTypePercent: [] as any,
    };
  },
  actions: {
    queryWorkStatisticArea(query: any) {
      return queryWorkStatisticArea(query).then((res: any) => {
        const { code, data } = res;
        if (code === 0) this.statisticArea = data;

        return res;
      });
    },
    queryProductionProcessPercent(query: any) {
      return queryProductionProcessPercent(query).then((res: any) => {
        const { code, data } = res;
        if (code === 0)
          this.productionProcessPercent =
            data?.map?.((item: any) => ({
              value: item.area,
              name: item.name,
            })) ?? [];

        return res;
      });
    },
    queryWorkTypePercent(query: any) {
      return queryWorkTypePercent(query).then((res: any) => {
        const { code, data } = res;
        if (code === 0)
          this.workTypePercent =
            data?.map?.((item: any) => ({
              value: item.area,
              name: item.name,
            })) ?? [];

        return res;
      });
    },
  },
});
