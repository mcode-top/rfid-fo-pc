import net from "node:net";
import {
  tenToSixteen,
  RElyI160Code,
  RElyI160Status,
  DEVICE_SETTING_BASE_IPC,
  ScanDeviceRFlyI160UDPData,
  DeivceStatusEnum,
} from "@my/common";
import { myIpcListener } from "~/utils";
import { scanRFlyI160, settingBaseRFlyI160 } from "./helper";
import { EventEmitter } from "node:stream";
export interface DeviceRFlyI160Options {
  host: string;
  port: number;
}

/**@name RFlyI160设备 */
export class DeviceRFlyI160 {
  _client?: net.Socket;
  _status: DeivceStatusEnum = DeivceStatusEnum.Unknown;
  event: EventEmitter;
  constructor(private readonly options: DeviceRFlyI160Options) {
    this.event = new EventEmitter();
  }
  get client() {
    return this._client!;
  }
  set client(value) {
    this._client = value;
  }
  get status() {
    return this._status!;
  }
  set status(value) {
    this._status = value;
    this.event.emit("status", value);
  }
  connect() {
    return new Promise((resolve, reject) => {
      if (this?.client?.readyState === "open") {
        return reject(new Error("device is connected"));
      } else {
        this.client?.destroy?.();
        this.client = null;
      }
      this.status = DeivceStatusEnum.Connecting;
      // 建立 TCP 连接
      const client = net.createConnection({
        port: this.options.port,
        host: this.options.host,
      });
      client.addListener("ready", () => {
        console.log(
          "RFlyI160",
          `${this.options.host}:${this.options.port} Connected`
        );
        this.status = DeivceStatusEnum.Connected;
        resolve(true);
      });
      // 监听服务器发送的数据
      client.addListener("data", this.formatData.bind(this));
      // 监听连接断开
      client.addListener("close", () => {
        this.status = DeivceStatusEnum.Disconnected;
        console.log(
          "RFlyI160",
          `${this.options.host}:${this.options.port} Disconnected`
        );
      });
      client.addListener("error", (err) => {
        this.status = DeivceStatusEnum.Error;
        console.error(
          "RFlyI160",
          `${this.options.host}:${this.options.port} Error`,
          err
        );
      });
      client.addListener("timeout", () => {
        this.status = DeivceStatusEnum.Disconnected;
        console.log(
          "RFlyI160",
          `${this.options.host}:${this.options.port} Timeout`
        );
        reject(false);
      });
      this.client = client;
    });
  }
  /**@name 发送数据 */
  send(code: RElyI160Code, data: Uint8Array = new Uint8Array()) {
    if (data.length > 249) {
      throw new Error("data length must less than 249");
    }
    const writeData = Buffer.from([
      // 数据长度
      data.length,
      // 指令码
      code,
      // 传输数据
      ...data,
    ]);
    return this.client!.write(
      new Uint8Array([
        // 前两个字符是标识符
        0xaa,
        0x55,
        ...writeData,
        // 校验码
        this.calculateXOR(writeData),
        // 结束符
        0x0d,
      ])
    );
  }
  /**@name 格式化数据 */
  formatData(data: Uint8Array) {
    if (data instanceof Uint8Array) {
      const [tag1, tag2] = data.slice(0, 2);
      const [length] = data.slice(2, 3);
      const [code] = data.slice(3, 4);
      const [status] = data.slice(4, 5);
      const returnData = data.slice(5, 5 + length);
      const [xor, end] = data.slice(-2);
      if (
        xor === this.calculateXOR(data.slice(2, -2)) &&
        end === 0x0d &&
        tag1 === 0xbb &&
        tag2 === 0xdd
      ) {
        if (RElyI160Status.STATUS_SUCCESS_CODE === status) {
          console.log(
            "send success",
            "code:",
            tenToSixteen(code),
            "data:",
            unit8ArrayToHex(returnData)
          );
        } else {
          console.warn("send fail", "status code:", RElyI160Status[status]);
        }
        this.client.emit(
          "data:" + code,
          RElyI160Status.STATUS_SUCCESS_CODE === status
            ? undefined
            : RElyI160Status[status],
          returnData,
          code
        );
        this.client.emit(
          "data:all",
          RElyI160Status.STATUS_SUCCESS_CODE === status
            ? undefined
            : RElyI160Status[status],
          returnData,
          code
        );
      }
    }
    return data;
  }
  /**@name 发送数据 */
  dataListener(
    code: RElyI160Code | "all",
    handler: (err: undefined | string, data: Uint8Array, code: number) => void
  ) {
    this.client.addListener("data:" + code, handler);
    return () => {
      this.client.removeListener("data:" + code, handler);
    };
  }
  dataListenerOnce(
    code: RElyI160Code | "all",
    handler: (err: undefined | string, data: Uint8Array, code: number) => void
  ) {
    const result = this.dataListener(code, (...args) => {
      handler(...args);
      result();
    });
  }
  /**@name 计算校验码 */
  calculateXOR(data: Uint8Array): number {
    let result = 0;
    for (let i = 0; i < data.length; i++) {
      result ^= data[i];
    }
    return result;
  }
  /**@name 关闭连接 */
  close() {
    this.client.destroy();
  }
  /**@name 单次盘点 */
  singleCheck(timeout = 100) {
    return new Promise((resolve, reject) => {
      const sendData = new DataView(new ArrayBuffer(2));
      sendData.setInt16(0, timeout);

      this.send(RElyI160Code.SingleInventory, new Uint8Array(sendData.buffer));
      this.dataListenerOnce(RElyI160Code.SingleInventory, (err, data) => {
        if (err) {
          if (err === RElyI160Status[RElyI160Status.FAULT_NO_TAGS_FOUND]) {
            resolve([]);
          } else {
            reject(err);
          }
        } else {
          const result: DeviceRFlyI160CheckData[] = [];
          const [count] = data.slice(0, 1);
          const [RSSI] = data.slice(1, 2);
          const [ant] = data.slice(2, 3);
          const pc = data.slice(3, 5);
          const EPC = data.slice(5);
          result.push({
            RSSI,
            ant,
            value: unit8ArrayToHex(EPC),
            readCount: count,
            PC: unit8ArrayToHex(pc),
          });
          resolve(result);
        }
      });
    });
  }
  /**@name 时间段盘点 */
  timeCheck(timeout = 1000) {
    return new Promise((resolve, reject) => {
      const sendData = new DataView(new ArrayBuffer(2));
      sendData.setInt16(0, timeout);

      this.send(RElyI160Code.TimeInventory, new Uint8Array(sendData.buffer));
      this.dataListener(RElyI160Code.TimeInventory, (err, data) => {
        if (err) {
          if (err === RElyI160Status[RElyI160Status.FAULT_NO_TAGS_FOUND]) {
            resolve([]);
          } else {
            reject(err);
          }
        } else {
          const result: DeviceRFlyI160CheckData[] = [];
          const [tagCount] = data.slice(0, 1);
          let i = 0;
          while (i < tagCount) {
            const readNum = 17;
            const currentData = data.slice(i * readNum, readNum * (i + 1));
            const [count] = currentData.slice(0, 1);
            const [RSSI] = currentData.slice(1, 2);
            const [ant] = currentData.slice(2, 3);
            const pc = currentData.slice(3, 5);
            const EPC = currentData.slice(5);
            result.push({
              RSSI,
              ant,
              value: unit8ArrayToHex(EPC),
              readCount: count,
              PC: unit8ArrayToHex(pc),
            });
            i++;
          }
          console.log(result);

          resolve(result);
        }
      });
    });
  }
}
// uint8 to hex
function unit8ArrayToHex(unit8Array: Uint8Array) {
  return Array.from(unit8Array, (v) => v.toString(16).padStart(2, "0")).join(
    ""
  );
}
interface DeviceRFlyI160CheckData {
  /**@name 信号强度 */
  RSSI: number;
  /**@name 天线端口 */
  ant: number;
  /**@name 标签epc */
  value: string;
  readCount: number;
  PC: string;
}
