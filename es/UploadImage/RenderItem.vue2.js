import { defineComponent, ref, onMounted, onUnmounted, openBlock, createElementBlock, normalizeClass, createCommentVNode, createElementVNode, normalizeStyle, createVNode, unref, toDisplayString, Fragment, renderSlot, createBlock } from 'vue';
import { PictureOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons-vue';
import Upload from './upload.js';

const _hoisted_1 = {
    key: 0,
    class: "qm-vnit-upload-image-item-error"
};
const _hoisted_2 = { class: "qm-vnit-upload-image-item-preview" };
const _hoisted_3 = ["src"];
const _hoisted_4 = { class: "qm-vnit-upload-image-item-mask" };
const _hoisted_5 = /*#__PURE__*/ createElementVNode("div", { class: "qm-vnit-upload-image-item-tips" }, "上传失败", -1 /* HOISTED */);
var script = /*#__PURE__*/ defineComponent({
    __name: 'RenderItem',
    props: {
        uid: { type: String, required: true },
        url: { type: String, required: false },
        name: { type: String, required: true },
        action: { type: String, required: true },
        response: { type: null, required: false },
        method: { type: String, required: false, default: 'POST' },
        rowSource: { type: null, required: false },
        percent: { type: Number, required: false, default: 100 },
        headers: { type: Function, required: false },
        status: { type: String, required: false, default: 'done' }
    },
    emits: ["remove", "preview", "error", "success"],
    setup(__props, { emit }) {
        const props = __props;
        const easeIn = (t, b, c, d) => (t === 0 ? b : c * 2 ** (10 * (t / d - 1)) + b);
        const imgURL = ref('');
        const itemRef = ref();
        const cvsRef = ref();
        const ctxRef = ref();
        const uploadInstance = ref();
        // canvas 初始化
        onMounted(() => {
            // 在元素刚刚挂载到 DOM 节点时，添加一个渐入式的动画。
            itemRef.value?.classList.add('enter-from');
            requestAnimationFrame(() => itemRef.value?.classList.remove('enter-from'));
            if (props.url) {
                imgURL.value = props.url;
            }
            else if (props.rowSource) {
                // 预先添加了一个图片预加载的功能，在网络不太流畅时可以让图片尽早的展示出来。
                const reader = new FileReader();
                reader.readAsDataURL(props.rowSource);
                reader.onload = () => {
                    imgURL.value = reader.result;
                };
            }
            if (!props.url && props.status === 'loading') {
                initialCanvas();
                uploadFile();
            }
        });
        onUnmounted(() => {
            // 销毁画布
            ctxRef.value = null;
            // 取消请求
            if (uploadInstance.value)
                uploadInstance.value.abort();
        });
        // 开始上传图片
        function uploadFile() {
            if (props.uid && props.status === 'loading' && props.rowSource) {
                const formData = new FormData();
                formData.append('file', props.rowSource);
                const upload = new Upload({ headers: props.headers });
                let isUploadStart = true;
                // 更新上传进度
                upload.onProgress(function (progress) {
                    // 如果一开始上传的时候，progress 就大于等于 1，说明网速足够快上传图片瞬间就完成了，
                    // 此时，我们使用动画完成进度条，否则就是每次 onProgress 事件触发 updateProgressBar
                    if (isUploadStart && progress >= 1) {
                        progressBarAnimation();
                    }
                    else {
                        updateProgressBar(progress);
                    }
                    isUploadStart = false;
                });
                // 上传成功
                upload.onSuccess(async function (res) {
                    fadeInAnimation();
                    emit('success', props.uid, res);
                    uploadInstance.value = null;
                });
                // 上传失败
                upload.onError(function (err) {
                    emit('error', props.uid, err);
                    uploadInstance.value = null;
                });
                // 将 xhr 实例对象赋值给 uploadInstance，在组件卸载时如果请求还没有完成将会取消请求。
                uploadInstance.value = upload.create(props.action, props.method, formData);
            }
        }
        // canvas 画布初始化
        function initialCanvas() {
            cvsRef.value.width = 84;
            cvsRef.value.height = 84;
            const ctx = ctxRef.value = cvsRef.value?.getContext('2d');
            ctx.save();
            ctx.translate(42, 42);
        }
        // 进度条自动更新动画
        function progressBarAnimation(callback) {
            let count = 1;
            (function loop() {
                if (count >= 100)
                    return callback?.();
                count += 3;
                count = Math.ceil(easeIn(count, count, 100 - count, 100));
                updateProgressBar(count / 100);
                requestAnimationFrame(loop);
            })();
        }
        // 更新进度条
        function updateProgressBar(progress) {
            if (!ctxRef.value)
                return;
            const ctx = ctxRef.value;
            ctx.clearRect(-42, -42, 84, 84);
            ctx.beginPath();
            ctx.fillStyle = '#fff';
            ctx.fillRect(-42, -42, 84, 84);
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.arc(0, 0, 32, -0.5 * Math.PI, Math.PI * 1.5, false);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle = '#1677ff';
            ctx.arc(0, 0, 32, -0.5 * Math.PI, Math.PI * 2 * progress - 0.5 * Math.PI, false);
            ctx.stroke();
            ctx.beginPath();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'normal normal normal 14px arial';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillText((progress * 100).toFixed(0) + '%', 0, 0);
        }
        // 图片展示（渐入动画）
        function fadeInAnimation() {
            if (cvsRef.value) {
                cvsRef.value.style.display = 'none';
                // @ts-ignore
                cvsRef.value.parentNode.classList.toggle('fade-in');
                setTimeout(() => {
                    if (cvsRef.value?.parentNode) {
                        // @ts-ignore
                        cvsRef.value.parentNode.style.display = 'none';
                    }
                }, 300);
            }
        }
        function handleRemove(uid) {
            // 添加离开时的动画效果
            itemRef.value?.classList.add('leave-from');
            requestAnimationFrame(() => {
                itemRef.value?.classList.remove('leave-from');
                itemRef.value?.classList.add('leave-active');
            });
            setTimeout(() => emit('remove', uid), 300);
        }
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("li", {
                ref_key: "itemRef",
                ref: itemRef,
                class: normalizeClass(['qm-vnit-upload-image-item', { error: _ctx.status === 'error' }])
            }, [
                createCommentVNode(" 进度条 "),
                createElementVNode("div", {
                    class: "qm-vnit-upload-image-item-progress",
                    style: normalizeStyle({ display: _ctx.status === 'error' ? 'none' : '' })
                }, [
                    createElementVNode("canvas", {
                        ref_key: "cvsRef",
                        ref: cvsRef,
                        style: { "width": "84px", "height": "84px" }
                    }, null, 512 /* NEED_PATCH */)
                ], 4 /* STYLE */),
                createCommentVNode(" 上传失败 "),
                (_ctx.status === 'error')
                    ? (openBlock(), createElementBlock("div", _hoisted_1, [
                        createVNode(unref(PictureOutlined), { style: { "font-size": "36px", "color": "#ff4d4f" } }),
                        createElementVNode("p", null, toDisplayString(_ctx.name), 1 /* TEXT */)
                    ]))
                    : (_ctx.status === 'done')
                        ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                            createCommentVNode(" 图片展示 "),
                            createElementVNode("div", _hoisted_2, [
                                renderSlot(_ctx.$slots, "itemRender", { src: imgURL.value }, () => [
                                    createElementVNode("img", {
                                        src: imgURL.value,
                                        class: "qm-vnit-upload-image-item-preview-content"
                                    }, null, 8 /* PROPS */, _hoisted_3)
                                ])
                            ])
                        ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
                        : createCommentVNode("v-if", true),
                createCommentVNode(" 可操作区域 "),
                createElementVNode("div", _hoisted_4, [
                    createCommentVNode(" 删除按钮 "),
                    createVNode(unref(DeleteOutlined), {
                        class: "qm-vnit-upload-image-item-remove-icon",
                        onClick: _cache[0] || (_cache[0] = ($event) => (handleRemove(_ctx.uid)))
                    }),
                    createCommentVNode(" 预览按钮 "),
                    (_ctx.status === 'done')
                        ? (openBlock(), createBlock(unref(EyeOutlined), {
                            key: 0,
                            class: "qm-vnit-upload-image-item-preview-icon",
                            onClick: _cache[1] || (_cache[1] = ($event) => (_ctx.$emit('preview', imgURL.value)))
                        }))
                        : createCommentVNode("v-if", true)
                ]),
                _hoisted_5
            ], 2 /* CLASS */));
        };
    }
});

export { script as default };
