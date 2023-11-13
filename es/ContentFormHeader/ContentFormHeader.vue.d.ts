import './ContentFormHeader.less';
import type { VNode } from "vue";
export type Cols = 2 | 3 | 4 | 6 | 8 | 12 | 24;
export type QueryList = Array<{
    title: string;
    name?: string;
    properties?: any;
    watch?: Function;
    formType?: string;
    component?: () => VNode;
    initialValue?: any;
    dataIndex?: string;
    options?: Array<any>;
    placeholder?: string | [string, string];
    dataFormat?: (value: any) => {
        [propName: string]: any;
    };
}>;
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    cols: {
        type: import("vue").PropType<Cols>;
    };
    insertNode: {
        type: import("vue").PropType<any>;
    };
    queryList: {
        type: import("vue").PropType<QueryList>;
        required: true;
    };
    showExport: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    defaultExpand: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    submitButtonText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    hideResetButton: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    reset: (...args: any[]) => void;
    submit: (...args: any[]) => void;
    export: (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    cols: {
        type: import("vue").PropType<Cols>;
    };
    insertNode: {
        type: import("vue").PropType<any>;
    };
    queryList: {
        type: import("vue").PropType<QueryList>;
        required: true;
    };
    showExport: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    defaultExpand: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    submitButtonText: {
        type: import("vue").PropType<string>;
        default: string;
    };
    hideResetButton: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
}>> & {
    onSubmit?: ((...args: any[]) => any) | undefined;
    onReset?: ((...args: any[]) => any) | undefined;
    onExport?: ((...args: any[]) => any) | undefined;
}, {
    showExport: boolean;
    defaultExpand: boolean;
    submitButtonText: string;
    hideResetButton: boolean;
}, {}>, {
    insertNode?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
