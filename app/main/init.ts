import * as log from "electron-log";
import { app } from "electron";
import fs from "node:fs";
export function init() {
  if (process.env.NODE_ENV === "production") {
    // 生产环境产出log文件
    Object.assign(console, log.functions);
  }
  process.env.APP_DATA = app.getPath("userData");
  console.log("process.env.DIST_ELECTRON", process.env.DIST_ELECTRON);
  console.log("__dirname", __dirname);
  console.log(`node版本号:${process.versions.node}`);
  console.log(`electron:${process.versions.electron}`);
  console.log(`modules:${process.versions.modules}`);
  console.log(`userdata:${process.env.APP_DATA}`);
}
