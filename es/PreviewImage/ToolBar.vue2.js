import { defineComponent, openBlock, createElementBlock, createVNode, unref } from 'vue';
import getTransformProperties from '../utils/getTransformProperties.js';
import '../Icon/index.js';
import './ToolBar.css';
import '../Icon/Icon.vue.js';
import script$1 from '../Icon/Icon.vue2.js';

const _hoisted_1 = { class: "qm-vnit-preview-image-header" };
var script = /*#__PURE__*/ defineComponent({
    __name: 'ToolBar',
    props: {
        imageElement: { type: null, required: true }
    },
    emits: ["close"],
    setup(__props) {
        const props = __props;
        // Y轴镜像
        function handleMirrorY() {
            const { scaleX, scaleY, rotate } = getTransformProperties(props.imageElement);
            props.imageElement.style.cssText = `transform: scale(${scaleX}, ${scaleY * -1}) rotate(${rotate}deg);`;
        }
        // X轴镜像
        function handleMirrorX() {
            const { scaleX, scaleY, rotate } = getTransformProperties(props.imageElement);
            props.imageElement.style.cssText = `transform: scale(${scaleX * -1}, ${scaleY}) rotate(${rotate}deg);`;
        }
        // 缩小
        function handleShrink() {
            const { scaleX, scaleY, rotate } = getTransformProperties(props.imageElement);
            let x = scaleX * 0.8;
            let y = scaleY * 0.8;
            if (Math.abs(x) < 1)
                x = Math.sign(x);
            if (Math.abs(y) < 1)
                y = Math.sign(y);
            props.imageElement.style.cssText = `transform: scale(${x}, ${y}) rotate(${rotate}deg);`;
        }
        // 放大
        function handleEnlarge() {
            const { scaleX, scaleY, rotate } = getTransformProperties(props.imageElement);
            props.imageElement.style.cssText = `transform: scale(${scaleX * 1.25}, ${scaleY * 1.25}) rotate(${rotate}deg);`;
        }
        // 顺时针旋转
        function handleRotateLeft() {
            const { scaleX, scaleY, rotate } = getTransformProperties(props.imageElement);
            props.imageElement.style.cssText = `transform: scale(${scaleX}, ${scaleY}) rotate(${rotate + 90}deg);`;
        }
        // 逆时针旋转
        function handleRotateRight() {
            const { scaleX, scaleY, rotate } = getTransformProperties(props.imageElement);
            props.imageElement.style.cssText = `transform: scale(${scaleX}, ${scaleY}) rotate(${rotate - 90}deg);`;
        }
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", _hoisted_1, [
                createVNode(unref(script$1), {
                    name: "swap-outline",
                    style: { "transform": "rotate(90deg)" },
                    class: "qm-vnit-preview-image-icon",
                    onClick: handleMirrorY
                }),
                createVNode(unref(script$1), {
                    name: "swap-outline",
                    class: "qm-vnit-preview-image-icon",
                    onClick: handleMirrorX
                }),
                createVNode(unref(script$1), {
                    name: "rotate-left",
                    class: "qm-vnit-preview-image-icon",
                    onClick: handleRotateRight
                }),
                createVNode(unref(script$1), {
                    name: "rotate-right",
                    class: "qm-vnit-preview-image-icon",
                    onClick: handleRotateLeft
                }),
                createVNode(unref(script$1), {
                    name: "minus-circle",
                    class: "qm-vnit-preview-image-icon",
                    onClick: handleShrink
                }),
                createVNode(unref(script$1), {
                    name: "plus-circle",
                    class: "qm-vnit-preview-image-icon",
                    onClick: handleEnlarge
                }),
                createVNode(unref(script$1), {
                    name: "close",
                    class: "qm-vnit-preview-image-icon",
                    onClick: _cache[0] || (_cache[0] = ($event) => (_ctx.$emit('close', $event)))
                })
            ]));
        };
    }
});

export { script as default };
