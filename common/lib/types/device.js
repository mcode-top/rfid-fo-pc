"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeivceStatusEnum = void 0;
/**@name 连接状态 */
var DeivceStatusEnum;
(function (DeivceStatusEnum) {
    /**@name 未连接 */
    DeivceStatusEnum[DeivceStatusEnum["Disconnected"] = 0] = "Disconnected";
    /**@name 已连接 */
    DeivceStatusEnum[DeivceStatusEnum["Connected"] = 1] = "Connected";
    /**@name 连接中 */
    DeivceStatusEnum[DeivceStatusEnum["Connecting"] = 2] = "Connecting";
    /**@name 发生错误 */
    DeivceStatusEnum[DeivceStatusEnum["Error"] = 3] = "Error";
    /**@name 未知 */
    DeivceStatusEnum[DeivceStatusEnum["Unknown"] = 4] = "Unknown";
    /**@name */
    DeivceStatusEnum[DeivceStatusEnum["Run"] = 5] = "Run";
})(DeivceStatusEnum = exports.DeivceStatusEnum || (exports.DeivceStatusEnum = {}));
