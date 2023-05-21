export type IpcSendOptions = {
  channel: string;
  timeout?: number;
  isSendMessage?: boolean;
};
export type IpcSendResult<T = any> = {
  result: boolean;
  data: T;
  msg: string;
};
