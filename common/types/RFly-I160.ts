/**@name 标签应用指令码 */
export enum RElyI160Code {
  /**@name 单次盘点标签 */
  SingleInventory = 0x01,
  /**@name 时间段盘点标签 */
  TimeInventory = 0x02,
  /**@name 写标签数据 */
  WriteTagData = 0x03,
  /**@name 读标签数据 */
  ReadTagData = 0x04,
  /**@name 锁标签 */
  LockTag = 0x05,
  /**@name 杀死标签 */
  KillTag = 0x06,
  /**@name 块写标签数据 */
  BlockWriteTagData = 0x07,
  /**@name 块擦除 */
  BlockErase = 0x08,
  /**@name 连续盘点标签 */
  ContinuousInventory = 0x11,
  /**@name 停止连续盘点 */
  StopContinuousInventory = 0x12,
  /**@name 载波控制 */
  CarrierControl = 0x20,
  /**@name 连续盘点标签指定区域数据 */
  ContinuousInventorySpecifiedAreaData = 0xa1,
  /**@name 时间段盘点标签指定区域数据 */
  TimeInventorySpecifiedAreaData = 0xa2,
  /**@name 连续盘点标签并写入指定区域数据 */
  ContinuousInventoryAndWriteSpecifiedAreaData = 0xa3,
  /**@name 时间段盘点标签并写入指定区域数据 */
  TimeInventoryAndWriteSpecifiedAreaData = 0xa4,
  /**@name 天线设置 */
  SetAntenna = 0x41,
  /**@name 功率设置 */
  SetPower = 0x42,
  /**@name 调频表设置 */
  SetFrequencyHoppingTable = 0x43,
  /**@name 区域设置 */
  SetRegion = 0x44,
  /**@name Gen2协议设置 */
  SetGen2 = 0x45,
  /**@name 波特率更改 */
  SetBaudRate = 0x50,
  /**@name GPIO设置 */
  SetGPIO = 0x51,
  /**@name 保存设置 */
  SaveSettings = 0x5f,
  /**@name 获取版本号 */
  GetVersion = 0x70,
  /**@name 获取天线 */
  GetAntenna = 0x71,
  /**@name 获取功率 */
  GetPower = 0x72,
  /**@name 获取跳频表 */
  GetFrequencyHoppingTable = 0x73,
  /**@name 获取区域 */
  GetRegion = 0x74,
  /**@name 获取Gen2协议 */
  GetGen2 = 0x75,
  /**@name 获取GPIO状态 */
  GetGPIO = 0x81,
  /**@name 获取温度 */
  GetTemperature = 0x90,
  /**@name 获取SN码 */
  GetSN = 0x91,
}

