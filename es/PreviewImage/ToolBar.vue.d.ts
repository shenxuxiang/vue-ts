import './ToolBar.less';
declare const _default: import("vue").DefineComponent<{
    imageElement: {
        type: import("vue").PropType<HTMLImageElement>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    close: (event: any) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    imageElement: {
        type: import("vue").PropType<HTMLImageElement>;
        required: true;
    };
}>> & {
    onClose?: ((event: any) => any) | undefined;
}, {}, {}>;
export default _default;
