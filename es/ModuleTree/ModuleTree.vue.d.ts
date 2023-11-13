import type { TreeProps } from "ant-design-vue";
import './ModuleTree.less';
type TreeDataItem = NonNullable<TreeProps["treeData"]>[0] & {
    parentKey: number | string;
    children?: TreeDataItem[];
};
export type TreeData = TreeDataItem[];
declare function getParentKeys(key: string | number): (string | number)[];
declare const _default: import("vue").DefineComponent<{
    placeholder: {
        type: import("vue").PropType<string>;
        default: string;
    };
    bordered: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    checkable: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    expandedKeys: {
        type: import("vue").PropType<string[] | number[]>;
    };
    checkedKeys: {
        type: import("vue").PropType<string[] | number[]>;
    };
    treeData: {
        type: import("vue").PropType<any[]>;
        required: true;
    };
    showFilter: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    computedTreeData: {
        type: import("vue").PropType<(treeData: any[]) => TreeData>;
    };
}, {
    getParentKeys: typeof getParentKeys;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:expandedKeys": (...args: any[]) => void;
    "update:checkedKeys": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    placeholder: {
        type: import("vue").PropType<string>;
        default: string;
    };
    bordered: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    checkable: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    expandedKeys: {
        type: import("vue").PropType<string[] | number[]>;
    };
    checkedKeys: {
        type: import("vue").PropType<string[] | number[]>;
    };
    treeData: {
        type: import("vue").PropType<any[]>;
        required: true;
    };
    showFilter: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    computedTreeData: {
        type: import("vue").PropType<(treeData: any[]) => TreeData>;
    };
}>> & {
    "onUpdate:checkedKeys"?: ((...args: any[]) => any) | undefined;
    "onUpdate:expandedKeys"?: ((...args: any[]) => any) | undefined;
}, {
    placeholder: string;
    bordered: boolean;
    checkable: boolean;
    showFilter: boolean;
}, {}>;
export default _default;
