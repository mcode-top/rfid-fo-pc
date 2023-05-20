import { createUniqueIdInstance, IpcSendResult } from "@my/common";
import { ipcMain } from "electron";

/**@name ipc监听器 */
export function myIpcListener(
  channel: string,
  listener: (...args: any[]) => any
) {
  ipcMain.on(`my:${channel}`, async (event, id, ...args) => {
    try {
      const data = await listener(...args);
      event.sender.send(`my:${channel}:${id}`, {
        result: true,
        data,
      });
    } catch (error) {
      event.sender.send(`my:${channel}:${id}`, {
        result: false,
        msg: error.toString(),
      });
    }
  });
}
/**@name 开启一个主线程事件IPC */
export function openMainEventIpc(
  channel,
  callback: (send: (...args) => void) => void
) {
  ipcMain.on(channel, async (event, ipcId) => {
    watchStatusMap.add({
      ipcId,
      sender: event.sender,
    });
  });
  const watchStatusMap = new Set<{
    ipcId: number;
    sender: Electron.WebContents;
  }>();
  function send(...args: any[]) {
    watchStatusMap.forEach((item) => {
      item.sender.send(`${channel}:${item.ipcId}`, ...args);
    });
  }
  callback(send);
}
