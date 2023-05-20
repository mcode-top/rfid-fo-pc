import { ScanDeviceRFlyI160UDPData, isIP, isPort } from "@my/common";
import * as dgram from "node:dgram";
import * as dns from "node:dns";
import * as os from "node:os";
/**@name 获取RFlyI160UDP数据 */
const RFLY_I160_UDP_DATA = "0123456789012345678901234567890123456789";
/**@name 获取当前主机下的所有IPV4地址 */
function getIPV4ForHostname(): Promise<dns.LookupAddress[]> {
  return new Promise((resolve, reject) => {
    const hostname = os.hostname();
    // 扫描当前主机下的所有IPV4地址
    dns.lookup(
      hostname,
      {
        all: true,
        family: 4,
      },
      (err, addresses) => {
        if (err) {
          console.error(err, "dns.lookup");
          reject(err);
          return;
        }
        resolve(addresses);
      }
    );
  });
}

/**@name 广播RFlyI160 */
function UDPbroadcastRFlyI160(
  hostname,
  message,
  timeout = 500
): Promise<ScanDeviceRFlyI160UDPData[]> {
  return new Promise((resolve, reject) => {
    const udpClient = dgram.createSocket("udp4");
    const serverAddress = "255.255.255.255"; // 目标服务器地址
    const serverPort = 1500; // 目标服务器端口
    udpClient.bind(1500, hostname, () => {
      udpClient.setBroadcast(true);
      // 发送的数据
      const buffer = Buffer.from(message);

      udpClient.send(
        buffer,
        0,
        buffer.length,
        serverPort,
        serverAddress,
        (error) => {
          if (error) {
            console.error("发送数据失败:", error);
            udpClient.close();
            reject(error);
          }
        }
      );
      // 先将拿到的数据存储到这里
      const result: ScanDeviceRFlyI160UDPData[] = [];
      udpClient.on("message", (buf) => {
        if (buf.toString("ascii") !== message) {
          // 如果是返回相同的则表示不是设备数据
          result.push(parseRFlyI160UDPData(buf));
        }
      });
      // 等待一定时间返回数据并关闭UDP连接
      setTimeout(() => {
        udpClient.close();
        resolve(result);
      }, timeout);
    });
    udpClient.on("error", (err) => {
      reject(err);
      console.error("开启1500端口失败", err);
      udpClient.close();
    });
  });
}
/**@name 解析RFly-I160UDP数据 */
function parseRFlyI160UDPData(buf): ScanDeviceRFlyI160UDPData {
  const portBuf = new Uint8Array([buf[12], buf[11], buf[18], buf[17]]);
  const dataView = new DataView(portBuf.buffer);
  // MAC地址
  const mac = buf.slice(0, 6).reverse().toString("hex");
  // 欲连接TCP目标IP(如果读写网络模式是TCP Client的话)
  const targetIp = `${buf[10]}.${buf[9]}.${buf[8]}.${buf[7]}`;
  // 欲连接TCP目标端口(如果读写网络模式是TCP Client的话)
  const targetPort = dataView.getUint16(0);
  // 读写器端口
  const readerPort = dataView.getUint16(2);
  // 读写器IP
  const readerIp = `${buf[16]}.${buf[15]}.${buf[14]}.${buf[13]}`;
  // 读写器子网掩码
  const readerMask = `${buf[34]}.${buf[33]}.${buf[32]}.${buf[31]}`;
  // 读写器网关
  const readerGeteway = `${buf[22]}.${buf[21]}.${buf[20]}.${buf[19]}`;
  // 网络模式 0表示TCP Client 1表示TCP Server
  const mode = buf[23] === 0x01 ? 0 : 1;
  // 版本号
  const version = `${buf[6] >> 4}.${buf[6] & 0x0f}`;
  return {
    mac,
    targetIp,
    targetPort,
    readerPort,
    readerIp,
    readerMask,
    readerGeteway,
    mode,
    version,
  };
}
/**@name 将数据编码成encode */
function encodeRFlyI160UDPData(data) {
  const {
    mac,
    targetIp,
    targetPort,
    readerPort,
    readerIp,
    readerMask,
    readerGeteway,
    // 默认TCP Server模式
    mode = 1,
  } = data;
  // 检查数据
  if (
    !mac ||
    !targetIp ||
    !targetPort ||
    !readerPort ||
    !readerIp ||
    !readerMask ||
    !readerGeteway
  ) {
    throw new Error("数据不完整");
  } else if (mac.length !== 12) {
    throw new Error("mac地址不正确");
  } else if (
    !isIP(targetIp) ||
    !isIP(readerIp) ||
    !isIP(readerMask) ||
    !isIP(readerGeteway)
  ) {
    throw new Error("输入的IP不正确");
  } else if (!isPort(targetPort) || !isPort(readerPort)) {
    throw new Error("输入的端口不正确");
  }
  const macBuf = Buffer.from(mac, "hex").reverse();
  const targetIpBuf = Buffer.from(
    targetIp
      .split(".")
      .reverse()
      .map((v) => +v)
  );
  const targetPortBuf = Buffer.alloc(2);
  const targetPortDataView = new DataView(targetPortBuf.buffer);
  targetPortDataView.setUint16(0, targetPort, true);
  const readerPortBuf = Buffer.alloc(2);
  const readerPortDataView = new DataView(readerPortBuf.buffer);
  readerPortDataView.setUint16(0, readerPort, true);
  const readerIpBuf = Buffer.from(
    readerIp
      .split(".")
      .reverse()
      .map((v) => +v)
  );
  const readerMaskBuf = Buffer.from(
    readerMask
      .split(".")
      .reverse()
      .map((v) => +v)
  );
  const readerGetewayBuf = Buffer.from(
    readerGeteway
      .split(".")
      .reverse()
      .map((v) => +v)
  );
  const modeBuf = Buffer.from([mode === 0 ? 0x01 : 0x00]);
  const buf = Buffer.from([
    ...macBuf,
    0x31,
    0x31,
    0x30,
    0x34,
    0x31,
    0x35,
    ...targetIpBuf,
    ...targetPortBuf,
    ...readerIpBuf,
    ...readerPortBuf,
    ...readerGetewayBuf,
    ...modeBuf,
    0x00,
    0xc2,
    0x01,
    0x03,
    0x00,
    0x00,
    0x00,
    ...readerMaskBuf,
  ]);
  return buf;
}
/**@name 扫描当前主机下的RFlyI160设备 */
export async function scanRFlyI160() {
  const addresses = await getIPV4ForHostname();
  // 给所有主机地址进行广播,查看RFlyI160设备再哪个网关中
  return await Promise.all(
    addresses.map(({ address }) =>
      UDPbroadcastRFlyI160(address, RFLY_I160_UDP_DATA)
    )
  ).then((res) => {
    // 编平化数据
    return res.reduce((a, b) => a.concat(b), []);
  });
}

/**@name 设置RFlyI160设备基本信息 */
export async function settingBaseRFlyI160(data: ScanDeviceRFlyI160UDPData) {
  return getIPV4ForHostname()
    .then((addresses) => {
      return Promise.all(
        addresses.map(({ address }) => {
          return UDPbroadcastRFlyI160(address, encodeRFlyI160UDPData(data));
        })
      );
    })
    .then((res) => true);
}
