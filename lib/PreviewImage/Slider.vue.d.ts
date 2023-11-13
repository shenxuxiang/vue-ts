import './Slider.less';
declare const _default: import("vue").DefineComponent<{
    open: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    pageSize: {
        type: import("vue").PropType<number>;
        required: true;
    };
    indicator: {
        type: import("vue").PropType<number>;
        required: true;
    };
    imgs: {
        type: import("vue").PropType<string[]>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:indicator": (indicator: number) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    open: {
        type: import("vue").PropType<boolean>;
        required: true;
    };
    pageSize: {
        type: import("vue").PropType<number>;
        required: true;
    };
    indicator: {
        type: import("vue").PropType<number>;
        required: true;
    };
    imgs: {
        type: import("vue").PropType<string[]>;
        required: true;
    };
}>> & {
    "onUpdate:indicator"?: ((indicator: number) => any) | undefined;
}, {}, {}>;
export default _default;
