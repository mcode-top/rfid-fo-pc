export type IpcSendOptions = {
    channel: string;
    timeout?: number;
};
export type IpcSendResult<T = any> = {
    result: boolean;
    data: T;
    msg: string;
};
