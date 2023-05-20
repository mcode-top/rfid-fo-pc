import {
  DeivceStatusEnum,
  DeviceInfo,
  DeviceRFlyI160CheckData,
  WATCH_DEVICE_DATA_IPC,
  WATCH_DEVICE_STATUS_IPC,
  WATCH_SYNC_DEVICE_LIST_IPC,
} from "@my/common";
import { clone, omit } from "lodash";
import { EventEmitter } from "stream";
import { appStore } from "~/utils";
import { DeviceRFlyI160 } from "./RFly-I160";

export type DeviceInstance = DeviceInfo & {
  instance: DeviceRFlyI160;
};

class DeviceManage extends EventEmitter {
  deviceList: DeviceInstance[] = [];
  deviceData: Record<string, DeviceRFlyI160CheckData[]> = {};
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
    rfly.event.on("data-end", () => {
      this.emit(WATCH_DEVICE_DATA_IPC, clone(this.deviceData));
      this.deviceData[device.deviceId] = [];
    });
    this.deviceData[device.deviceId] = [];
    // 业务代码...
    rfly.event.on("data", (data: DeviceRFlyI160CheckData) => {
      const findIndex = this.deviceData[device.deviceId].findIndex(
        (d) => d.value === data.value
      );
      if (findIndex === -1) {
        this.deviceData[device.deviceId].push(data);
      } else {
        this.deviceData[device.deviceId][findIndex] = {
          ...data,
          readCount: this.deviceData[device.deviceId][findIndex].readCount + 1,
        };
      }
      this.emit(WATCH_DEVICE_DATA_IPC, clone(this.deviceData));
    });
    // TODO:默认自动连接
    rfly.connect();
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
  /**@name 调用设备的API */
  callDeviceApi(
    deviceId: string | DeviceInfo,
    apiName: string,
    ...args: any[]
  ) {
    let device = null;
    if (typeof deviceId === "string") {
      device = this.findDevice(deviceId);
    } else {
      device = deviceId;
    }
    if (!device) {
      return Promise.reject("设备不存在");
    }
    if (typeof device.instance[apiName] === "function") {
      return (device.instance[apiName] as any)(...args);
    }
  }
  /**@name 广播调用所有设备的API */
  callAllDeviceApi(apiName: string, ...args: any[]) {
    return Promise.all(
      this.deviceList.map((device) => {
        return this.callDeviceApi(device.deviceId, apiName, ...args);
      })
    );
  }
}
export const deviceManage = new DeviceManage();
