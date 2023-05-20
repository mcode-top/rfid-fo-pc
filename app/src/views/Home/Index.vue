<template>
  <div class="home">
    <div class="device-list default-scrollbar">
      <div class="device-list-title">
        <div>设备列表</div>
      </div>
      <ElEmpty
        v-if="deivceStore.deviceList.length === 0"
        description="当前未加入设备"
      />
      <ElRow :gutter="12" v-else>
        <ElCol
          :span="8"
          v-for="item in deivceStore.deviceList"
          :key="item.deviceId"
        >
          <div
            class="device-item"
            @click="handleSelectDevice(item)"
            :class="{
              active:
                deivceStore.currentControlInfo?.data?.deviceId ===
                item.deviceId,
            }"
          >
            <img src="@/assets/device/rfly-i160.png" class="device-item-img" />
            <div class="device-item-content">
              <div class="device-item-title">{{ item.deviceName }}</div>
              <div class="device-item-subtitle">{{ item.deviceType }}</div>
              <div class="device-item-status">
                <DeviceStatus :status="item.deviceStatus" />
              </div>
            </div>
          </div>
        </ElCol>
      </ElRow>
      <div class="device-list-title">
        <div>扫描设备</div>
      </div>
      <ScanDevice />
    </div>

    <div class="device-setting border-left">
      <DeviceControl />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDeviceStore } from "@/stores";
import ScanDevice from "./ScanDevice.vue";
import DeviceStatus from "./components/DeviceStatus.vue";
import DeviceControl from "./DeviceControl.vue";
import type { DeviceInfo } from "@my/common";
const deivceStore = useDeviceStore();
deivceStore.fetchGetDeviceList();
function handleSelectDevice(item: DeviceInfo) {
  deivceStore.setControl("edit", item);
}
</script>
<style lang="scss" scoped>
.active {
  border: 1px solid $color-primary !important;
}
.home {
  width: 100%;
  height: 100%;
  display: flex;

  // .icon {
  //     width: 100px;
  //     height: 100px;
  //     fill: #67c23a;
  // }
  .device-list {
    min-width: 0;
    flex-grow: 1;
    overflow-y: auto;
    height: 100%;
    padding: 12px;
  }

  .device-setting {
    width: 300px;
    background-color: white;
    flex-shrink: 0;
    padding: 12px;
  }

  .device-list-title {
    font-size: 22px;
    font-weight: bold;
    color: $color-text;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
  }

  .device-item {
    width: 100%;
    min-height: 250px;
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

    .device-item-img {
      object-fit: contain;
      width: 100%;
      height: 150px;
    }

    .device-item-content {
      padding-top: 10px;
      font-size: 14px;
      text-align: center;

      .device-item-title {
        font-size: 16px;
        font-weight: bold;
        color: $color-text;
      }

      .device-item-subtitle {
        color: $color-text;
      }

      & > div {
        line-height: 25px;
        color: $color-text;
      }
    }
  }
}
</style>
