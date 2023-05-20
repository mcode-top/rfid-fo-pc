<!-- 
    使用@/assets/icon/下的svg文件
    Example: <SvgIcon type="wifi" color="#67c23a" /> ; 会读取@/assets/icon/wifi.svg文件
    但是不能跨文件夹 @See #https://cn.vitejs.dev/guide/features.html#dynamic-import
-->
<template>
  <component :is="svg" class="my-svg-icon" :style="svgStyle"></component>
</template>
<script setup lang="ts">
import { defineAsyncComponent, ref, watch, computed, shallowRef } from "vue";

const props = defineProps<{
  color?: string;
  /**@description `@/assets/icon/下的文件名` */
  type: string;
  className?: string;
  size?: number;
}>();

const svg = shallowRef(null);
watch(
  () => props.type,
  () => {
    svg.value = defineAsyncComponent(
      () => import(`@/assets/icon/${props.type}.svg`)
    );
  },
  {
    immediate: true,
  }
);
const svgStyle = computed(() => {
  return (
    (props.color ? `fill:${props.color};` : "") +
    (props.size ? `width: ${props.size}px; height: ${props.size}px;` : "")
  );
});
</script>
<style>
.my-svg-icon path {
  width: inherit;
  height: inherit;
  fill: inherit;
}
</style>
