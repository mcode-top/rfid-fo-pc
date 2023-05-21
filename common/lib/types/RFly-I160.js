"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RFlyI160SelectAreaEnum = exports.RFlyI160Status = exports.RFlyI160Code = void 0;
/**@name 标签应用指令码 */
var RFlyI160Code;
(function (RFlyI160Code) {
    /**@name 单次盘点标签 */
    RFlyI160Code[RFlyI160Code["SingleInventory"] = 1] = "SingleInventory";
    /**@name 时间段盘点标签 */
    RFlyI160Code[RFlyI160Code["TimeInventory"] = 2] = "TimeInventory";
    /**@name 写标签数据 */
    RFlyI160Code[RFlyI160Code["WriteTagData"] = 3] = "WriteTagData";
    /**@name 读标签数据 */
    RFlyI160Code[RFlyI160Code["ReadTagData"] = 4] = "ReadTagData";
    /**@name 锁标签 */
    RFlyI160Code[RFlyI160Code["LockTag"] = 5] = "LockTag";
    /**@name 杀死标签 */
    RFlyI160Code[RFlyI160Code["KillTag"] = 6] = "KillTag";
    /**@name 块写标签数据 */
    RFlyI160Code[RFlyI160Code["BlockWriteTagData"] = 7] = "BlockWriteTagData";
    /**@name 块擦除 */
    RFlyI160Code[RFlyI160Code["BlockErase"] = 8] = "BlockErase";
    /**@name 连续盘点标签 */
    RFlyI160Code[RFlyI160Code["ContinuousInventory"] = 17] = "ContinuousInventory";
    /**@name 停止连续盘点 */
    RFlyI160Code[RFlyI160Code["StopContinuousInventory"] = 18] = "StopContinuousInventory";
    /**@name 载波控制 */
    RFlyI160Code[RFlyI160Code["CarrierControl"] = 32] = "CarrierControl";
    /**@name 连续盘点标签指定区域数据 */
    RFlyI160Code[RFlyI160Code["ContinuousInventorySpecifiedAreaData"] = 161] = "ContinuousInventorySpecifiedAreaData";
    /**@name 时间段盘点标签指定区域数据 */
    RFlyI160Code[RFlyI160Code["TimeInventorySpecifiedAreaData"] = 162] = "TimeInventorySpecifiedAreaData";
    /**@name 连续盘点标签并写入指定区域数据 */
    RFlyI160Code[RFlyI160Code["ContinuousInventoryAndWriteSpecifiedAreaData"] = 163] = "ContinuousInventoryAndWriteSpecifiedAreaData";
    /**@name 时间段盘点标签并写入指定区域数据 */
    RFlyI160Code[RFlyI160Code["TimeInventoryAndWriteSpecifiedAreaData"] = 164] = "TimeInventoryAndWriteSpecifiedAreaData";
    /**@name 天线设置 */
    RFlyI160Code[RFlyI160Code["SetAntenna"] = 65] = "SetAntenna";
    /**@name 功率设置 */
    RFlyI160Code[RFlyI160Code["SetPower"] = 66] = "SetPower";
    /**@name 调频表设置 */
    RFlyI160Code[RFlyI160Code["SetFrequencyHoppingTable"] = 67] = "SetFrequencyHoppingTable";
    /**@name 区域设置 */
    RFlyI160Code[RFlyI160Code["SetRegion"] = 68] = "SetRegion";
    /**@name Gen2协议设置 */
    RFlyI160Code[RFlyI160Code["SetGen2"] = 69] = "SetGen2";
    /**@name 波特率更改 */
    RFlyI160Code[RFlyI160Code["SetBaudRate"] = 80] = "SetBaudRate";
    /**@name GPIO设置 */
    RFlyI160Code[RFlyI160Code["SetGPIO"] = 81] = "SetGPIO";
    /**@name 保存设置 */
    RFlyI160Code[RFlyI160Code["SaveSettings"] = 95] = "SaveSettings";
    /**@name 获取版本号 */
    RFlyI160Code[RFlyI160Code["GetVersion"] = 112] = "GetVersion";
    /**@name 获取天线 */
    RFlyI160Code[RFlyI160Code["GetAntenna"] = 113] = "GetAntenna";
    /**@name 获取功率 */
    RFlyI160Code[RFlyI160Code["GetPower"] = 114] = "GetPower";
    /**@name 获取跳频表 */
    RFlyI160Code[RFlyI160Code["GetFrequencyHoppingTable"] = 115] = "GetFrequencyHoppingTable";
    /**@name 获取区域 */
    RFlyI160Code[RFlyI160Code["GetRegion"] = 116] = "GetRegion";
    /**@name 获取Gen2协议 */
    RFlyI160Code[RFlyI160Code["GetGen2"] = 117] = "GetGen2";
    /**@name 获取GPIO状态 */
    RFlyI160Code[RFlyI160Code["GetGPIO"] = 129] = "GetGPIO";
    /**@name 获取温度 */
    RFlyI160Code[RFlyI160Code["GetTemperature"] = 144] = "GetTemperature";
    /**@name 获取SN码 */
    RFlyI160Code[RFlyI160Code["GetSN"] = 145] = "GetSN";
})(RFlyI160Code = exports.RFlyI160Code || (exports.RFlyI160Code = {}));
/**@name 标签应用返回的状态码 */
var RFlyI160Status;
(function (RFlyI160Status) {
    /**@name 成功 */
    RFlyI160Status[RFlyI160Status["STATUS_SUCCESS_CODE"] = 0] = "STATUS_SUCCESS_CODE";
    /**@name 发送数据太大 */
    RFlyI160Status[RFlyI160Status["FAULT_MSG_WRONG_NUMBER_OF_DATA"] = 16] = "FAULT_MSG_WRONG_NUMBER_OF_DATA";
    /**@name 无效操作码 */
    RFlyI160Status[RFlyI160Status["FAULT_INVALID_OPCODE"] = 17] = "FAULT_INVALID_OPCODE";
    /**@name 未实现的操作码 */
    RFlyI160Status[RFlyI160Status["FAULT_UNIMPLEMENTED_OPCODE"] = 18] = "FAULT_UNIMPLEMENTED_OPCODE";
    /**@name 功率太高 */
    RFlyI160Status[RFlyI160Status["FAULT_MSG_POWER_TOO_HIGH"] = 19] = "FAULT_MSG_POWER_TOO_HIGH";
    /**@name 无效频率 */
    RFlyI160Status[RFlyI160Status["FAULT_MSG_INVALID_FREQ_RECEIVED"] = 20] = "FAULT_MSG_INVALID_FREQ_RECEIVED";
    /**@name 无效参数值 */
    RFlyI160Status[RFlyI160Status["FAULT_MSG_INVALID_PARAMETER_VALUE"] = 21] = "FAULT_MSG_INVALID_PARAMETER_VALUE";
    /**@name 功率太低 */
    RFlyI160Status[RFlyI160Status["FAULT_MSG_POWER_TOO_LOW"] = 22] = "FAULT_MSG_POWER_TOO_LOW";
    /**@name 无效的数据位数 */
    RFlyI160Status[RFlyI160Status["FAULT_MSG_WRONG_NUM_BITS_TO_TX"] = 23] = "FAULT_MSG_WRONG_NUM_BITS_TO_TX";
    /**@name 超时时间太长 */
    RFlyI160Status[RFlyI160Status["FAULT_MSG_TIMEOUT_TOO_LONG"] = 24] = "FAULT_MSG_TIMEOUT_TOO_LONG";
    /**@name 未实现的功能 */
    RFlyI160Status[RFlyI160Status["FAULT_UNIMPLEMENTED_FEATURE"] = 25] = "FAULT_UNIMPLEMENTED_FEATURE";
    /**@name 无效波特率 */
    RFlyI160Status[RFlyI160Status["FAULT_INVALID_BAUD_RATE"] = 26] = "FAULT_INVALID_BAUD_RATE";
    /**@name 找不到标记 */
    RFlyI160Status[RFlyI160Status["FAULT_NO_TAGS_FOUND"] = 64] = "FAULT_NO_TAGS_FOUND";
    /**@name 故障写入传递锁定失败 */
    RFlyI160Status[RFlyI160Status["FAULT_WRITE_PASSED_LOCK_FAILED"] = 65] = "FAULT_WRITE_PASSED_LOCK_FAILED";
    /**@name 故障协议未读取数据 */
    RFlyI160Status[RFlyI160Status["FAULT_PROTOCOL_NO_DATA_READ"] = 66] = "FAULT_PROTOCOL_NO_DATA_READ";
    /**@name 故障AFE未亮起 */
    RFlyI160Status[RFlyI160Status["FAULT_AFE_NOT_ON"] = 67] = "FAULT_AFE_NOT_ON";
    /**@name 故障协议写入失败 */
    RFlyI160Status[RFlyI160Status["FAULT_PROTOCOL_WRITE_FAILED"] = 68] = "FAULT_PROTOCOL_WRITE_FAILED";
    /**@name 此协议未实现错误 */
    RFlyI160Status[RFlyI160Status["FAULT_NOT_IMPLEMENTED_FOR_THIS_PROTOCOL"] = 69] = "FAULT_NOT_IMPLEMENTED_FOR_THIS_PROTOCOL";
    /**@name 故障协议无效写入数据 */
    RFlyI160Status[RFlyI160Status["FAULT_PROTOCOL_INVALID_WRITE_DATA"] = 70] = "FAULT_PROTOCOL_INVALID_WRITE_DATA";
    /**@name 故障协议地址无效 */
    RFlyI160Status[RFlyI160Status["FAULT_PROTOCOL_INVALID_ADDRESS"] = 71] = "FAULT_PROTOCOL_INVALID_ADDRESS";
    /**@name 故障常规标记错误 */
    RFlyI160Status[RFlyI160Status["FAULT_GENERAL_TAG_ERROR"] = 72] = "FAULT_GENERAL_TAG_ERROR";
    /**@name 故障数据太大 */
    RFlyI160Status[RFlyI160Status["FAULT_DATA_TOO_LARGE"] = 73] = "FAULT_DATA_TOO_LARGE";
    /**@name 故障协议无效读取数据 */
    RFlyI160Status[RFlyI160Status["FAULT_PROTOCOL_INVALID_READ_DATA"] = 74] = "FAULT_PROTOCOL_INVALID_READ_DATA";
    /**@name 错误协议无效的删除密码 */
    RFlyI160Status[RFlyI160Status["FAULT_PROTOCOL_INVALID_KILL_PASSWORD"] = 74] = "FAULT_PROTOCOL_INVALID_KILL_PASSWORD";
    /**@name 故障测试失败 */
    RFlyI160Status[RFlyI160Status["FAULT_TEST_FAILED"] = 75] = "FAULT_TEST_FAILED";
    /**@name 故障协议天线端口无效 */
    RFlyI160Status[RFlyI160Status["FAULT_PROTOCOL_INVALID_ANTENNA_PORT"] = 76] = "FAULT_PROTOCOL_INVALID_ANTENNA_PORT";
    /**@name 故障协议删除失败 */
    RFlyI160Status[RFlyI160Status["FAULT_PROTOCOL_KILL_FAILED"] = 76] = "FAULT_PROTOCOL_KILL_FAILED";
    /**@name 故障协议位解码失败 */
    RFlyI160Status[RFlyI160Status["FAULT_PROTOCOL_BIT_DECODING_FAILED"] = 77] = "FAULT_PROTOCOL_BIT_DECODING_FAILED";
    /**@name 故障协议无效的EPC */
    RFlyI160Status[RFlyI160Status["FAULT_PROTOCOL_INVALID_EPC"] = 78] = "FAULT_PROTOCOL_INVALID_EPC";
    /**@name 故障协议无效的数据 */
    RFlyI160Status[RFlyI160Status["FAULT_PROTOCOL_INVALID_NUM_DATA"] = 79] = "FAULT_PROTOCOL_INVALID_NUM_DATA";
    /**@name 协议其他错误 */
    RFlyI160Status[RFlyI160Status["FAULT_GEN2_PROTOCOL_OTHER_ERROR"] = 81] = "FAULT_GEN2_PROTOCOL_OTHER_ERROR";
    /**@name 故障协议无效的PC */
    RFlyI160Status[RFlyI160Status["FAULT_GEN2_PROTOCOL_MEMORY_OVERRUN_BAD_PC"] = 82] = "FAULT_GEN2_PROTOCOL_MEMORY_OVERRUN_BAD_PC";
    /**@name 故障协议内存锁定 */
    RFlyI160Status[RFlyI160Status["FAULT_GEN2_PROTOCOL_MEMORY_LOCKED"] = 83] = "FAULT_GEN2_PROTOCOL_MEMORY_LOCKED";
    /**@name 故障协议电源不足 */
    RFlyI160Status[RFlyI160Status["FAULT_GEN2_PROTOCOL_INSUFFICIENT_POWER"] = 84] = "FAULT_GEN2_PROTOCOL_INSUFFICIENT_POWER";
    /**@name 故障协议非特定错误 */
    RFlyI160Status[RFlyI160Status["FAULT_GEN2_PROTOCOL_NON_SPECIFIC_ERROR"] = 85] = "FAULT_GEN2_PROTOCOL_NON_SPECIFIC_ERROR";
    /**@name 故障协议未知错误 */
    RFlyI160Status[RFlyI160Status["FAULT_GEN2_PROTOCOL_UNKNOWN_ERROR"] = 86] = "FAULT_GEN2_PROTOCOL_UNKNOWN_ERROR";
    /**@name 故障协议验证失败 */
    RFlyI160Status[RFlyI160Status["FAULT_VERIFY_FAILED"] = 87] = "FAULT_VERIFY_FAILED";
    /**@name 故障协议无效的数据 */
    RFlyI160Status[RFlyI160Status["FAULT_AHAL_INVALID_FREQ"] = 112] = "FAULT_AHAL_INVALID_FREQ";
    /**@name 故障协议通道占用 */
    RFlyI160Status[RFlyI160Status["FAULT_AHAL_CHANNEL_OCCUPIED"] = 113] = "FAULT_AHAL_CHANNEL_OCCUPIED";
    /**@name 故障协议发射机打开 */
    RFlyI160Status[RFlyI160Status["FAULT_AHAL_TRANSMITTER_ON"] = 114] = "FAULT_AHAL_TRANSMITTER_ON";
    /**@name 故障协议天线未连接 */
    RFlyI160Status[RFlyI160Status["FAULT_AHAL_ANTENNA_NOT_CONNECTED"] = 115] = "FAULT_AHAL_ANTENNA_NOT_CONNECTED";
    /**@name 故障协议温度超过限制 */
    RFlyI160Status[RFlyI160Status["FAULT_AHAL_TEMPERATURE_EXCEED_LIMITS"] = 116] = "FAULT_AHAL_TEMPERATURE_EXCEED_LIMITS";
    /**@name 故障协议高回波损耗 */
    RFlyI160Status[RFlyI160Status["FAULT_AHAL_HIGH_RETURN_LOSS"] = 117] = "FAULT_AHAL_HIGH_RETURN_LOSS";
    /**@name 故障协议PLL未锁定 */
    RFlyI160Status[RFlyI160Status["FAULT_AHAL_PLL_NOT_LOCKED"] = 118] = "FAULT_AHAL_PLL_NOT_LOCKED";
    /**@name 故障协议无效的天线配置 */
    RFlyI160Status[RFlyI160Status["FAULT_AHAL_INVALID_ANTENNA_CONFIG"] = 119] = "FAULT_AHAL_INVALID_ANTENNA_CONFIG";
    /**@name 故障系统未知错误 */
    RFlyI160Status[RFlyI160Status["FAULT_SYSTEM_UNKNOWN_ERROR"] = 159] = "FAULT_SYSTEM_UNKNOWN_ERROR";
})(RFlyI160Status = exports.RFlyI160Status || (exports.RFlyI160Status = {}));
/**@name 设备选择区域 */
var RFlyI160SelectAreaEnum;
(function (RFlyI160SelectAreaEnum) {
    RFlyI160SelectAreaEnum[RFlyI160SelectAreaEnum["EPC"] = 1] = "EPC";
    RFlyI160SelectAreaEnum[RFlyI160SelectAreaEnum["TID"] = 2] = "TID";
    RFlyI160SelectAreaEnum[RFlyI160SelectAreaEnum["USER"] = 3] = "USER";
})(RFlyI160SelectAreaEnum = exports.RFlyI160SelectAreaEnum || (exports.RFlyI160SelectAreaEnum = {}));
