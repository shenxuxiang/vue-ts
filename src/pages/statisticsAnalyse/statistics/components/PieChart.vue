<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { init as echartsInit } from "echarts";
import type { ECharts, EChartOption } from "echarts";
import { toFixed } from "@/utils";

type PieChartProps = {
  dataSource: Array<{ name: string; value: number }>;
};

const props = withDefaults(defineProps<PieChartProps>(), {});

const divRef = ref<HTMLDivElement>();
const instance = ref<ECharts>();

onMounted(() => {
  renderChart();
});

watch(() => props.dataSource, renderChart, { immediate: true });

function legendFormatter(dataSource: PieChartProps["dataSource"]) {
  let sum = 0;
  let nameMaxLength = 0;
  let valueMaxLength = 0;

  dataSource.forEach((item) => {
    sum += item.value;
    if (item.name.length > nameMaxLength) nameMaxLength = item.name.length;
    if (`${item.value}`.length > valueMaxLength)
      valueMaxLength = `${item.value}`.length;
  });

  return function formatter(name: string) {
    const item = dataSource.filter((item) => item.name === name)[0];

    const title = `${item.name}：`.padStart(nameMaxLength + 5, " ");
    const area = `${item.value}（亩）`.padStart(valueMaxLength + 5, " ");
    const percent = `${(((item.value / sum) * 100) | 0).toFixed(2)}%`.padStart(
      10,
      " ",
    );

    return title + area + percent;
  };
}

function renderChart() {
  if (!divRef.value) return;

  if (!instance.value) instance.value = echartsInit(divRef.value);

  let sum = 0;
  props.dataSource.forEach((item) => (sum += item.value));

  const options: EChartOption = {
    title: {
      text: "作业面积（亩）",
      subtext: toFixed(sum, 1, 2),
      top: "46.5%",
      left: "29%",
      textAlign: "center",
      textVerticalAlign: "middle",
      textStyle: {
        fontSize: 15,
        color: "gray",
        lineHeight: 15,
        fontWeight: "normal",
      },
      subtextStyle: {
        fontSize: 17,
        color: "black",
        lineHeight: 30,
        // @ts-ignore
        ellipsis: "...",
        fontWeight: "bold",
        overflow: "truncate",
      },
      z: 0,
    },
    legend: {
      type: "scroll",
      icon: "roundRect",
      orient: "vertical",
      right: 0,
      bottom: 0,
      align: "right",
      textStyle: {
        fontSize: 12,
        color: "gray",
        fontWeight: "bold",
        fontFamily: "monospace",
      },
      formatter: legendFormatter(props.dataSource),
    },
    series: [
      {
        type: "pie",
        minAngle: 10,
        center: ["30%", "50%"],
        radius: ["40%", "75%"],
        minShowLabelAngle: 10,
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 2,
          borderRadius: 8,
        },
        label: {
          show: false,
          position: "center",
          fontSize: 14,
          formatter: ["{title|{b}}", "{num|{c}}"].join("\n"),
          rich: {
            title: {
              fontSize: 15,
              color: "gray",
              lineHeight: 20,
              fontWeight: "normal",
            },
            num: {
              fontSize: 17,
              color: "black",
              lineHeight: 30,
              fontWeight: "bold",
            },
          },
          width: 148,
          height: 58,
          ellipsis: "...",
          borderRadius: 10,
          overflow: "truncate",
          padding: [20, 0, 0, 0],
          backgroundColor: "#fff",
        },
        emphasis: {
          label: { show: true },
        },
        data: props.dataSource,
      },
    ],
  };
  instance.value.setOption(options);
}
</script>

<template>
  <div ref="divRef" style="height: 400px" />
</template>
