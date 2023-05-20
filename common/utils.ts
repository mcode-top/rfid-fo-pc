/**@name 10进制转换16进制文本 */
export function tenToSixteen(num: number): string {
  return "0x" + num.toString(16).padStart(2, "0");
}
/**@name 是否为IP */
export function isIP(ip: string) {
  const ipArr = ip.split(".");
  if (ipArr.length !== 4) {
    return false;
  } else if (ipArr.some((v) => isNaN(+v) || +v < 0 || +v > 255)) {
    return false;
  }
  return true;
}
/**@name 是否为端口 */
export function isPort(port: number) {
  return !isNaN(+port) && +port > 0 && +port < 65535;
}
/**@name 创建唯一ID */
export function createUniqueIdInstance() {
  let i = 0;
  return function getId() {
    if (i !== Number.MAX_VALUE) {
      return i++;
    } else {
      return (i = 0);
    }
  };
}

/**@name 计算RSSI */
export function computeRSSI(rssi: number) {
  if (rssi > 127) {
    return rssi - 256;
  } else {
    return rssi;
  }
}
