import './PreviewImage.less';
declare const _default: import("vue").DefineComponent<{
    open: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    index: {
        type: import("vue").PropType<number>;
        default: number;
    };
    pageSize: {
        type: import("vue").PropType<number>;
        default: number;
    };
    imgs: {
        type: import("vue").PropType<{
            url: string;
            hdUrl: string;
        }[]>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:index": (index: number) => void;
    close: () => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    open: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    index: {
        type: import("vue").PropType<number>;
        default: number;
    };
    pageSize: {
        type: import("vue").PropType<number>;
        default: number;
    };
    imgs: {
        type: import("vue").PropType<{
            url: string;
            hdUrl: string;
        }[]>;
        required: true;
    };
}>> & {
    onClose?: (() => any) | undefined;
    "onUpdate:index"?: ((index: number) => any) | undefined;
}, {
    index: number;
    pageSize: number;
}, {}>;
export default _default;
