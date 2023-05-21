import {
  CALL_DEVICE_MANAGE_METHOD_IPC,
  createUniqueIdInstance,
  type IpcSendOptions,
  type IpcSendResult,
} from "@my/common";
import { ipcRenderer } from "electron";
import { ElMessage } from "element-plus";
const getPromiseIpc = createUniqueIdInstance();

/**@name ipc发送消息 */
export function myIpcSend<T = any>(
  options: string | IpcSendOptions,
  ...args: any[]
): Promise<T> {
  const channel = typeof options === "string" ? options : options.channel;
  return new Promise((resolve, reject) => {
    const channelId = getPromiseIpc();
    ipcRenderer.send(`my:${channel}`, channelId, ...args);
    ipcRenderer.once(
      `my:${channel}:${channelId}`,
      (event, response: IpcSendResult) => {
        if (response.result) {
          resolve(response.data);
        } else {
          ElMessage.error(response.msg);
          reject(new Error(response.msg));
        }
      }
    );
  });
}
const getWatchEventId = createUniqueIdInstance();

/**@name 监听主线程事件 */
export function watchMainEvent(channel: string, callback: Function) {
  const ipcId = getWatchEventId();
  console.log("====================================");
  console.log(ipcId);
  console.log("====================================");
  ipcRenderer.send(channel, ipcId);
  ipcRenderer.on(`${channel}:${ipcId}`, (event, ...args) => {
    callback(...args);
  });
}

/**@name 调用设备管理的方法 */
export async function callDeviceManageApi(apiName: string, ...args: any[]) {
  return await myIpcSend(CALL_DEVICE_MANAGE_METHOD_IPC, apiName, ...args);
}

/**@name 调用设备的方法 */
export function callDeviceApi(
  apiName: string,
  deviceId: string,
  ...args: any[]
) {
  return callDeviceManageApi("callDeviceApi", apiName, deviceId, ...args);
}
/**@name 广播调用所有设备的API */
export function callAllDeviceAPi(apiName: string, ...args: any[]) {
  return callDeviceManageApi("callAllDeviceApi", apiName, ...args);
}
