import {
  STORE_APP_DATA_GET_ITEM_IPC,
  STORE_APP_DATA_SET_ITEM_IPC,
  STORE_APP_DATA_REMOVE_ITEM_IPC,
  STORE_APP_DATA_CLEAR_IPC,
  STORE_APP_DATA_GET_ALL_IPC,
} from "@my/common";
import { myIpcSend } from "./ipc";

/**@name 获取app仓库浏览器接口 */
export const webAppStore = {
  getItem(key: string) {
    return myIpcSend(STORE_APP_DATA_GET_ITEM_IPC, key);
  },
  setItem(key: string, value: any) {
    return myIpcSend(STORE_APP_DATA_SET_ITEM_IPC, key, value);
  },
  removeItem(key: string) {
    return myIpcSend(STORE_APP_DATA_REMOVE_ITEM_IPC, key);
  },
  clear() {
    return myIpcSend(STORE_APP_DATA_CLEAR_IPC);
  },
  getAll() {
    return myIpcSend(STORE_APP_DATA_GET_ALL_IPC);
  },
};
