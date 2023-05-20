import {
  CALL_DEVICE_MANAGE_METHOD_IPC,
  CALL_DEVICE_METHOD_IPC,
  DeivceStatusEnum,
  DeviceInfo,
  DEVICE_SCAN_IPC,
  DEVICE_SETTING_BASE_IPC,
  ScanDeviceRFlyI160UDPData,
  WATCH_DEVICE_STATUS_IPC,
  WATCH_SYNC_DEVICE_LIST_IPC,
} from "@my/common";
import { ipcMain } from "electron";
import { callDeviceApi, deviceManage } from "~/device";
import { scanRFlyI160, settingBaseRFlyI160 } from "~/device/RFly-I160/helper";
import { myIpcListener, openMainEventIpc } from "~/utils";

myIpcListener(DEVICE_SCAN_IPC, async () => {
  return await scanRFlyI160();
});
myIpcListener(
  DEVICE_SETTING_BASE_IPC,
  async (data: ScanDeviceRFlyI160UDPData) => {
    return await settingBaseRFlyI160(data);
  }
);
myIpcListener(
  CALL_DEVICE_METHOD_IPC,
  (deviceId: string, apiName: string, ...args) => {
    return callDeviceApi(deviceId, apiName, ...args);
  }
);
myIpcListener(CALL_DEVICE_MANAGE_METHOD_IPC, (apiName: string, ...args) => {
  return deviceManage[apiName](...args);
});

openMainEventIpc(WATCH_DEVICE_STATUS_IPC, (send) => {
  deviceManage.addListener(
    WATCH_DEVICE_STATUS_IPC,
    (deviceId: string, status: DeivceStatusEnum) => {
      send(deviceId, status);
    }
  );
});
openMainEventIpc(WATCH_SYNC_DEVICE_LIST_IPC, (send) => {
  deviceManage.addListener(
    WATCH_SYNC_DEVICE_LIST_IPC,
    (deviceList: DeviceInfo[]) => {
      send(deviceList);
    }
  );
});
