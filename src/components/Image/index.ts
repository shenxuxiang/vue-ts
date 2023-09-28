import Image from "./Image.vue";
import ImageGroup from './ImageGroup.vue';

const _default = Image as typeof Image & { ImageGroup: typeof ImageGroup };

_default.ImageGroup = ImageGroup;

export default _default;
export { ImageGroup };


