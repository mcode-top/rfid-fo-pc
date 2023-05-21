"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHex = exports.computeRSSI = exports.createUniqueIdInstance = exports.isPort = exports.isIP = exports.tenToSixteen = void 0;
/**@name 10进制转换16进制文本 */
function tenToSixteen(num) {
    return "0x" + num.toString(16).padStart(2, "0");
}
exports.tenToSixteen = tenToSixteen;
/**@name 是否为IP */
function isIP(ip) {
    const ipArr = ip.split(".");
    if (ipArr.length !== 4) {
        return false;
    }
    else if (ipArr.some((v) => isNaN(+v) || +v < 0 || +v > 255)) {
        return false;
    }
    return true;
}
exports.isIP = isIP;
/**@name 是否为端口 */
function isPort(port) {
    return !isNaN(+port) && +port > 0 && +port < 65535;
}
exports.isPort = isPort;
/**@name 创建唯一ID */
function createUniqueIdInstance() {
    let i = 0;
    return function getId() {
        if (i !== Number.MAX_VALUE) {
            return i++;
        }
        else {
            return (i = 0);
        }
    };
}
exports.createUniqueIdInstance = createUniqueIdInstance;
/**@name 计算RSSI */
function computeRSSI(rssi) {
    if (rssi > 127) {
        return rssi - 256;
    }
    else {
        return rssi;
    }
}
exports.computeRSSI = computeRSSI;
/**@name 是否为hex */
function isHex(hex) {
    return /^[\da-f]+$/i.test(hex);
}
exports.isHex = isHex;
