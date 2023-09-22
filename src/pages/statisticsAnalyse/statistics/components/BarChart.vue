<script setup lang="ts">
import type { EChartOption, ECharts } from "echarts";
import { init as echartsInit } from "echarts";
import { ref, watch, onMounted } from "vue";
import { toFixed } from "@/utils";

type BarChartProps = {
  categoryList: Array<{ key: string }>;
  dataSource: Array<{ [propName: string]: string | number }>;
  rowKey: string;
};

const props = withDefaults(defineProps<BarChartProps>(), {});
const divRef = ref<HTMLDivElement>();

const instance = ref<ECharts>();

onMounted(renderChart);

watch(
  [() => props.categoryList, () => props.dataSource, () => props.rowKey],
  renderChart,
  { immediate: true },
);

function renderChart() {
  if (!divRef.value) return;

  if (!instance.value) instance.value = echartsInit(divRef.value);

  // 维度
  const dimensions = props.categoryList.map((item) => item.key);
  // 数据
  const source = props.dataSource.map((item) => {
    const result: Array<string | number> = [];
    dimensions.forEach((key, index) => {
      result.push(index > 0 ? +toFixed(item[key], 1, 2) : item[key]);
    });

    return result;
  });

  const options: EChartOption = {
    grid: {
      top: 80,
      left: 24,
      right: 24,
      bottom: 50,
      containLabel: true,
    },
    legend: {
      type: "plain",
      icon: "circle",
      align: "left",
      top: 20,
      left: 24,
    },
    tooltip: {
      show: true,
      trigger: "item",
    },
    xAxis: {
      type: "category",
      position: "bottom",
      boundaryGap: true,
      axisTick: { show: false },
      axisLabel: { color: "gray" },
      axisLine: {
        show: true,
        onZero: true,
        onZeroAxisIndex: 0,
        lineStyle: {
          width: 1,
          color: "#e6e6e6",
          type: "solid",
        },
      },
    },
    yAxis: {
      type: "value",
      position: "left",
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { color: "gray" },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: "#e6e6e6",
          type: "dashed",
        },
      },
    },
    series: Array(
      props.categoryList?.length > 1 ? props.categoryList?.length - 1 : 0,
    ).fill({
      type: "bar",
      barMaxWidth: 40,
      colorBy: "series",
      itemStyle: {
        borderRadius: [6, 6, 0, 0],
      },
    }),
    dataset: {
      source,
      dimensions,
    },
  };

  instance.value.setOption(options);
}
</script>

<template>
  <div ref="divRef" style="height: 400px" />
</template>
