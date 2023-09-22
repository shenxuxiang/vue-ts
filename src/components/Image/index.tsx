import intersectionObserveImage from "@/utils/intersectionObserveImage";
import { defineComponent, ref, h, onMounted } from "vue";
import defaultImgURL from "./default.svg";

type ImageProps = {
  src: string;
};

type ImageEvents = {
  click?: (event?: any) => void;
};

export default defineComponent<ImageProps, ImageEvents>(
  (props, { emit, attrs }) => {
    const imgSrc = ref(defaultImgURL);
    const imgRef = ref<Element>();

    onMounted(() => {
      intersectionObserveImage.addElement(imgRef.value!, props.src);
    });

    function onClick(event: any) {
      emit("click", event);
    }

    function assignmentRef(ref: any) {
      imgRef.value = ref;
    }

    return () =>
      h("img", { ...attrs, src: imgSrc.value, ref: assignmentRef, onClick });
  },
  {
    inheritAttrs: false,
    props: ["src"],
    emits: ["click"],
  },
);
