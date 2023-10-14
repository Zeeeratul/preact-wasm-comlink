import { expose } from "comlink";
import * as wasmFnc from "./build/debug";

expose(wasmFnc);

export type WorkerAPI = typeof wasmFnc;
