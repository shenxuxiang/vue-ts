<script setup lang="ts">
import type { TreeProps } from "ant-design-vue";
import { h, ref, watch, computed } from "vue";
import { Tree, Input } from "ant-design-vue";
import { isEmpty } from "@/utils";

type TreeDataItem = NonNullable<TreeProps["treeData"]>[0] & {
  parentKey: number | string;
  children?: TreeDataItem[];
};

export type TreeData = TreeDataItem[];

type RoleModalProps = {
  treeData: any[];
  bordered?: boolean;
  checkable?: boolean;
  placeholder?: string;
  showFilter?: boolean;
  checkedKeys?: string[] | number[];
  expandedKeys?: string[] | number[];
  computedTreeData?: (treeData: any[]) => TreeData;
};

const props = withDefaults(defineProps<RoleModalProps>(), {
  bordered: true,
  checkable: true,
  showFilter: true,
  placeholder: "请输入关键字进行查找",
});
const emit = defineEmits(["update:expandedKeys", "update:checkedKeys"]);
defineOptions({ inheritAttrs: false });
const searchValue = ref("");
const localExpandedKeys = ref<string[] | number[]>([]);
const expandedKeys = computed({
  get: () => props.expandedKeys || localExpandedKeys.value,
  set: (value: string[] | number[]) => {
    localExpandedKeys.value = value;
    emit("update:expandedKeys", value);
  },
});
const checkedKeys = computed({
  get: () => props.checkedKeys,
  set: (checkedKeys: any) => emit("update:checkedKeys", checkedKeys),
});

// 根据原始的 props.treeData 计算，将格式转换成 TreeData 类型。
// 在没有提供 props.computedTreeData 函数的情况下，直接使用 props.treeData。
const treeData = computed<TreeData>(() =>
  typeof props.computedTreeData === "function"
    ? props.computedTreeData(props.treeData)
    : props.treeData,
);

// 扁平的 TreeDate
const flatTreeData = computed(() => computedFlatTreeData(treeData.value));

// 筛选后的 TreeData
const filteredTreeData = computed<TreeData>(() =>
  searchValue.value
    ? filterTreeData(treeData.value, searchValue.value)
    : treeData.value,
);

// 输入关键字筛选 TreeData 展开树。
watch(searchValue, () => {
  if (!searchValue.value) return;

  const keys = [] as any[];
  // 这里我们根据扁平的 TreeData 来计算，提升性能
  flatTreeData.value.forEach(({ title }, k) => {
    if (title.includes(searchValue.value)) {
      keys.push(...getParentKeys(k));
    }
  });

  expandedKeys.value = [...new Set<string>(keys)];
});

// 计算扁平的 treeData
function computedFlatTreeData(treeData: TreeData) {
  const result: Map<
    string | number,
    { title: string; key: string | number; parentKey: string | number }
  > = new Map();

  const stack = [...treeData];
  while (stack.length) {
    const { parentKey, key, title, children } = stack.shift()!;
    result.set(key, { parentKey, title, key });

    if (isEmpty(children)) continue;

    let length = children.length;
    while (length--) {
      stack.unshift(children[length]);
    }
  }
  return result;
}

// 获取所有的 父级 key（包含自身的 key）
function getParentKeys(key: string | number) {
  const parentKeys: Array<string | number> = [];

  while (flatTreeData.value.has(key)) {
    parentKeys.push(key);
    const { parentKey } = flatTreeData.value.get(key)!;
    key = parentKey;
  }
  return parentKeys;
}

/**
 * 过滤、筛选出目标节点，匹配的内容将被标注为红色
 * @param treeData    Tree 组件的 treeData
 * @param searchValue 查询条件
 */
function filterTreeData(treeData: TreeData, searchValue: string) {
  return (
    treeData?.map?.((item) => {
      const { title, key, parentKey, children, ...props } = item;

      let newTitle: any = title;

      if (title.indexOf(searchValue) >= 0) {
        newTitle = [];
        const ary = title.split(searchValue);
        const length = ary.length;

        for (let i = 0; i < length; i++) {
          ary[i] && newTitle.push(ary[i]);
          if (i < length - 1) {
            // 相邻的两个元素之间才会添加
            newTitle.push(h("span", { style: "color: #f50;" }, searchValue));
          }
        }

        newTitle = newTitle;
      }

      if (children?.length) {
        return {
          key,
          parentKey,
          title: newTitle,
          children: filterTreeData(children, searchValue),
          ...props,
        };
      } else {
        return { title: newTitle, key, parentKey, ...props };
      }
    }) ?? []
  );
}

defineExpose({ getParentKeys });
</script>

<template>
  <div>
    <Input.Search
      v-if="showFilter"
      v-model:value="searchValue"
      style="margin-bottom: 8px"
      :placeholder="placeholder"
    />
    <div :class="{ 'tree-border': bordered }">
      <Tree
        v-bind="$attrs"
        v-model:checkedKeys="checkedKeys"
        v-model:expandedKeys="expandedKeys"
        :treeData="filteredTreeData"
        :checkable="checkable"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.tree-border {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>
