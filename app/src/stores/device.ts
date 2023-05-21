import { defineStore } from "pinia";
import {
  CALL_DEVICE_MANAGE_METHOD_IPC,
  DeivceStatusEnum,
  WATCH_DEVICE_DATA_IPC,
  WATCH_DEVICE_STATUS_IPC,
  WATCH_SYNC_DEVICE_LIST_IPC,
  type DeviceInfo,
  type DeviceRFlyI160CheckData,
  type ScanDeviceRFlyI160UDPData,
} from "@my/common";
import { webAppStore } from "@/utils/store";
import { toRaw } from "vue";
import { callDeviceApi, myIpcSend, watchMainEvent } from "@/utils/ipc";
/**@name 控制台动作 */
type DeviceControlAction = "add" | "edit";
export const useDeviceStore = defineStore("device", {
  state: () => ({
    /**@name 设备列表 */
    deviceList: [] as DeviceInfo[],

    currentControlInfo: {
      type: undefined as DeviceControlAction | undefined,
      data: null as null | DeviceInfo,
    },
    currentData: [] as DeviceRFlyI160CheckData[],
  }),
  getters: {
    connectedDeviceList(store) {
      return store.deviceList.filter(
        (device) =>
          DeivceStatusEnum.Connected === device.deviceStatus ||
          DeivceStatusEnum.Run === device.deviceStatus
      );
    },
  },
  actions: {
    sycnDeviceList(deviceList: DeviceInfo[]) {
      this.deviceList = deviceList || [];
    },
    async fetchGetDeviceList() {
      this.deviceList = await myIpcSend(
        CALL_DEVICE_MANAGE_METHOD_IPC,
        "getDeviceList"
      );
    },
    /**@name 查找设备 */
    findDevice(deviceId: string) {
      return this.deviceList.find((device) => device.deviceId === deviceId);
    },
    /**@name 添加设备 */
    async addDevice(device: DeviceInfo) {
      await myIpcSend(CALL_DEVICE_MANAGE_METHOD_IPC, "addDevice", device);
    },
    /**@name 删除设备 */
    async removeDevice(deviceId: string) {
      await myIpcSend(CALL_DEVICE_MANAGE_METHOD_IPC, "removeDevice", deviceId);
    },
    /**@name 编辑设备 */
    async editDevice(info: DeviceInfo) {
      await myIpcSend(CALL_DEVICE_MANAGE_METHOD_IPC, "editDevice", info);
    },
    /**@name 连接设备 */
    async connectDevice(deviceId: string) {
      return await callDeviceApi(deviceId, "connect");
    },
    /**@name 断开设备 */
    async disconnectDevice(deviceId: string) {
      await callDeviceApi(deviceId, "close");
    },
    setControl(action: DeviceControlAction, data: DeviceInfo | null) {
      this.currentControlInfo.type = action;
      this.currentControlInfo.data = data;
    },
    setCurrentData(data: DeviceRFlyI160CheckData[]) {
      this.currentData = data;
    },
  },
});
