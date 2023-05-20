import {
  STORE_APP_DATA_GET_ITEM_IPC,
  STORE_APP_DATA_SET_ITEM_IPC,
  STORE_APP_DATA_REMOVE_ITEM_IPC,
  STORE_APP_DATA_CLEAR_IPC,
  STORE_APP_DATA_GET_ALL_IPC,
} from "@my/common";
import { appStore, myIpcListener } from "~/utils";

myIpcListener(STORE_APP_DATA_GET_ITEM_IPC, async (key: string) => {
  return appStore.getItem(key);
});
myIpcListener(STORE_APP_DATA_SET_ITEM_IPC, async (key: string, value: any) => {
  return appStore.setItem(key, value);
});
myIpcListener(STORE_APP_DATA_REMOVE_ITEM_IPC, async (key: string) => {
  return appStore.removeItem(key);
});
myIpcListener(STORE_APP_DATA_CLEAR_IPC, async () => {
  return appStore.clear();
});
myIpcListener(STORE_APP_DATA_GET_ALL_IPC, async () => {
  return appStore.getAll();
});
