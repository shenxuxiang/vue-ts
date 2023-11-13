import { defineComponent, ref, watch, openBlock, createBlock, unref, withCtx, renderSlot, createVNode, createTextVNode } from 'vue';
import { Upload, Button, message } from 'ant-design-vue';
import { UploadOutlined } from '@ant-design/icons-vue';

var script = /*#__PURE__*/ defineComponent({
    ...{ name: 'UploadFile' },
    __name: 'UploadFile',
    props: {
        action: { type: String, required: true },
        accept: { type: String, required: false, default: "*" },
        maxSize: { type: Number, required: false },
        maxCount: { type: Number, required: false },
        multiple: { type: Boolean, required: false, default: true },
        disabled: { type: Boolean, required: false },
        headers: { type: Object, required: false },
        fileList: { type: null, required: false },
        listType: { type: String, required: false, default: "text" }
    },
    emits: ["update:fileList"],
    setup(__props, { emit }) {
        const props = __props;
        // 当前文件数量，在限制文件上传数量时会被使用
        let fileCount = props.fileList?.length ?? 0;
        const _fileList = ref([]);
        watch([() => props.fileList], () => {
            if (typeof props.fileList === "undefined" ||
                props.fileList === _fileList.value)
                return;
            _fileList.value = props.fileList;
            // 更新文件数量
            fileCount = props.fileList.length;
        });
        function handleFileChange(field) {
            const { maxSize, maxCount } = props;
            let newFileList = field.fileList;
            if (maxSize)
                newFileList = field.fileList.filter((file) => file.size <= maxSize);
            if (maxCount)
                newFileList = newFileList.slice(0, maxCount);
            _fileList.value = newFileList;
            // 更新文件数量
            fileCount = newFileList.length;
            emit("update:fileList", newFileList);
        }
        function beforeUpload(file) {
            const { size } = file;
            const { maxSize, maxCount } = props;
            if (maxSize && size > maxSize) {
                message.warning("文件过大，无法上传！");
                return false;
            }
            if (maxCount && fileCount + 1 > maxCount)
                return false;
            fileCount++;
            return true;
        }
        return (_ctx, _cache) => {
            return (openBlock(), createBlock(unref(Upload), {
                accept: _ctx.accept,
                action: _ctx.action,
                headers: _ctx.headers,
                multiple: _ctx.multiple,
                disabled: _ctx.disabled,
                listType: _ctx.listType,
                "file-list": _fileList.value,
                beforeUpload: beforeUpload,
                onChange: handleFileChange
            }, {
                default: withCtx(() => [
                    renderSlot(_ctx.$slots, "default", {}, () => [
                        createVNode(unref(Button), { disabled: _ctx.disabled }, {
                            default: withCtx(() => [
                                createTextVNode(" 上传文件"),
                                createVNode(unref(UploadOutlined))
                            ]),
                            _: 1 /* STABLE */
                        }, 8 /* PROPS */, ["disabled"])
                    ])
                ]),
                _: 3 /* FORWARDED */
            }, 8 /* PROPS */, ["accept", "action", "headers", "multiple", "disabled", "listType", "file-list"]));
        };
    }
});

export { script as default };
