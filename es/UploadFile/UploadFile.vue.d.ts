declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    disabled: {
        type: import("vue").PropType<boolean>;
    };
    multiple: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    fileList: {
        type: import("vue").PropType<import("ant-design-vue").UploadFile<any>[]>;
    };
    action: {
        type: import("vue").PropType<string>;
        required: true;
    };
    accept: {
        type: import("vue").PropType<string>;
        default: string;
    };
    maxSize: {
        type: import("vue").PropType<number>;
    };
    maxCount: {
        type: import("vue").PropType<number>;
    };
    headers: {
        type: import("vue").PropType<{
            [propName: string]: any;
        }>;
    };
    listType: {
        type: import("vue").PropType<"text" | "picture" | "picture-card">;
        default: string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:fileList": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    disabled: {
        type: import("vue").PropType<boolean>;
    };
    multiple: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    fileList: {
        type: import("vue").PropType<import("ant-design-vue").UploadFile<any>[]>;
    };
    action: {
        type: import("vue").PropType<string>;
        required: true;
    };
    accept: {
        type: import("vue").PropType<string>;
        default: string;
    };
    maxSize: {
        type: import("vue").PropType<number>;
    };
    maxCount: {
        type: import("vue").PropType<number>;
    };
    headers: {
        type: import("vue").PropType<{
            [propName: string]: any;
        }>;
    };
    listType: {
        type: import("vue").PropType<"text" | "picture" | "picture-card">;
        default: string;
    };
}>> & {
    "onUpdate:fileList"?: ((...args: any[]) => any) | undefined;
}, {
    multiple: boolean;
    accept: string;
    listType: "text" | "picture" | "picture-card";
}, {}>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
