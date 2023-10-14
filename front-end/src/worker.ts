import { expose } from "comlink";
import * as wasmFnc from "./build/release.js";

const api = {
  getArray: () => {
    const array = wasmFnc.getArray();
    console.log(array);
  },
};

expose(api);

export type WorkerAPI = typeof api;
