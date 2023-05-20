<!-- 设备控制台 -->
<template>
  <AddDevice v-if="deviceStore.currentControlInfo.type === 'add'" />
  <EditDevice v-else-if="deviceStore.currentControlInfo.type === 'edit'" />
  <div class="flex-middle full" v-else>
    <ElResult>
      <template #title> 当前未选择设备 </template>
    </ElResult>
  </div>
</template>

<script setup lang="ts">
import AddDevice from "./Form/AddDevice.vue";
import EditDevice from "./Form/EditDevice.vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { useDeviceStore } from "@/stores";
import { QuestionFilled } from "@element-plus/icons-vue";
const deviceStore = useDeviceStore();
</script>

<style lang="scss">
.device-setting {
  overflow-y: auto;
}
</style>
