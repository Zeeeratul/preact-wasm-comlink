import {
  combineBytes,
  getBitValue,
  getHighByte,
  getLowByte,
  setBitValue,
} from "../../utils/bit-operations";
import {
  handle0xOpcode,
  handle1xOpcode,
  handle2xOpcode,
  handle3xOpcode,
  handle4xOpcode,
  handle5xOpcode,
  handle6xOpcode,
  handle7xOpcode,
  handle8xOpcode,
  handle9xOpcode,
  handleAxOpcode,
  handleBxOpcode,
  handleCxOpcode,
  handleDxOpcode,
  handleExOpcode,
  handleFxOpcode,
} from "./opcode";

export default class CPU {
  static A: u8 = 0;
  static B: u8 = 0;
  static C: u8 = 0;
  static D: u8 = 0;
  static E: u8 = 0;
  static H: u8 = 0;
  static L: u8 = 0;
  static F: u8 = 0;
  static pc: u16 = 0x0;
  static sp: u16 = 0;

  static isHalted: boolean = false;

  static reset(bootRomLoaded: bool = false): void {
    CPU.isHalted = false;
    if (bootRomLoaded) {
      CPU.A = 0x0;
      CPU.B = 0x0;
      CPU.C = 0x0;
      CPU.D = 0x0;
      CPU.E = 0x0;
      CPU.H = 0x0;
      CPU.L = 0x0;
      CPU.F = 0x0;
      CPU.pc = 0x0;
      CPU.sp = 0x0;
    } else {
      CPU.A = 0x01;
      CPU.B = 0x0;
      CPU.C = 0x13;
      CPU.D = 0;
      CPU.E = 0xd8;
      CPU.H = 0x01;
      CPU.L = 0x4d;
      CPU.F = 0xb0;
      CPU.pc = 0x100;
      CPU.sp = 0xfffe;
    }
  }

  static getBC(): u16 {
    return combineBytes(CPU.B, CPU.C);
  }

  static getDE(): u16 {
    return combineBytes(CPU.D, CPU.E);
  }

  static getHL(): u16 {
    return combineBytes(CPU.H, CPU.L);
  }

  static setBC(word: u16): void {
    CPU.C = getLowByte(word);
    CPU.B = getHighByte(word);
  }

  static setDE(word: u16): void {
    CPU.E = getLowByte(word);
    CPU.D = getHighByte(word);
  }

  static setHL(word: u16): void {
    CPU.L = getLowByte(word);
    CPU.H = getHighByte(word);
  }

  static setAF(word: u16): void {
    CPU.F = getLowByte(word) & 0b1111_0000;
    CPU.A = getHighByte(word);
  }

  static setZeroFlag(value: bool): void {
    CPU.F = CPU.F & 0b1111_0000;
    if (value) CPU.F = setBitValue(CPU.F, 7, 1);
    else CPU.F = setBitValue(CPU.F, 7, 0);
  }

  static setNegativeFlag(value: bool): void {
    CPU.F = CPU.F & 0b1111_0000;
    if (value) CPU.F = setBitValue(CPU.F, 6, 1);
    else CPU.F = setBitValue(CPU.F, 6, 0);
  }

  static setHalfCarryFlag(value: bool): void {
    CPU.F = CPU.F & 0b1111_0000;
    if (value) CPU.F = setBitValue(CPU.F, 5, 1);
    else CPU.F = setBitValue(CPU.F, 5, 0);
  }

  static setCarryFlag(value: bool): void {
    CPU.F = CPU.F & 0b1111_0000;
    if (value) CPU.F = setBitValue(CPU.F, 4, 1);
    else CPU.F = setBitValue(CPU.F, 4, 0);
  }

  static getZeroFlag(): bool {
    return getBitValue(CPU.F, 7);
  }

  static getNegativeFlag(): bool {
    return getBitValue(CPU.F, 6);
  }

  static getHalfCarryFlag(): bool {
    return getBitValue(CPU.F, 5);
  }

  static getCarryFlag(): bool {
    return getBitValue(CPU.F, 4);
  }

  static executeOpcode(opcode: u8): i32 {
    const firstNibble: u8 = opcode >> 4;
    const secondNibble: u8 = opcode & 0xf;

    switch (firstNibble) {
      case 0x0:
        return handle0xOpcode(secondNibble);
      case 0x1:
        return handle1xOpcode(secondNibble);
      case 0x2:
        return handle2xOpcode(secondNibble);
      case 0x3:
        return handle3xOpcode(secondNibble);
      case 0x4:
        return handle4xOpcode(secondNibble);
      case 0x5:
        return handle5xOpcode(secondNibble);
      case 0x6:
        return handle6xOpcode(secondNibble);
      case 0x7:
        return handle7xOpcode(secondNibble);
      case 0x8:
        return handle8xOpcode(secondNibble);
      case 0x9:
        return handle9xOpcode(secondNibble);
      case 0xa:
        return handleAxOpcode(secondNibble);
      case 0xb:
        return handleBxOpcode(secondNibble);
      case 0xc:
        return handleCxOpcode(secondNibble);
      case 0xd:
        return handleDxOpcode(secondNibble);
      case 0xe:
        return handleExOpcode(secondNibble);
      case 0xf:
        return handleFxOpcode(secondNibble);
      default: {
        console.error("Imposible opcode");
        return -1;
      }
    }
  }
}
