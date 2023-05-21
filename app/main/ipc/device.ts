import {
  CALL_DEVICE_MANAGE_METHOD_IPC,
  DeivceStatusEnum,
  DeviceInfo,
  DEVICE_SCAN_IPC,
  DEVICE_SETTING_BASE_IPC,
  ScanDeviceRFlyI160UDPData,
  WATCH_DEVICE_DATA_IPC,
  WATCH_DEVICE_STATUS_IPC,
  WATCH_SYNC_DEVICE_LIST_IPC,
} from "@my/common";
import { ipcMain } from "electron";
import { throttle } from "lodash";
import { deviceManage } from "~/device";
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
  CALL_DEVICE_MANAGE_METHOD_IPC,
  async (apiName: string, ...args) => {
    //   console.log(apiName, args,"apiName, args"");
    return await deviceManage[apiName](...args);
  }
);

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
openMainEventIpc(WATCH_DEVICE_DATA_IPC, (send) => {
  deviceManage.addListener(
    WATCH_DEVICE_DATA_IPC,
    // 由于数据量过大且很快，所以需要节流
    throttle(
      (data: any) => {
        send(data);
      },
      300,
      {
        leading: true,
        trailing: true,
      }
    )
  );
});
