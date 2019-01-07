export type ResponseData = {
  _from: string;
  _time: number;
  _to?: string;
  _with?: Array<string>;
  _which?: Tuple;
  [key: string]: any;
};

export type YurucomiWatchOperation = {
  tsName: string;
  from: string;
};

export type Settings = {
  [tsNamw: string]: {
    [userName: string]: Setting;
  };
};

export type Setting = {
  [propName: string]: Array<{ value: any; date: number }>;
};

export type SettingUpdateData = {
  tsName: string;
  userName: string;
  settings: Settings;
};

export type YurucomiOperation = {
  tsName: string;
  payload: Tuple;
  from?: string;
};

// linda-interfaces
export type LindaOperation = {
  _payload: Tuple;
  _where: string;
  _type: "read" | "write" | "watch" | "take";
  _from?: string;
};

export type LindaResponse = {
  _payload: Tuple;
  _where: string;
  _time: number;
  _id?: number | any;
  _isMuched?: boolean;
  _from?: string;
};

export interface LindaCallback {
  (res: LindaResponse): void;
}

export type MemoryDB = {
  [tsName: string]: Array<TupleInfo>;
};

export type TupleInfo = {
  _payload: Tuple;
  _where: string;
  _from?: string;
  _time: number;
  _id: number | any;
};
export type Tuple = {
  [key: string]: number | string | boolean | Object;
};
