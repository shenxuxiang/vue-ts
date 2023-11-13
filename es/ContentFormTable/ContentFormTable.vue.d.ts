import type { QueryList, Cols } from "@/lib/ContentFormHeader";
import type { TableProps } from "ant-design-vue";
import type { VNode, CSSProperties } from "vue";
import './ContentFormTable.less';
type ReturnColumn<T> = T extends Array<infer E> ? E : never;
type TableColumns = TableProps["columns"];
type TableColumn = ReturnColumn<TableColumns>;
export type Columns = Array<TableColumn & QueryList[0] & {
    visibleInTable?: boolean;
    dataFormat?: (value: any) => {
        [propName: string]: any;
    };
}>;
declare function forceUpdate(): void;
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    bordered: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    class: {
        type: import("vue").PropType<string | string[] | {
            [propName: string]: string;
        }>;
    };
    style: {
        type: import("vue").PropType<string | CSSProperties>;
    };
    cols: {
        type: import("vue").PropType<Cols>;
    };
    showExport: {
        type: import("vue").PropType<boolean>;
    };
    submitButtonText: {
        type: import("vue").PropType<string>;
    };
    columns: {
        type: import("vue").PropType<Columns>;
        required: true;
    };
    scroll: {
        type: import("vue").PropType<{
            x?: string | number | true | undefined;
            y?: string | number | undefined;
        } & {
            scrollToFirstRowOnChange?: boolean | undefined;
        }>;
    };
    rowKey: {
        type: import("vue").PropType<string>;
        required: true;
    };
    rowSelection: {
        type: import("vue").PropType<import("ant-design-vue/es/table/interface").TableRowSelection<any>>;
    };
    immediate: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    exportFileName: {
        type: import("vue").PropType<string>;
    };
    paginationSize: {
        type: import("vue").PropType<"small" | "default">;
    };
    tableSize: {
        type: import("vue").PropType<"small" | "middle" | "large">;
    };
    beforeQueryAction: {
        type: import("vue").PropType<(query: any) => boolean>;
    };
    queryTableList: {
        type: import("vue").PropType<(query: any) => Promise<any>>;
        required: true;
    };
    showTotal: {
        type: import("vue").PropType<(total: number) => string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>>;
        default: (total: number) => string;
    };
    exportTableList: {
        type: import("vue").PropType<(query: any) => Promise<any>>;
    };
    customResponse: {
        type: import("vue").PropType<(data: any) => {
            total: number;
            tableList: any[];
        }>;
        default: (data: any) => {
            tableList: any;
            total: any;
        };
    };
}, {
    forceUpdate: typeof forceUpdate;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    paginationChange: (pageNum: number, pageSize: number) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    bordered: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    class: {
        type: import("vue").PropType<string | string[] | {
            [propName: string]: string;
        }>;
    };
    style: {
        type: import("vue").PropType<string | CSSProperties>;
    };
    cols: {
        type: import("vue").PropType<Cols>;
    };
    showExport: {
        type: import("vue").PropType<boolean>;
    };
    submitButtonText: {
        type: import("vue").PropType<string>;
    };
    columns: {
        type: import("vue").PropType<Columns>;
        required: true;
    };
    scroll: {
        type: import("vue").PropType<{
            x?: string | number | true | undefined;
            y?: string | number | undefined;
        } & {
            scrollToFirstRowOnChange?: boolean | undefined;
        }>;
    };
    rowKey: {
        type: import("vue").PropType<string>;
        required: true;
    };
    rowSelection: {
        type: import("vue").PropType<import("ant-design-vue/es/table/interface").TableRowSelection<any>>;
    };
    immediate: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    exportFileName: {
        type: import("vue").PropType<string>;
    };
    paginationSize: {
        type: import("vue").PropType<"small" | "default">;
    };
    tableSize: {
        type: import("vue").PropType<"small" | "middle" | "large">;
    };
    beforeQueryAction: {
        type: import("vue").PropType<(query: any) => boolean>;
    };
    queryTableList: {
        type: import("vue").PropType<(query: any) => Promise<any>>;
        required: true;
    };
    showTotal: {
        type: import("vue").PropType<(total: number) => string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>>;
        default: (total: number) => string;
    };
    exportTableList: {
        type: import("vue").PropType<(query: any) => Promise<any>>;
    };
    customResponse: {
        type: import("vue").PropType<(data: any) => {
            total: number;
            tableList: any[];
        }>;
        default: (data: any) => {
            tableList: any;
            total: any;
        };
    };
}>> & {
    onPaginationChange?: ((pageNum: number, pageSize: number) => any) | undefined;
}, {
    bordered: boolean;
    immediate: boolean;
    showTotal: (total: number) => string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    customResponse: (data: any) => {
        total: number;
        tableList: any[];
    };
}, {}>, {
    insertHeadNode?(_: {}): any;
    extra?(_: {}): any;
    bodyCell?(_: {
        text: any;
        value: any;
        record: Record<string, any>;
        index: number;
        column: import("ant-design-vue").TableColumnType<any>;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
