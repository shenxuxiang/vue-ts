<script setup lang="ts">
import { ref, onMounted } from "vue";

const map = ref<any>();
const containerRef = ref<HTMLDivElement>();
const inputRef = ref<HTMLInputElement>();
const panelRef = ref<HTMLInputElement>();

onMounted(() => {
  map.value = new BMapGL.Map("container-bamp");
  map.value.enableScrollWheelZoom();
  map.value.enableResizeOnCenter();

  const city = new BMapGL.LocalCity();
  city.get((result: BMapGL.LocalCityResult) => {
    map.value.centerAndZoom(result.center, 12);
  });

  const autoComplete = new BMapGL.Autocomplete({
    location: map.value,
    input: inputRef.value,
  });

  autoComplete.onconfirm = handleConfirm;

  function handleConfirm(event: any) {
    const {
      province = "",
      city = "",
      district = "",
      street = "",
      business = "",
    } = event.item.value;
    const address = province + city + district + street + business;
    autoComplete.setInputValue(address);
    mapLocate(address);
    setTimeout(() => {
      autoComplete.hide();
      // @ts-ignore
      inputRef.value.blur();
    }, 0);
  }
});

function mapLocate(address: string) {
  const geocoder = new BMapGL.Geocoder();
  // @ts-ignore
  geocoder.getPoint(address, (result: BMapGL.Point) => {
    map.value.flyTo(result, 12);
    map.value.clearOverlays();
    const marker = new BMapGL.Marker(result);
    map.value.addOverlay(marker);
  });
}

function focus() {
  containerRef.value!.style.pointerEvents = "none";
}

function blur() {
  containerRef.value!.style.pointerEvents = "";
}
</script>

<template>
  <div
    id="container-bamp"
    ref="containerRef"
    style="width: 100%; height: 100%"
  />
  <input
    id="my-input"
    ref="inputRef"
    placeholder="请输入您要查询的地址"
    @focus.capture="focus"
    @blur.capture="blur"
  />
  <div ref="panelRef" class="panel" />
</template>
<style lang="less" scoped>
#my-input {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 300px;
  height: 32px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  appearance: none;

  box-sizing: border-box;
  z-index: 9999;
}
::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.3);
}
.panel {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 300px;
  max-height: 300px;
  overflow: auto;
  padding: 12px;
  border-radius: 6px;
  z-index: 9999;
}
</style>
