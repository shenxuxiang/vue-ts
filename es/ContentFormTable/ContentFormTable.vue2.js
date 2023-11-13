import { defineComponent, toRef, computed, ref, reactive, watch, openBlock, createElementBlock, normalizeClass, normalizeStyle, createBlock, unref, withCtx, renderSlot, createCommentVNode, createElementVNode, createVNode, mergeProps, normalizeProps, guardReactiveProps } from 'vue';
import '../ContentFormHeader/index.js';
import { Table, Pagination } from 'ant-design-vue';
import { downloadFile, isArray } from '../utils/index.js';
import './ContentFormTable.css';
import '../ContentFormHeader/ContentFormHeader.vue.js';
import script$1 from '../ContentFormHeader/ContentFormHeader.vue2.js';

const _hoisted_1 = { class: "qm-content-form-table-body" };
const _hoisted_2 = { class: "qm-content-form-table-body-head" };
const _hoisted_3 = /*#__PURE__*/ createElementVNode("p", { style: { "margin-left": "16px" } }, "查询表格", -1 /* HOISTED */);
var script = /*#__PURE__*/ defineComponent({
    ...{ inheritAttrs: false, name: 'ContentFormTable' },
    __name: 'ContentFormTable',
    props: {
        cols: { type: null, required: false },
        rowKey: { type: String, required: true },
        columns: { type: Array, required: true },
        bordered: { type: Boolean, required: false, default: true },
        immediate: { type: Boolean, required: false, default: true },
        showExport: { type: Boolean, required: false },
        exportFileName: { type: String, required: false },
        submitButtonText: { type: String, required: false },
        scroll: { type: null, required: false },
        style: { type: null, required: false },
        paginationSize: { type: String, required: false },
        tableSize: { type: String, required: false },
        rowSelection: { type: null, required: false },
        beforeQueryAction: { type: Function, required: false },
        queryTableList: { type: Function, required: true },
        showTotal: { type: Function, required: false, default: (total) => `共${total}条数据` },
        exportTableList: { type: Function, required: false },
        class: { type: [String, Array, Object], required: false },
        customResponse: { type: Function, required: false, default: (data) => ({ tableList: data.list, total: data.total }) }
    },
    emits: ["paginationChange"],
    setup(__props, { expose: __expose, emit }) {
        const props = __props;
        const className = toRef(props, "class");
        // 合成 columns: { queryList, tableColumns }
        const combinationColumns = computed(computedColumns);
        // 查询条件
        const searchCondition = ref(computedInitialSearchCondition());
        const tableResource = reactive({
            total: 0,
            pageNum: 1,
            pageSize: 10,
            tableList: [],
        });
        const loading = ref(false);
        // 排序
        let sorter = ref([]);
        // eslint-disable-next-line
        watch([
            () => tableResource.pageNum,
            () => tableResource.pageSize,
            sorter,
            searchCondition,
        ], getTableList, { immediate: props.immediate });
        // 计算 queryList、tableColumns
        function computedColumns() {
            const newQueryList = [];
            const newTableColumns = [];
            props.columns.forEach((item) => {
                const { visibleInTable = true, component, formType } = item;
                if (formType || component) {
                    newQueryList.push({
                        // @ts-ignore
                        name: item.name || item.dataIndex,
                        title: item.title,
                        watch: item.watch,
                        options: item.options,
                        formType: item.formType,
                        component: item.component,
                        dataFormat: item.dataFormat,
                        properties: item.properties,
                        placeholder: item.placeholder,
                        initialValue: item.initialValue,
                    });
                }
                if (visibleInTable === true) {
                    newTableColumns.push(item);
                }
            });
            return { queryList: newQueryList, tableColumns: newTableColumns };
        }
        // 初始化 searchCondition
        function computedInitialSearchCondition() {
            const result = {};
            combinationColumns.value.queryList.forEach((item) => {
                const { dataIndex, name = dataIndex, dataFormat, initialValue } = item;
                if (initialValue) {
                    if (typeof dataFormat === "function") {
                        delete result[name];
                        Object.assign(result, dataFormat(initialValue));
                    }
                    else {
                        result[name] = initialValue;
                    }
                }
            });
            return result;
        }
        // 获取表格相关资源
        function getTableList() {
            const params = {
                ...searchCondition.value,
                pageSize: tableResource.pageSize,
                pageNum: tableResource.pageNum,
                order: sorter.value,
            };
            if (props.beforeQueryAction?.(params) ?? true) {
                loading.value = true;
                props
                    .queryTableList(params)
                    .then((res) => Object.assign(tableResource, props.customResponse(res.data)))
                    .finally(() => (loading.value = false));
            }
        }
        // 提交
        function handleSubmit(values) {
            searchCondition.value = values;
            Object.assign(tableResource, { pageSize: 10, pageNum: 1 });
        }
        // 重置
        function handleReset(values) {
            searchCondition.value = values;
            Object.assign(tableResource, { pageSize: 10, pageNum: 1 });
        }
        // 导出
        function handleExport(values) {
            props?.exportTableList?.(values)?.then((res) => {
                const { fileName, data } = res;
                downloadFile(props?.exportFileName ?? fileName, data);
            });
        }
        // 分页
        function handlePaginationChange(pageNum, pageSize) {
            Object.assign(tableResource, { pageSize, pageNum });
            emit("paginationChange", pageNum, pageSize);
        }
        // 表格排序
        function handleTableChange() {
            const sort = arguments[2];
            const result = [];
            if (isArray(sort)) {
                sort.forEach((item) => {
                    const { field, order } = item;
                    order && result.push({ field, direction: order === "ascend" });
                });
            }
            else {
                sort.order &&
                    result.push({ field: sort.field, direction: sort.order === "ascend" });
            }
            sorter.value = result;
        }
        // 强制更新数据
        function forceUpdate() {
            getTableList();
        }
        __expose({ forceUpdate });
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("section", {
                class: normalizeClass(['qm-content-form-table', className.value]),
                style: normalizeStyle(_ctx.style)
            }, [
                (combinationColumns.value.queryList.length)
                    ? (openBlock(), createBlock(unref(script$1), {
                        key: 0,
                        cols: _ctx.cols,
                        showExport: _ctx.showExport,
                        submitButtonText: _ctx.submitButtonText,
                        queryList: combinationColumns.value.queryList,
                        onReset: handleReset,
                        onExport: handleExport,
                        onSubmit: handleSubmit
                    }, {
                        insertNode: withCtx(() => [
                            renderSlot(_ctx.$slots, "insertHeadNode")
                        ]),
                        _: 3 /* FORWARDED */
                    }, 8 /* PROPS */, ["cols", "showExport", "submitButtonText", "queryList"]))
                    : createCommentVNode("v-if", true),
                createElementVNode("div", _hoisted_1, [
                    createElementVNode("div", _hoisted_2, [
                        _hoisted_3,
                        renderSlot(_ctx.$slots, "extra")
                    ]),
                    createVNode(unref(Table), mergeProps({ bordered: "" }, _ctx.$attrs, {
                        rowKey: _ctx.rowKey,
                        scroll: _ctx.scroll,
                        size: _ctx.tableSize,
                        loading: loading.value,
                        pagination: false,
                        rowSelection: _ctx.rowSelection,
                        dataSource: tableResource.tableList,
                        columns: combinationColumns.value.tableColumns,
                        onChange: handleTableChange
                    }), {
                        bodyCell: withCtx((bodyCellProps) => [
                            renderSlot(_ctx.$slots, "bodyCell", normalizeProps(guardReactiveProps(bodyCellProps)))
                        ]),
                        _: 3 /* FORWARDED */
                    }, 16 /* FULL_PROPS */, ["rowKey", "scroll", "size", "loading", "rowSelection", "dataSource", "columns"]),
                    createVNode(unref(Pagination), {
                        pageSize: tableResource.pageSize,
                        current: tableResource.pageNum,
                        total: tableResource.total,
                        showTotal: _ctx.showTotal,
                        size: _ctx.paginationSize,
                        class: "qm-content-form-table-pagination",
                        onChange: handlePaginationChange
                    }, null, 8 /* PROPS */, ["pageSize", "current", "total", "showTotal", "size"])
                ])
            ], 6 /* CLASS, STYLE */));
        };
    }
});

export { script as default };
