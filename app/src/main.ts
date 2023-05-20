import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/style/theme.scss";
import ElementPlus from "element-plus";
import "normalize.css";
import { createPinia } from "pinia";
import { router } from "./routes";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useDeviceStore } from "./stores";
import {
  WATCH_DEVICE_STATUS_IPC,
  type DeivceStatusEnum,
  WATCH_SYNC_DEVICE_LIST_IPC,
  type DeviceInfo,
  WATCH_DEVICE_DATA_IPC,
  type DeviceRFlyI160CheckData,
} from "@my/common";
import { watchMainEvent } from "./utils/ipc";
const app = createApp(App).use(ElementPlus).use(createPinia()).use(router);
app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
dayjs.extend(duration);
const deviceStore = useDeviceStore();
deviceStore.fetchGetDeviceList();
watchMainEvent(
  WATCH_DEVICE_STATUS_IPC,
  (deviceId: string, status: DeivceStatusEnum) => {
    deviceStore.deviceList.forEach((device) => {
      if (device.deviceId === deviceId) {
        device.deviceStatus = status;
      }
    });
  }
);
watchMainEvent(
  WATCH_SYNC_DEVICE_LIST_IPC,
  (deviceList: DeviceInfo[], ...args: any[]) => {
    console.log(deviceList, args);
    deviceStore.sycnDeviceList(deviceList);
  }
);
watchMainEvent(
  WATCH_DEVICE_DATA_IPC,
  (data: Record<string, DeviceRFlyI160CheckData[]>) => {
    deviceStore.setCurrentData(
      Object.keys(data).reduce<DeviceRFlyI160CheckData[]>((prev, deviceId) => {
        const arr = data[deviceId].map((item) => {
          item.deviceId = deviceId;
          return item;
        });
        prev.push(...arr);
        return prev;
      }, [])
    );
  }
);
