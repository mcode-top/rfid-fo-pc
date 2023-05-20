import { isIP, isPort } from "@my/common";
import type { FormItemRule } from "element-plus";

/**@name 格式化MAC */
export function formatMacToZh(mac: string) {
  return mac.replace(/(.{2})/g, "$1 ").trim();
}
/**@name 表单校验判断是否为IP */
export const vaildateIp = {
  validator(rule, value, callback) {
    console.log("====================================");
    console.log(value);
    console.log("====================================");
    if (isIP(value)) {
      callback();
    } else {
      callback(new Error("请输入正确的IP地址"));
    }
  },
} as FormItemRule;
/**@name 表单校验判断是否为端口 */
export const validatePort = {
  validator(rule, value, callback) {
    console.log("====================================");
    console.log(isPort(value));
    console.log("====================================");
    if (isPort(value)) {
      callback();
    } else {
      callback(new Error("请输入正确的端口"));
    }
  },
} as FormItemRule;