/**@name 标签应用返回的状态码 */
export enum RElyI160Status {
  /**@name 成功 */
  STATUS_SUCCESS_CODE = 0x00,
  /**@name 发送数据太大 */
  FAULT_MSG_WRONG_NUMBER_OF_DATA = 0x10,
  /**@name 无效操作码 */
  FAULT_INVALID_OPCODE = 0x11,
  /**@name 未实现的操作码 */
  FAULT_UNIMPLEMENTED_OPCODE = 0x12,
  /**@name 功率太高 */
  FAULT_MSG_POWER_TOO_HIGH = 0x13,
  /**@name 无效频率 */
  FAULT_MSG_INVALID_FREQ_RECEIVED = 0x14,
  /**@name 无效参数值 */
  FAULT_MSG_INVALID_PARAMETER_VALUE = 0x15,
  /**@name 功率太低 */
  FAULT_MSG_POWER_TOO_LOW = 0x16,
  /**@name 无效的数据位数 */
  FAULT_MSG_WRONG_NUM_BITS_TO_TX = 0x17,
  /**@name 超时时间太长 */
  FAULT_MSG_TIMEOUT_TOO_LONG = 0x18,
  /**@name 未实现的功能 */
  FAULT_UNIMPLEMENTED_FEATURE = 0x19,
  /**@name 无效波特率 */
  FAULT_INVALID_BAUD_RATE = 0x1a,
  /**@name 找不到标记 */
  FAULT_NO_TAGS_FOUND = 0x40,
  /**@name 故障写入传递锁定失败 */
  FAULT_WRITE_PASSED_LOCK_FAILED = 0x41,
  /**@name 故障协议未读取数据 */
  FAULT_PROTOCOL_NO_DATA_READ = 0x42,
  /**@name 故障AFE未亮起 */
  FAULT_AFE_NOT_ON = 0x43,
  /**@name 故障协议写入失败 */
  FAULT_PROTOCOL_WRITE_FAILED = 0x44,
  /**@name 此协议未实现错误 */
  FAULT_NOT_IMPLEMENTED_FOR_THIS_PROTOCOL = 0x45,
  /**@name 故障协议无效写入数据 */
  FAULT_PROTOCOL_INVALID_WRITE_DATA = 0x46,
  /**@name 故障协议地址无效 */
  FAULT_PROTOCOL_INVALID_ADDRESS = 0x47,
  /**@name 故障常规标记错误 */
  FAULT_GENERAL_TAG_ERROR = 0x48,
  /**@name 故障数据太大 */
  FAULT_DATA_TOO_LARGE = 0x49,
  /**@name 故障协议无效读取数据 */
  FAULT_PROTOCOL_INVALID_READ_DATA = 0x4a,
  /**@name 错误协议无效的删除密码 */
  FAULT_PROTOCOL_INVALID_KILL_PASSWORD = 0x4a,
  /**@name 故障测试失败 */
  FAULT_TEST_FAILED = 0x4b,
  /**@name 故障协议天线端口无效 */
  FAULT_PROTOCOL_INVALID_ANTENNA_PORT = 0x4c,
  /**@name 故障协议删除失败 */
  FAULT_PROTOCOL_KILL_FAILED = 0x4c,
  /**@name 故障协议位解码失败 */
  FAULT_PROTOCOL_BIT_DECODING_FAILED = 0x4d,
  /**@name 故障协议无效的EPC */
  FAULT_PROTOCOL_INVALID_EPC = 0x4e,
  /**@name 故障协议无效的数据 */
  FAULT_PROTOCOL_INVALID_NUM_DATA = 0x4f,
  /**@name 协议其他错误 */
  FAULT_GEN2_PROTOCOL_OTHER_ERROR = 0x51,
  /**@name 故障协议无效的PC */
  FAULT_GEN2_PROTOCOL_MEMORY_OVERRUN_BAD_PC = 0x52,
  /**@name 故障协议内存锁定 */
  FAULT_GEN2_PROTOCOL_MEMORY_LOCKED = 0x53,
  /**@name 故障协议电源不足 */
  FAULT_GEN2_PROTOCOL_INSUFFICIENT_POWER = 0x54,
  /**@name 故障协议非特定错误 */
  FAULT_GEN2_PROTOCOL_NON_SPECIFIC_ERROR = 0x55,
  /**@name 故障协议未知错误 */
  FAULT_GEN2_PROTOCOL_UNKNOWN_ERROR = 0x56,
  /**@name 故障协议验证失败 */
  FAULT_VERIFY_FAILED = 0x57,
  /**@name 故障协议无效的数据 */
  FAULT_AHAL_INVALID_FREQ = 0x70,
  /**@name 故障协议通道占用 */
  FAULT_AHAL_CHANNEL_OCCUPIED = 0x71,
  /**@name 故障协议发射机打开 */
  FAULT_AHAL_TRANSMITTER_ON = 0x72,
  /**@name 故障协议天线未连接 */
  FAULT_AHAL_ANTENNA_NOT_CONNECTED = 0x73,
  /**@name 故障协议温度超过限制 */
  FAULT_AHAL_TEMPERATURE_EXCEED_LIMITS = 0x74,
  /**@name 故障协议高回波损耗 */
  FAULT_AHAL_HIGH_RETURN_LOSS = 0x75,
  /**@name 故障协议PLL未锁定 */
  FAULT_AHAL_PLL_NOT_LOCKED = 0x76,
  /**@name 故障协议无效的天线配置 */
  FAULT_AHAL_INVALID_ANTENNA_CONFIG = 0x77,
  /**@name 故障系统未知错误 */
  FAULT_SYSTEM_UNKNOWN_ERROR = 0x9f,
}
/**@name 设置设备端口的UDP数据 */
export type ScanDeviceRFlyI160UDPData = {
  mac: string;
  targetIp: string;
  targetPort: number;
  readerPort: number;
  readerIp: string;
  readerMask: string;
  readerGeteway: string;
  mode: number;
  version?: string;
};

/**@name 设置盘点数据 */
export interface DeviceRFlyI160CheckData {
  /**@name 信号强度 */
  RSSI: number;
  /**@name 天线端口 */
  ant: number;
  /**@name 标签epc */
  value: string;
  readCount: number;
  PC: string;
  deviceId?: string;
  lastReadTime?: number;
}
