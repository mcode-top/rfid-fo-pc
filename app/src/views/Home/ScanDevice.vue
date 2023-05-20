<template>
  <el-row :gutter="12">
    <el-col :span="8" v-for="item in filterScanDevice" :key="item.mac">
      <div
        class="scan-device-item"
        :class="{
          active: deviceStore?.currentControlInfo?.data?.deviceId === item.mac,
        }"
      >
        <div class="scan-device-item-content">
          <div class="scan-device-item-title">
            MAC:{{ formatMacToZh(item.mac) }}
          </div>
          <div class="scan-device-item-title">IP:{{ item.readerIp }}</div>
          <el-button class="scan-device-item-btn" @click="handleEdit(item)">
            编辑
          </el-button>
        </div>
      </div>
    </el-col>
  </el-row>
  <div>
    <ElResult>
      <template #icon>
        <SvgIcon :size="60" type="wifi" color="#10aeff" />
      </template>
      <template #title>
        <p v-if="scanList === null">点击下方扫描按钮发现局域网中的设备</p>
        <p v-else-if="scanList.length === 0">未发现局域网中的设备,请重试</p>
        <p v-else>点击编辑将设备录入系统</p>
      </template>
      <template #extra>
        <el-button
          style="width: 200px; height: 35px"
          type="primary"
          :loading="scanBtnLoading"
          @click="scanDevice"
          >扫描</el-button
        >
      </template>
    </ElResult>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import { DEVICE_SCAN_IPC, type ScanDeviceRFlyI160UDPData } from "@my/common";
import { formatMacToZh } from "@/utils";
import { computed, onMounted, ref } from "vue";
import { myIpcSend } from "@/utils/ipc";
import { useDeviceStore } from "@/stores";
const scanList = ref<ScanDeviceRFlyI160UDPData[] | null>(null);
const scanBtnLoading = ref(false);
const deviceStore = useDeviceStore();
const scanDevice = async () => {
  scanBtnLoading.value = true;
  myIpcSend<ScanDeviceRFlyI160UDPData[]>(DEVICE_SCAN_IPC)
    .then((res) => {
      scanList.value = res;
    })
    .finally(() => {
      scanBtnLoading.value = false;
    });
};
const filterScanDevice = computed(() => {
  return scanList.value?.filter((item) => {
    return !deviceStore.deviceList.some(
      (device) => device.deviceId === item.mac
    );
  });
});
function handleEdit(item: ScanDeviceRFlyI160UDPData) {
  deviceStore.setControl("add", {
    deviceId: item.mac,
    deviceName: "",
    ip: item.readerIp,
    mask: item.readerMask,
    deviceType: "RFlyI160",
    port: item.readerPort,
    getway: item.readerGeteway,
  });
  console.log("handleEdit");
}
</script>
<style lang="scss" scoped>
.active {
  border: 1px solid $color-success !important;
}

.scan-device-item {
  width: 100%;
  background-color: white;
  margin-bottom: 12px;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
  border: 1px solid transparent;

  &:hover {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .scan-device-item-content {
    padding-top: 10px;
    font-size: 14px;
    text-align: center;
  }

  .scan-device-item-img {
    object-fit: contain;
    width: 100%;
    height: 150px;
  }

  .scan-device-item-title {
    font-size: 14px;
    color: $color-text;
    margin-bottom: 10px;
  }

  .scan-device-item-btn {
    width: 150px;
    height: 30px;
    margin-bottom: 10px;
  }
}
</style>
