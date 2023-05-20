<template>
  <div
    class="flex-middle full"
    v-if="deviceStore.connectedDeviceList.length === 0"
  >
    <ElResult icon="warning">
      <template #title> 没有设备连接 </template>
    </ElResult>
  </div>
  <div v-else class="check full">
    <div class="check-content">
      <el-table
        :data="tableData"
        row-key="value"
        style="width: 100%; height: 100%"
      >
        <el-table-column prop="value" label="标签值" width="280" />
        <el-table-column prop="total" sortable label="读取次数" width="120" />
        <el-table-column prop="lastReadTime" sortable label="最后读取事件" />
      </el-table>
    </div>
    <div class="check-control border-left">
      <div class="title">数据信息</div>
      <ElDescriptions :column="2">
        <ElDescriptionsItem label="标签数">
          <div class="description-item">{{ tableData.length }}</div>
        </ElDescriptionsItem>
        <ElDescriptionsItem label="盘点耗时">
          <div class="description-item">{{ currentTime }}</div>
        </ElDescriptionsItem>
      </ElDescriptions>
      <div class="title">盘点</div>
      <div class="control-item">
        <ElButton type="primary" class="control-btn" @click="handleStartCheck"
          >开始盘点</ElButton
        >
      </div>
      <div class="control-item">
        <ElButton class="control-btn" @click="handleStopCheck"
          >停止盘点</ElButton
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDeviceStore } from "@/stores";
import { myIpcSend } from "@/utils/ipc";
import {
  CALL_DEVICE_MANAGE_METHOD_IPC,
  type DeviceInfo,
  type DeviceRFlyI160CheckData,
} from "@my/common";
import { computed, ref, watch } from "vue";
import dayjs from "dayjs";
const deviceStore = useDeviceStore();
type TableData = {
  value: string;
  lastReadTime: string;
  total: number;
  readDevice: (DeviceInfo & DeviceRFlyI160CheckData)[];
};
const tableData = ref<TableData[]>([]);
watch(
  () => deviceStore.currentData,
  (newVal) => {
    tableData.value = newVal.reduce<TableData[]>((prve, next) => {
      // 检查这个标签是否已经存在
      const find = prve.find((item) => item.value === next.value);
      const currentDevice = deviceStore.findDevice(next.deviceId!);
      if (!find) {
        prve.push({
          value: next.value,
          lastReadTime: dayjs(next.lastReadTime).format("YYYY-MM-DD HH:mm:ss"),
          total: next.readCount,
          readDevice: [
            {
              ...currentDevice!,
              ...next,
            },
          ],
        });
      } else {
        find.total += next.readCount;
        find.readDevice.push({
          ...currentDevice!,
          ...next,
        });
      }
      return prve;
    }, []);
  },
  {
    immediate: true,
  }
);
const startDate = ref(new Date().getTime());
const nowDate = ref(new Date().getTime());
let timer = 0;
async function handleStartCheck() {
  console.log("开始盘点");
  await myIpcSend(
    CALL_DEVICE_MANAGE_METHOD_IPC,
    "callAllDeviceApi",
    "startCheck"
  );
  startDate.value = new Date().getTime();
  nowDate.value = new Date().getTime();
  setInterval(() => {
    nowDate.value = new Date().getTime();
  }, 300);
}
function f(n: number) {
  return n >= 10 ? n : "0" + n;
}
const currentTime = computed(() => {
  const duration = dayjs.duration(nowDate.value - startDate.value);
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return `${f(hours)}:${f(minutes)}:${f(seconds)}`;
});
async function handleStopCheck() {
  clearInterval(timer);
  nowDate.value = new Date().getTime();
  console.log("停止盘点");
  await myIpcSend(
    CALL_DEVICE_MANAGE_METHOD_IPC,
    "callAllDeviceApi",
    "stopCheck"
  );
}
</script>

<style lang="scss" scoped>
.check {
  display: flex;
  height: 100%;
  width: 100%;
  flex-wrap: nowrap;
}
.check-content {
  flex-grow: 1;
  min-width: 400px;
  height: 100%;
}
.check-control {
  width: 300px;
  height: 100%;
  flex-shrink: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  .control-btn {
    width: 275px;
  }
  .control-item {
    margin-bottom: 12px;
  }
  .description-item {
    width: 60px;
    display: inline-block;
    text-align: center;
  }
  .title {
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
    padding-bottom: 12px;
  }
}
</style>
