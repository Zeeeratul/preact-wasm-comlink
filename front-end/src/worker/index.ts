import { expose } from "comlink";

const api = {
  multiply: (a: number, b: number) => a * b,
};

expose(api);
