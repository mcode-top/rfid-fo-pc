import { get } from "lodash";
import fs from "node:fs";
import path from "node:path";
import { app } from "electron";
/**@name 本地数据仓库 */
export class LocalDataStore {
  constructor(private path: string) {
    this.path = path;
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify({}));
    }
  }
  getStore() {
    return JSON.parse(fs.readFileSync(this.path, "utf-8"));
  }
  setStore(value) {
    fs.writeFileSync(this.path, JSON.stringify(value));
  }
  /**@name 获取值支持 a.b.c */
  getItem(key) {
    return get(this.getStore(), key);
  }
  getAll() {
    return this.getStore();
  }
  setItem(key, value) {
    const store = this.getStore();
    this.setStore({ ...store, [key]: value });
  }
  removeItem(key) {
    const store = this.getStore();
    delete store[key];
    this.setStore(store);
  }
  clear() {
    this.setStore({});
  }
}

export const appStore = new LocalDataStore(
  path.join(app.getPath("userData"), "local_config.json")
);
