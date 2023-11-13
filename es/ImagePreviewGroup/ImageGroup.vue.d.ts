import './ImageGroup.less';
import { CSSProperties, VNode } from 'vue';
export type ImageGroupSlots = {
    default: () => Array<VNode>;
};
export type ImageGroupProps = {
    class?: string;
    bordered?: boolean;
    options?: string[];
    style?: string | CSSProperties;
};
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    options: {
        type: import("vue").PropType<string[]>;
    };
    bordered: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    class: {
        type: import("vue").PropType<string>;
    };
    style: {
        type: import("vue").PropType<string | CSSProperties>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: import("vue").PropType<string[]>;
    };
    bordered: {
        type: import("vue").PropType<boolean>;
        default: boolean;
    };
    class: {
        type: import("vue").PropType<string>;
    };
    style: {
        type: import("vue").PropType<string | CSSProperties>;
    };
}>>, {
    bordered: boolean;
}, {}>, Readonly<ImageGroupSlots>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
