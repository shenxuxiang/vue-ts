declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    name: {
        type: import("vue").PropType<string>;
        required: true;
    };
    status: {
        type: import("vue").PropType<"loading" | "error" | "done" | "remove">;
        default: string;
    };
    url: {
        type: import("vue").PropType<string>;
    };
    action: {
        type: import("vue").PropType<string>;
        required: true;
    };
    headers: {
        type: import("vue").PropType<() => {
            [key: string]: any;
        }>;
    };
    uid: {
        type: import("vue").PropType<string>;
        required: true;
    };
    percent: {
        type: import("vue").PropType<number>;
        default: number;
    };
    response: {
        type: import("vue").PropType<any>;
    };
    method: {
        type: import("vue").PropType<string>;
        default: string;
    };
    rowSource: {
        type: import("vue").PropType<File>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    remove: (uid: string) => void;
    preview: (uid: string) => void;
    error: (uid: string, err: any) => void;
    success: (uid: string, res: any) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: import("vue").PropType<string>;
        required: true;
    };
    status: {
        type: import("vue").PropType<"loading" | "error" | "done" | "remove">;
        default: string;
    };
    url: {
        type: import("vue").PropType<string>;
    };
    action: {
        type: import("vue").PropType<string>;
        required: true;
    };
    headers: {
        type: import("vue").PropType<() => {
            [key: string]: any;
        }>;
    };
    uid: {
        type: import("vue").PropType<string>;
        required: true;
    };
    percent: {
        type: import("vue").PropType<number>;
        default: number;
    };
    response: {
        type: import("vue").PropType<any>;
    };
    method: {
        type: import("vue").PropType<string>;
        default: string;
    };
    rowSource: {
        type: import("vue").PropType<File>;
    };
}>> & {
    onError?: ((uid: string, err: any) => any) | undefined;
    onPreview?: ((uid: string) => any) | undefined;
    onRemove?: ((uid: string) => any) | undefined;
    onSuccess?: ((uid: string, res: any) => any) | undefined;
}, {
    status: "loading" | "error" | "done" | "remove";
    percent: number;
    method: string;
}, {}>, {
    itemRender?(_: {
        src: string;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
