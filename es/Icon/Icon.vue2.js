import { defineComponent, toRef, openBlock, createElementBlock, mergeProps } from 'vue';
import './font/iconfont.css';

var script = /*#__PURE__*/ defineComponent({
    ...{ inheritAttrs: false, name: 'Icon' },
    __name: 'Icon',
    props: {
        name: { type: String, required: true },
        class: { type: String, required: false },
        style: { type: null, required: false }
    },
    setup(__props) {
        const props = __props;
        const className = toRef(props, 'class');
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("i", mergeProps(_ctx.$attrs, {
                style: _ctx.style,
                class: `qm-vnit-iconfont qm-vnit-icon-${_ctx.name}${className.value ? ' ' + className.value : ''}`
            }), null, 16 /* FULL_PROPS */));
        };
    }
});

export { script as default };
