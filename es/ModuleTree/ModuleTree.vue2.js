import { defineComponent, ref, computed, watch, h, openBlock, createElementBlock, createBlock, unref, createCommentVNode, createElementVNode, normalizeClass, createVNode, mergeProps } from 'vue';
import { Input, Tree } from 'ant-design-vue';
import { isEmpty } from '../utils/index.js';
import './ModuleTree.css';

var script = /*#__PURE__*/ defineComponent({
    ...{ inheritAttrs: false, name: 'ModuleTree' },
    __name: 'ModuleTree',
    props: {
        treeData: { type: Array, required: true },
        bordered: { type: Boolean, required: false, default: true },
        checkable: { type: Boolean, required: false, default: true },
        placeholder: { type: String, required: false, default: "请输入关键字进行查找" },
        showFilter: { type: Boolean, required: false, default: true },
        checkedKeys: { type: Array, required: false },
        expandedKeys: { type: Array, required: false },
        computedTreeData: { type: Function, required: false }
    },
    emits: ["update:expandedKeys", "update:checkedKeys"],
    setup(__props, { expose: __expose, emit }) {
        const props = __props;
        const searchValue = ref("");
        const localExpandedKeys = ref([]);
        const expandedKeys = computed({
            get: () => props.expandedKeys || localExpandedKeys.value,
            set: (value) => {
                localExpandedKeys.value = value;
                emit("update:expandedKeys", value);
            },
        });
        const checkedKeys = computed({
            get: () => props.checkedKeys,
            set: (checkedKeys) => emit("update:checkedKeys", checkedKeys),
        });
        // 根据原始的 props.treeData 计算，将格式转换成 TreeData 类型。
        // 在没有提供 props.computedTreeData 函数的情况下，直接使用 props.treeData。
        const treeData = computed(() => typeof props.computedTreeData === "function"
            ? props.computedTreeData(props.treeData)
            : props.treeData);
        // 扁平的 TreeDate
        const flatTreeData = computed(() => computedFlatTreeData(treeData.value));
        // 筛选后的 TreeData
        const filteredTreeData = computed(() => searchValue.value
            ? filterTreeData(treeData.value, searchValue.value)
            : treeData.value);
        // 输入关键字筛选 TreeData 展开树。
        watch(searchValue, () => {
            if (!searchValue.value)
                return;
            const keys = [];
            // 这里我们根据扁平的 TreeData 来计算，提升性能
            flatTreeData.value.forEach(({ title }, k) => {
                if (title.includes(searchValue.value)) {
                    keys.push(...getParentKeys(k));
                }
            });
            expandedKeys.value = [...new Set(keys)];
        });
        // 计算扁平的 treeData
        function computedFlatTreeData(treeData) {
            const result = new Map();
            const stack = [...treeData];
            while (stack.length) {
                const { parentKey, key, title, children } = stack.shift();
                result.set(key, { parentKey, title, key });
                if (isEmpty(children))
                    continue;
                let length = children.length;
                while (length--) {
                    stack.unshift(children[length]);
                }
            }
            return result;
        }
        // 获取所有的 父级 key（包含自身的 key）
        function getParentKeys(key) {
            const parentKeys = [];
            while (flatTreeData.value.has(key)) {
                parentKeys.push(key);
                const { parentKey } = flatTreeData.value.get(key);
                key = parentKey;
            }
            return parentKeys;
        }
        /**
         * 过滤、筛选出目标节点，匹配的内容将被标注为红色
         * @param treeData    Tree 组件的 treeData
         * @param searchValue 查询条件
         */
        function filterTreeData(treeData, searchValue) {
            return (treeData?.map?.((item) => {
                const { title, key, parentKey, children, ...props } = item;
                let newTitle = title;
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
                }
                else {
                    return { title: newTitle, key, parentKey, ...props };
                }
            }) ?? []);
        }
        __expose({ getParentKeys });
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", null, [
                (_ctx.showFilter)
                    ? (openBlock(), createBlock(unref(Input).Search, {
                        key: 0,
                        value: searchValue.value,
                        "onUpdate:value": _cache[0] || (_cache[0] = ($event) => ((searchValue).value = $event)),
                        style: { "margin-bottom": "8px" },
                        placeholder: _ctx.placeholder
                    }, null, 8 /* PROPS */, ["value", "placeholder"]))
                    : createCommentVNode("v-if", true),
                createElementVNode("div", {
                    class: normalizeClass({ 'tree-border': _ctx.bordered })
                }, [
                    createVNode(unref(Tree), mergeProps(_ctx.$attrs, {
                        checkedKeys: checkedKeys.value,
                        "onUpdate:checkedKeys": _cache[1] || (_cache[1] = ($event) => ((checkedKeys).value = $event)),
                        expandedKeys: expandedKeys.value,
                        "onUpdate:expandedKeys": _cache[2] || (_cache[2] = ($event) => ((expandedKeys).value = $event)),
                        treeData: filteredTreeData.value,
                        checkable: _ctx.checkable
                    }), null, 16 /* FULL_PROPS */, ["checkedKeys", "expandedKeys", "treeData", "checkable"])
                ], 2 /* CLASS */)
            ]));
        };
    }
});

export { script as default };
