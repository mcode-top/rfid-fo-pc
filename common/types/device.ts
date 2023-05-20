/**@name 设备信息 */
export interface DeviceInfo {
  /**@name 设备ID */
  deviceId: string;
  /**@name 设备名称 */
  deviceName: string;
  /**@name 设备类型 */
  deviceType: string;
  /**@name 设备状态 */
  deviceStatus?: DeivceStatusEnum;
  ip?: string;
  port?: number;
  getway?: string;
  mask?: string;
}

/**@name 连接状态 */
export enum DeivceStatusEnum {
  /**@name 未连接 */
  Disconnected = 0,
  /**@name 已连接 */
  Connected = 1,
  /**@name 连接中 */
  Connecting = 2,
  /**@name 发生错误 */
  Error = 3,
  /**@name 未知 */
  Unknown = 4,
  /**@name 运行中*/
  Run = 5,
}
