import {
  createUniqueIdInstance,
  type IpcSendOptions,
  type IpcSendResult,
} from "@my/common";
import { ipcRenderer } from "electron";
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
