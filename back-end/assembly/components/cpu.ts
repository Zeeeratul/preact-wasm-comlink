import { combineBytes } from "../utils/bit-operations";
import Memory from "./memory";

export default class CPU {
  a: u8 = 0;
  f: u8 = 0;
  b: u8 = 0;
  c: u8 = 0;
  d: u8 = 0;
  e: u8 = 0;
  h: u8 = 0;
  l: u8 = 0;
  pc: u16 = 0;
  sp: u16 = 0;

  getBC(): u16 {
    return combineBytes(this.b, this.c);
  }

  getDE(): u16 {
    return combineBytes(this.d, this.e);
  }

  getHL(): u16 {
    return combineBytes(this.h, this.l);
  }

  constructor(memory: Memory) {}
}
