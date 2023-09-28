<script setup lang="ts">
  import intersectionObserveImage from "@/utils/intersectionObserveImage";
  import defaultImgURL from "./default.svg";
  import { ref, onMounted } from "vue";

  export type ImageProps = { src: string };

  const props = defineProps<ImageProps>();

  const imgSrc = ref(defaultImgURL);
  const imgRef = ref<Element>();

  onMounted(() => {
    intersectionObserveImage.addElement(imgRef.value!, props.src);
  });
</script>

<template>
  <img :src="imgSrc" ref="imgRef" />
</template>

