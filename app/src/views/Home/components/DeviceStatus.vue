<!-- 显示设备的状态 -->
<template>
  <span :class="className">{{ zh }}</span>
</template>
<script setup lang="ts">
import { DeivceStatusEnum } from "@my/common";
import { computed } from "vue";
const props = withDefaults(
  defineProps<{
    status?: DeivceStatusEnum;
  }>(),
  {
    status: DeivceStatusEnum.Unknown,
  }
);
const zh = computed(() => {
  switch (props.status) {
    case DeivceStatusEnum.Connected:
      return "已连接";
    case DeivceStatusEnum.Disconnected:
      return "未连接";
    case DeivceStatusEnum.Unknown:
      return "未知";
    case DeivceStatusEnum.Connecting:
      return "连接中";
    case DeivceStatusEnum.Error:
      return "发生错误";
    default:
      return "未知";
  }
});
const className = computed(() => {
  switch (props.status) {
    case DeivceStatusEnum.Connected:
      return "text-success";
    case DeivceStatusEnum.Disconnected:
      return "text-default";
    case DeivceStatusEnum.Unknown:
      return "text-warning";
    case DeivceStatusEnum.Connecting:
      return "text-primary";
    case DeivceStatusEnum.Error:
      return "text-danger";
    default:
      return "text-warning";
  }
});
</script>
