import { defineComponent, ref, computed, watch, watchEffect, openBlock, createElementBlock, normalizeStyle, createElementVNode, normalizeClass, createVNode, unref, Fragment, renderList } from 'vue';
import getTransformProperties from '../utils/getTransformProperties.js';
import '../Image/index.js';
import '../Icon/index.js';
import './Slider.css';
import '../Icon/Icon.vue.js';
import script$1 from '../Icon/Icon.vue2.js';
import '../Image/Image.vue.js';
import script$2 from '../Image/Image.vue2.js';

const _hoisted_1 = { class: "qm-vnit-preview-image-bar-slider-x" };
const _hoisted_2 = ["onClick"];
var script = /*#__PURE__*/ defineComponent({
    __name: 'Slider',
    props: {
        open: { type: Boolean, required: true },
        imgs: { type: Array, required: true },
        pageSize: { type: Number, required: true },
        indicator: { type: Number, required: true }
    },
    emits: ["update:indicator"],
    setup(__props, { emit }) {
        const props = __props;
        const sliderRef = ref();
        const isFirstPage = ref(false);
        const isLastPage = ref(false);
        // 底部 bar 的宽度
        const foodBarWidth = computed(() => {
            if (props.imgs.length < props.pageSize) {
                return props.imgs.length * 120 + 68 + "px";
            }
            else {
                return props.pageSize * 120 + 68 + "px";
            }
        });
        watch([
            () => props.open,
            () => props.imgs,
            () => props.pageSize,
            () => props.indicator,
        ], sliderAnimation);
        // 计算 isFirstPage、isLastPage
        watchEffect(() => {
            const { imgs, pageSize, indicator } = props;
            if (imgs.length <= pageSize) {
                isFirstPage.value = true;
                isLastPage.value = true;
                return;
            }
            if (indicator <= pageSize / 2) {
                isFirstPage.value = true;
                isLastPage.value = false;
            }
            else if (indicator > imgs.length - pageSize / 2) {
                isFirstPage.value = false;
                isLastPage.value = true;
            }
            else {
                isFirstPage.value = false;
                isLastPage.value = false;
            }
        });
        function sliderAnimation() {
            if (!sliderRef.value || !props.open)
                return;
            const { imgs, pageSize, indicator } = props;
            const idx = indicator + 1;
            const length = imgs.length;
            // 如果 imgs 的长度小于 pageSize 则不需要滑动动效（偏移量始终都是 0）。
            if (length <= pageSize) {
                sliderRef.value.style.cssText = `
        transform: translate3d(0px, 0px, 0px);
        transition: transform 0s ease;
      `;
                return;
            }
            let cssText = "";
            const half = pageSize / 2;
            if (idx <= half) {
                cssText = `transform: translate3d(0px, 0px, 0px); transition: transform 0.3s ease;`;
            }
            else if (idx > length - half) {
                cssText = `transform: translate3d(${(pageSize - length) * 120}px, 0px, 0px); transition: transform 0.3s ease;`;
            }
            else {
                const distance = -(idx - half - 0.5) * 120;
                cssText = `transform: translate3d(${distance}px, 0px, 0px); transition: transform 0.3s ease;`;
            }
            sliderRef.value.style.cssText = cssText;
        }
        function handleChangeIndicator(index) {
            emit("update:indicator", index);
        }
        // 上一页
        function handlePrevPage() {
            // 第一页
            if (isFirstPage.value)
                return;
            isLastPage.value = false;
            const { translateX } = getTransformProperties(sliderRef.value);
            let distance = translateX + props.pageSize * 120;
            if (distance >= 0) {
                distance = 0;
                isFirstPage.value = true;
            }
            else {
                isFirstPage.value = false;
            }
            sliderRef.value.style.cssText = `transform: translate3d(${distance}px, 0px, 0px); transition: transform 0.3s ease;`;
        }
        // 下一页
        function handleNextPage() {
            // 最后一页
            if (isLastPage.value)
                return;
            isFirstPage.value = false;
            const { translateX } = getTransformProperties(sliderRef.value);
            const max = (props.imgs.length - props.pageSize) * 120;
            let distance = translateX - props.pageSize * 120;
            if (distance <= -max) {
                distance = -max;
                isLastPage.value = true;
            }
            else {
                isLastPage.value = false;
            }
            sliderRef.value.style.cssText = `transform: translate3d(${distance}px, 0px, 0px); transition: transform 0.3s ease;`;
        }
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", {
                class: "qm-vnit-preview-image-bar",
                style: normalizeStyle({ width: foodBarWidth.value })
            }, [
                createElementVNode("div", {
                    class: normalizeClass(['qm-vnit-preview-image-prevpage', { disabled: isFirstPage.value }]),
                    onClick: handlePrevPage
                }, [
                    createVNode(unref(script$1), {
                        name: "arrow-left-bold",
                        style: { "font-size": "30px" }
                    })
                ], 2 /* CLASS */),
                createElementVNode("div", {
                    class: normalizeClass(['qm-vnit-preview-image-nextpage', { disabled: isLastPage.value }]),
                    onClick: handleNextPage
                }, [
                    createVNode(unref(script$1), {
                        name: "arrow-right-bold",
                        style: { "font-size": "30px" }
                    })
                ], 2 /* CLASS */),
                createElementVNode("div", _hoisted_1, [
                    createElementVNode("ul", {
                        ref_key: "sliderRef",
                        ref: sliderRef,
                        class: "qm-vnit-preview-image-bar-slider"
                    }, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.imgs, (item, index) => {
                            return (openBlock(), createElementBlock("li", {
                                key: item + index,
                                class: normalizeClass([
                                    'qm-vnit-preview-image-bar-slider-item',
                                    { active: index === _ctx.indicator },
                                ]),
                                onClick: ($event) => (handleChangeIndicator(index))
                            }, [
                                createVNode(unref(script$2), {
                                    src: item,
                                    alt: ""
                                }, null, 8 /* PROPS */, ["src"])
                            ], 10 /* CLASS, PROPS */, _hoisted_2));
                        }), 128 /* KEYED_FRAGMENT */))
                    ], 512 /* NEED_PATCH */)
                ])
            ], 4 /* STYLE */));
        };
    }
});

export { script as default };
