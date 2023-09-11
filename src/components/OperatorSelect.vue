<script setup lang="ts">
import { queryOperatorList } from "@/services/index";
import { shallowRef, computed } from "vue";
import { Select } from "ant-design-vue";
import { debounce } from "@/utils";

type OperatorSelectProps = {
  value?: string | number;
  placeholder?: string;
};

const props = withDefaults(defineProps<OperatorSelectProps>(), {
  placeholder: "请输入机手姓名或手机号",
});
const emit = defineEmits(["change", "update:value"]);
defineOptions({ inheritAttrs: false });
const inputValue = computed({
  get: () => props.value,
  set: (value: any) => {
    emit("change", value);
    emit("update:value", value);
  },
});

const operatorList = shallowRef([]);

function onSearch(keyword: string) {
  queryOperatorList({ keyword }).then((res: any) => {
    const { code, data } = res;
    if (code === 0) {
      operatorList.value =
        data?.map?.((item: any) => ({
          label: `${item.realName}-${item.idNumber}`,
          value: item.userId,
        })) ?? [];
    }
  });
}

// 对用户的搜索操作进行节流。
const handleSearch = debounce(onSearch, 200);
// 用户搜索过滤
const filterOption = () => true;
</script>

<template>
  <Select
    v-bind="$attrs"
    v-model:value="inputValue"
    allowClear
    show-search
    :options="operatorList"
    :placeholder="placeholder"
    :filterOption="filterOption"
    @search="handleSearch"
  />
</template>
