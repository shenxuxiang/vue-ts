import PreviewImage, { PreviewImageProps } from "./index.vue";
import SuperPreviewImage from "./SuperPreviewImage.vue";
import { DefineComponent } from 'vue';

const _default = PreviewImage as DefineComponent<PreviewImageProps> & { SuperPreviewImage: typeof SuperPreviewImage };

_default.SuperPreviewImage = SuperPreviewImage

export default _default;

export { SuperPreviewImage };
