import {
  DeivceStatusEnum,
  DeviceInfo,
  WATCH_DEVICE_STATUS_IPC,
  WATCH_SYNC_DEVICE_LIST_IPC,
} from "@my/common";
import { omit } from "lodash";
import { EventEmitter } from "stream";
import { appStore } from "~/utils";
import { DeviceRFlyI160 } from "./RFly-I160";

export type DeviceInstance = DeviceInfo & {
  instance: DeviceRFlyI160;
};

class DeviceManage extends EventEmitter {
  deviceList: DeviceInstance[] = [];
  constructor() {
    super();
    const defaultDeviceList = appStore.getItem("deviceList") || [];
    this.deviceList = defaultDeviceList.map(this.initDevice.bind(this));
    this.emit(WATCH_SYNC_DEVICE_LIST_IPC, defaultDeviceList);
  }
  initDevice(device: DeviceInfo) {
    const rfly = new DeviceRFlyI160({
      host: device.ip,
      port: device.port,
    });
    rfly.event.on("status", (status: DeivceStatusEnum) => {
      this.emit(WATCH_DEVICE_STATUS_IPC, device.deviceId, status);
    });

    return {
      ...device,
      instance: rfly,
    };
  }
  /**@name 添加设备 */
  addDevice(device: DeviceInfo) {
    this.deviceList.push(this.initDevice(device));
    this.syncDeviceListStore();
  }
  /**@name 删除设备 */
  removeDevice(deviceId: string) {
    const index = this.deviceList.findIndex(
      (device) => device.deviceId === deviceId
    );
    if (index !== -1) {
      this.deviceList.splice(index, 1);
    }
    this.syncDeviceListStore();
  }
  /**@name 编辑设备 */
  editDevice(info: DeviceInfo) {
    const index = this.deviceList.findIndex(
      (device) => info.deviceId === device.deviceId
    );
    if (index !== -1) {
      this.deviceList.splice(index, 1, this.initDevice(info));
    }
    this.syncDeviceListStore();
  }
  /**@name 查找设备 */
  findDevice(deviceId: string) {
    return this.deviceList.find((device) => device.deviceId === deviceId);
  }
  /**@name 同步设备列表到本地存储 */
  syncDeviceListStore() {
    const raw = this.getDeviceList();
    appStore.setItem("deviceList", raw);
    this.emit(WATCH_SYNC_DEVICE_LIST_IPC, raw);
    return raw;
  }
  getDeviceList() {
    return this.deviceList.map((device) => {
      return {
        ...omit(device, "instance"),
        deviceStatus: device.instance.status,
      };
    });
  }
}
export const deviceManage = new DeviceManage();

/**@name 调用设备的API */
export function callDeviceApi(
  deviceId: string,
  apiName: string,
  ...args: any[]
) {
  const device = deviceManage.findDevice(deviceId);
  if (!device) {
    return Promise.reject("设备不存在");
  }
  if (typeof device.instance[apiName] === "function") {
    return (device.instance[apiName] as any)(...args);
  }
}
