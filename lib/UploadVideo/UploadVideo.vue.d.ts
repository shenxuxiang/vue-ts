import './UploadVideo.less';
import type { FileList } from '@/lib/UploadImage';
export type { FileList } from '@/lib/UploadImage';
declare const _default: import("vue").DefineComponent<{
    multiple: {
        type: import("vue").PropType<boolean>;
    };
    fileList: {
        type: import("vue").PropType<FileList>;
    };
    action: {
        type: import("vue").PropType<string>;
        required: true;
    };
    maxSize: {
        type: import("vue").PropType<number>;
    };
    maxCount: {
        type: import("vue").PropType<number>;
    };
    headers: {
        type: import("vue").PropType<() => {
            [key: string]: any;
        }>;
    };
    method: {
        type: import("vue").PropType<string>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    error: (error: any) => void;
    "update:fileList": (fileList: FileList) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    multiple: {
        type: import("vue").PropType<boolean>;
    };
    fileList: {
        type: import("vue").PropType<FileList>;
    };
    action: {
        type: import("vue").PropType<string>;
        required: true;
    };
    maxSize: {
        type: import("vue").PropType<number>;
    };
    maxCount: {
        type: import("vue").PropType<number>;
    };
    headers: {
        type: import("vue").PropType<() => {
            [key: string]: any;
        }>;
    };
    method: {
        type: import("vue").PropType<string>;
    };
}>> & {
    onError?: ((error: any) => any) | undefined;
    "onUpdate:fileList"?: ((fileList: FileList) => any) | undefined;
}, {}, {}>;
export default _default;
