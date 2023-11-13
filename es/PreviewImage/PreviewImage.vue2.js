import { defineComponent, ref, watch, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, createCommentVNode, unref, withModifiers, createVNode, normalizeClass, vShow } from 'vue';
import { throttle, getViewportSize } from '../utils/index.js';
import getTransformProperties from '../utils/getTransformProperties.js';
import './ToolBar.vue.js';
import './Slider.vue.js';
import '../Icon/index.js';
import './PreviewImage.css';
import script$1 from './ToolBar.vue2.js';
import '../Icon/Icon.vue.js';
import script$2 from '../Icon/Icon.vue2.js';
import script$3 from './Slider.vue2.js';

const _hoisted_1 = { class: "qm-vnit-preview-image" };
const _hoisted_2 = ["src", "onDragstart", "onMouseup"];
var script = /*#__PURE__*/ defineComponent({
    ...{ name: 'PreviewImage' },
    __name: 'PreviewImage',
    props: {
        pageSize: { type: Number, required: false, default: 9 },
        imgs: { type: Array, required: true },
        index: { type: Number, required: false, default: 0 },
        open: { type: Boolean, required: true }
    },
    emits: ["update:index", "close"],
    setup(__props, { emit }) {
        const props = __props;
        // 开关，表示用户正在拖拽图片（当为true时，图片将跟随用户鼠标进行移动）
        let _isMoveing = false;
        // 鼠标指针起始位置
        const _mouseOriginPoint = { x: 0, y: 0 };
        // 原始点位
        const _originPoint = { x: 0, y: 0 };
        const imgRef = ref();
        const imgXRef = ref();
        // 指示器（当前展示的是第几张图片）
        const indicator = ref(0);
        // 当组件展示时，不让页面滚动。
        watch(() => props.open, () => {
            if (props.open) {
                document.documentElement.style.overflow = "hidden";
            }
            else {
                document.documentElement.style.overflow = "";
            }
        });
        watch(() => props.index, () => {
            if (props.index === indicator.value)
                return;
            indicator.value = props.index;
        }, { immediate: true });
        // 监听 mousewheel 事件，对图片进行缩放
        const onMouseWheel = throttle(scrollMouseWheel, 50);
        // 监听 mousemove 事件，对图片进行拖拽
        const onMouseMove = throttle(handleMouseMove, 20);
        // 当用户放开鼠标时触发。
        function handleMouseUp(event) {
            event.preventDefault();
            const { offsetWidth, offsetHeight } = imgRef.value;
            const { scaleX, scaleY } = getTransformProperties(imgRef.value);
            const width = Math.abs(offsetWidth * scaleX);
            const height = Math.abs(offsetHeight * scaleY);
            const viewportSize = getViewportSize();
            if (width <= viewportSize.width && height <= viewportSize.height) {
                imgXRef.value.style.cssText = `
        transform: translate3d(0px, 0px, 0px);
        transition: transform .3s ease;
      `;
            }
            else {
                let limitedX = 0;
                let limitedY = 0;
                if (width > viewportSize.width) {
                    limitedX = (width - viewportSize.width) / 2;
                }
                if (height > viewportSize.height) {
                    limitedY = (height - viewportSize.height) / 2;
                }
                let { translateX, translateY } = getTransformProperties(imgXRef.value);
                if (limitedX) {
                    if (translateX > limitedX) {
                        translateX = limitedX;
                    }
                    else if (translateX < -limitedX) {
                        translateX = -limitedX;
                    }
                }
                else {
                    translateX = 0;
                }
                if (limitedY) {
                    if (translateY > limitedY) {
                        translateY = limitedY;
                    }
                    else if (translateY < -limitedY) {
                        translateY = -limitedY;
                    }
                }
                else {
                    translateY = 0;
                }
                imgXRef.value.style.cssText = `
        transform: translate3d(${translateX}px, ${translateY}px, 0px);
        transition: transform .3s ease;
      `;
            }
            _isMoveing = false;
        }
        // 图片开始拖拽事件
        function handleDragStart(event) {
            // 阻止默认行为，这样可以避免触发img元素的拖拽。
            event.preventDefault();
            _isMoveing = true;
            const { translateX, translateY } = getTransformProperties(imgXRef.value);
            _mouseOriginPoint.x = event.clientX;
            _mouseOriginPoint.y = event.clientY;
            _originPoint.x = translateX;
            _originPoint.y = translateY;
        }
        // 当鼠标在 imgXRef 元素上移动时，图片将跟随鼠标移动
        function handleMouseMove(event) {
            if (!_isMoveing)
                return;
            event.preventDefault();
            const { clientX, clientY } = event;
            const distanceX = clientX - _mouseOriginPoint.x;
            const distanceY = clientY - _mouseOriginPoint.y;
            // 注意，并不是图片在移动，而是图片外层的div容器在移动。
            // 并且，每次移动都是相对 dragStart 事件开始时的 _originPoint 点位进行计算，
            // 偏移量则是相对 dragStart 事件的 clientX、clientY 进行计算
            imgXRef.value.style.cssText = `
      transform: translate3D(${_originPoint.x + distanceX}px, ${_originPoint.y + distanceY}px, 0px);
    `;
        }
        // 鼠标滚轮事件
        function scrollMouseWheel(event) {
            if (event.deltaY < 0) {
                handleEnlarge();
            }
            else {
                handleShrink();
            }
            // 每当鼠标滚轮滑动时，将重置 imgXRef 元素的位置。
            imgXRef.value.style.cssText = `transform: translate3D(0px, 0px, 0px);`;
        }
        // 缩小
        function handleShrink() {
            const { scaleX, scaleY, rotate } = getTransformProperties(imgRef.value);
            let x = scaleX * 0.8;
            let y = scaleY * 0.8;
            if (Math.abs(x) < 1)
                x = Math.sign(x);
            if (Math.abs(y) < 1)
                y = Math.sign(y);
            imgRef.value.style.cssText = `transform: scale(${x}, ${y}) rotate(${rotate}deg);`;
        }
        // 放大
        function handleEnlarge() {
            const { scaleX, scaleY, rotate } = getTransformProperties(imgRef.value);
            imgRef.value.style.cssText = `transform: scale(${scaleX * 1.25}, ${scaleY * 1.25}) rotate(${rotate}deg);`;
        }
        function handleChangeIndicator(index) {
            indicator.value = index;
            emit("update:index", index);
            imgRef.value.style.cssText = "";
            imgXRef.value.style.cssText = "";
        }
        // 上一张
        function handlePrevItem() {
            if (indicator.value <= 0)
                return;
            handleChangeIndicator(indicator.value - 1);
        }
        // 下一张
        function handleNextItem() {
            if (indicator.value >= props.imgs.length - 1)
                return;
            handleChangeIndicator(indicator.value + 1);
        }
        // 关闭 PreviewImage 组件
        function handleClosePreview(event) {
            if (event.target === event.currentTarget) {
                emit("close");
                setTimeout(() => {
                    if (imgRef.value)
                        imgRef.value.style.cssText = "";
                    if (imgXRef.value)
                        imgXRef.value.style.cssText = "";
                }, 300);
            }
        }
        return (_ctx, _cache) => {
            return (openBlock(), createBlock(Transition, {
                name: "previewImage",
                persisted: ""
            }, {
                default: withCtx(() => [
                    withDirectives(createElementVNode("section", _hoisted_1, [
                        createCommentVNode(" 图片预览部分 "),
                        createElementVNode("div", {
                            ref_key: "imgXRef",
                            ref: imgXRef,
                            class: "qm-vnit-preview-image-x",
                            onMousewheel: _cache[0] || (_cache[0] =
                                //@ts-ignore
                                (...args) => (unref(onMouseWheel) && unref(onMouseWheel)(...args))),
                            onMousemove: _cache[1] || (_cache[1] =
                                //@ts-ignore
                                (...args) => (unref(onMouseMove) && unref(onMouseMove)(...args))),
                            onClick: handleClosePreview
                        }, [
                            createElementVNode("img", {
                                ref_key: "imgRef",
                                ref: imgRef,
                                src: _ctx.imgs[indicator.value],
                                onDragstart: withModifiers(handleDragStart, ["stop"]),
                                onMouseup: withModifiers(handleMouseUp, ["stop"])
                            }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_2)
                        ], 544 /* HYDRATE_EVENTS, NEED_PATCH */),
                        createCommentVNode(" 顶部工具栏 "),
                        createVNode(script$1, {
                            imageElement: imgRef.value,
                            onClose: handleClosePreview
                        }, null, 8 /* PROPS */, ["imageElement"]),
                        createElementVNode("div", {
                            class: normalizeClass([
                                'qm-vnit-preview-image-prev-buttton',
                                { disabled: indicator.value <= 0 },
                            ]),
                            onClick: handlePrevItem
                        }, [
                            createVNode(unref(script$2), {
                                name: "arrow-left-bold",
                                style: { "font-size": "60px" }
                            })
                        ], 2 /* CLASS */),
                        createElementVNode("div", {
                            class: normalizeClass([
                                'qm-vnit-preview-image-next-buttton',
                                { disabled: indicator.value >= _ctx.imgs.length - 1 },
                            ]),
                            onClick: handleNextItem
                        }, [
                            createVNode(unref(script$2), {
                                name: "arrow-right-bold",
                                style: { "font-size": "60px" }
                            })
                        ], 2 /* CLASS */),
                        createCommentVNode(" 顶部滑块 "),
                        createVNode(script$3, {
                            open: _ctx.open,
                            imgs: _ctx.imgs,
                            pageSize: _ctx.pageSize,
                            indicator: indicator.value,
                            "onUpdate:indicator": handleChangeIndicator
                        }, null, 8 /* PROPS */, ["open", "imgs", "pageSize", "indicator"])
                    ], 512 /* NEED_PATCH */), [
                        [vShow, _ctx.open]
                    ])
                ]),
                _: 1 /* STABLE */
            }));
        };
    }
});

export { script as default };
