import Memory from "../memory";
import CPU from ".";
import {
  getLowNibble,
  getHighByte,
  getLowByte,
  combineBytes,
  getBitValue,
  setBitValue,
} from "../../utils/bit-operations";
import handleCBOpcode from "./callbackOpcode";

export function handle0xOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "NOP"
      return 4;
    }
    case 0x1: {
      // "LD BC, nn"
      CPU.C = Memory.readByteAtPc();
      CPU.B = Memory.readByteAtPc();
      return 12;
    }
    case 0x2: {
      // "LD (BC), A"
      const bcAddress = CPU.getBC();
      Memory.writeByte(bcAddress, CPU.A);
      return 8;
    }
    case 0x3: {
      // "INC BC"
      const value = (CPU.getBC() + 1) & 0xffff;
      CPU.setBC(value);
      return 8;
    }
    case 0x4: {
      // "INC B"
      const value = (CPU.B + 1) & 0xff;
      const halfCarry: bool = ((getLowNibble(CPU.B) + 1) & 0x10) > 0 ? 1 : 0;
      CPU.setZeroFlag(value > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(0);
      CPU.B = value;
      return 4;
    }
    case 0x5: {
      // "DEC B"
      const value = (CPU.B - 1) & 0xff;
      const halfCarry: bool = ((getLowNibble(CPU.B) - 1) & 0x10) > 0 ? 1 : 0;
      CPU.setZeroFlag(value > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(1);
      CPU.B = value;
      return 4;
    }
    case 0x6: {
      // "LD B, n"
      CPU.B = Memory.readByteAtPc();
      return 8;
    }
    case 0x7: {
      // "RLCA"
      const eighthBit = getBitValue(CPU.A, 7);
      const shiftedValue = CPU.A << 1;
      CPU.A = setBitValue(shiftedValue, 0, eighthBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(0);
      CPU.setCarryFlag(eighthBit);
      return 4;
    }
    case 0x8: {
      // "LD (nn), SP"
      const lowByte = Memory.readByteAtPc();
      const highByte = Memory.readByteAtPc();
      const nn = combineBytes(highByte, lowByte);
      Memory.writeByte(nn, getLowByte(CPU.sp));
      Memory.writeByte(nn + 1, getHighByte(CPU.sp));
      return 20;
    }
    case 0x9: {
      // "ADD HL, BC"
      const hl = CPU.getHL();
      const bc = CPU.getBC();
      const result: u32 = <u32>hl + <u32>bc;
      const halfCarry: bool =
        (((hl & 0xfff) + (bc & 0xfff)) & 0x1000) > 0 ? 1 : 0;
      CPU.setCarryFlag(result > 0xffff ? 1 : 0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(0);
      CPU.setHL(<u16>(result & 0xffff));
      return 8;
    }
    case 0xa: {
      // "LD A, (BC)"
      const bcAddress = CPU.getBC();
      CPU.A = Memory.readByte(bcAddress);
      return 8;
    }
    case 0xb: {
      // "DEC BC"
      const bc = CPU.getBC();
      const bcDec = (bc - 1) & 0xffff;
      CPU.setBC(bcDec);
      return 8;
    }
    case 0xc: {
      // "INC C"
      const value = (CPU.C + 1) & 0xff;
      const halfCarry: bool = ((getLowNibble(CPU.C) + 1) & 0x10) > 0 ? 1 : 0;
      CPU.setZeroFlag(value > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(0);
      CPU.C = value;
      return 4;
    }
    case 0xd: {
      // "DEC C"
      const value = (CPU.C - 1) & 0xff;
      const halfCarry: bool = ((getLowNibble(CPU.C) - 1) & 0x10) > 0 ? 1 : 0;
      CPU.setZeroFlag(value > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(1);
      CPU.C = value;
      return 4;
    }
    case 0xe: {
      // "LD C, n"
      CPU.C = Memory.readByteAtPc();
      return 8;
    }
    case 0xf: {
      // "RRCA"
      const firstBit = getBitValue(CPU.A, 0);
      const shiftedValue = CPU.A >> 1;
      CPU.A = setBitValue(shiftedValue, 7, firstBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(0);
      CPU.setCarryFlag(firstBit);
      return 4;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}

export function handle1xOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "STOP"
      // console.error("STOP CRASH IN GAMEBOY CLASSIC");
      // WEIRD_INSTRUCTION ONLY USE IN GBC
      CPU.pc += 1;
      return 4;
    }
    case 0x1: {
      // "LD DE, nn"
      CPU.E = Memory.readByteAtPc();
      CPU.D = Memory.readByteAtPc();
      return 12;
    }
    case 0x2: {
      // "LD (DE), A"
      const deAddress = CPU.getDE();
      Memory.writeByte(deAddress, CPU.A);
      return 8;
    }
    case 0x3: {
      // "INC DE"
      const value = (CPU.getDE() + 1) & 0xffff;
      CPU.setDE(value);
      return 8;
    }
    case 0x4: {
      // "INC D"
      const value = (CPU.D + 1) & 0xff;
      const halfCarry: bool = ((getLowNibble(CPU.D) + 1) & 0x10) > 0 ? 1 : 0;
      CPU.setZeroFlag(value > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(0);
      CPU.D = value;
      return 4;
    }
    case 0x5: {
      // "DEC D"
      const value = (CPU.D - 1) & 0xff;
      const halfCarry: bool = ((getLowNibble(CPU.D) - 1) & 0x10) > 0 ? 1 : 0;
      CPU.setZeroFlag(value > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(1);
      CPU.D = value;
      return 4;
    }
    case 0x6: {
      // "LD D, n"
      CPU.D = Memory.readByteAtPc();
      return 8;
    }
    case 0x7: {
      // "RLA"
      const eighthBit = getBitValue(CPU.A, 7);
      const shiftedValue = CPU.A << 1;
      CPU.A = setBitValue(shiftedValue, 0, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(0);
      CPU.setCarryFlag(eighthBit);
      return 4;
    }
    case 0x8: {
      // "JR e"
      const relativeOffset: i8 = <i8>Memory.readByteAtPc();
      CPU.pc += relativeOffset;
      return 12;
    }
    case 0x9: {
      // "ADD HL, DE"
      const hl = CPU.getHL();
      const de = CPU.getDE();
      const result: u32 = <u32>hl + <u32>de;
      const halfCarry: bool =
        (((hl & 0xfff) + (de & 0xfff)) & 0x1000) > 0 ? 1 : 0;
      CPU.setCarryFlag(result > 0xffff ? 1 : 0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(0);
      CPU.setHL(<u16>(result & 0xffff));
      return 8;
    }
    case 0xa: {
      // "LD A, (DE)"
      const deAddress = CPU.getDE();
      CPU.A = Memory.readByte(deAddress);
      return 8;
    }
    case 0xb: {
      // "DEC DE"
      const value = (CPU.getDE() - 1) & 0xffff;
      CPU.setDE(value);
      return 8;
    }
    case 0xc: {
      // "INC E"
      const value = CPU.E + 1;
      const halfCarry: bool = ((getLowNibble(CPU.E) + 1) & 0x10) > 0 ? 1 : 0;
      CPU.setZeroFlag(value > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(0);
      CPU.E = value;
      return 4;
    }
    case 0xd: {
      // "DEC E"
      const value = (CPU.E - 1) & 0xff;
      const halfCarry: bool = ((getLowNibble(CPU.E) - 1) & 0x10) > 0 ? 1 : 0;
      CPU.setZeroFlag(value > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(1);
      CPU.E = value;
      return 4;
    }
    case 0xe: {
      // "LD E, n"
      CPU.E = Memory.readByteAtPc();
      return 8;
    }
    case 0xf: {
      // "RRA"
      const firstBit = getBitValue(CPU.A, 0);
      const shiftedValue = CPU.A >> 1;
      CPU.A = setBitValue(shiftedValue, 7, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(0);
      CPU.setCarryFlag(firstBit);
      return 4;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}

export function handle2xOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "JR NZ, e"
      const relativeOffset: i8 = <i8>Memory.readByteAtPc();
      const zeroFlag = CPU.getZeroFlag();
      if (zeroFlag == 0) {
        CPU.pc += relativeOffset;
        return 12;
      }
      return 8;
    }
    case 0x1: {
      // "LD HL, nn"
      CPU.L = Memory.readByteAtPc();
      CPU.H = Memory.readByteAtPc();
      return 12;
    }
    case 0x2: {
      // "LD (HL+), A"
      const hl = CPU.getHL();
      Memory.writeByte(hl, CPU.A);
      const hlInc = (hl + 1) & 0xffff;
      CPU.setHL(hlInc);
      return 8;
    }
    case 0x3: {
      // "INC HL"
      const value = (CPU.getHL() + 1) & 0xffff;
      CPU.setHL(value);
      return 8;
    }
    case 0x4: {
      // "INC H"
      const value = (CPU.H + 1) & 0xff;
      const halfCarry: bool = ((getLowNibble(CPU.H) + 1) & 0x10) > 0 ? 1 : 0;
      CPU.setZeroFlag(value > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(0);
      CPU.H = value;
      return 4;
    }
    case 0x5: {
      // "DEC H"
      const value = (CPU.H - 1) & 0xff;
      const halfCarry: bool = ((getLowNibble(CPU.H) - 1) & 0x10) > 0 ? 1 : 0;
      CPU.setZeroFlag(value > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(1);
      CPU.H = value;
      return 4;
    }
    case 0x6: {
      // "LD H, n"
      CPU.H = Memory.readByteAtPc();
      return 8;
    }
    case 0x7: {
      // "DAA"
      const carryFlag = CPU.getCarryFlag();
      const halfCarryFlag = CPU.getHalfCarryFlag();
      const negativeFlag = CPU.getNegativeFlag();
      let value = CPU.A;
      let correction = 0;
      if (halfCarryFlag || (!negativeFlag && (value & 0xf) > 9)) {
        correction |= 0x6;
      }
      if (carryFlag || (!negativeFlag && value > 0x99)) {
        correction |= 0x60;
        CPU.setCarryFlag(1);
      }
      if (negativeFlag) value = value - <u8>correction;
      else value = value + <u8>correction;
      CPU.setZeroFlag(value == 0 ? 1 : 0);
      CPU.setHalfCarryFlag(0);
      CPU.A = value & 0xff;
      return 4;
    }
    case 0x8: {
      // "JR Z, e"
      const relativeOffset: i8 = <i8>Memory.readByteAtPc();
      const zeroFlag = CPU.getZeroFlag();
      if (zeroFlag == 1) {
        CPU.pc += relativeOffset;
        return 12;
      }
      return 8;
    }
    case 0x9: {
      // "ADD HL, HL"
      const hl = CPU.getHL();
      const result: u32 = <u32>hl + <u32>hl;
      const halfCarry: bool =
        (((hl & 0xfff) + (hl & 0xfff)) & 0x1000) > 0 ? 1 : 0;
      CPU.setCarryFlag(result > 0xffff ? 1 : 0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(0);
      CPU.setHL(<u16>(result & 0xffff));
      return 8;
    }
    case 0xa: {
      // "LD A, (HL+)"
      const hl = CPU.getHL();
      CPU.A = Memory.readByte(hl);
      const hlInc = (hl + 1) & 0xffff;
      CPU.setHL(hlInc);
      return 8;
    }
    case 0xb: {
      // "DEC HL"
      const value = (CPU.getHL() - 1) & 0xffff;
      CPU.setHL(value);
      return 8;
    }
    case 0xc: {
      // "INC L"
      const value = (CPU.L + 1) & 0xff;
      const halfCarry: bool = ((getLowNibble(CPU.L) + 1) & 0x10) > 0 ? 1 : 0;
      CPU.setZeroFlag(value > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(0);
      CPU.L = value;
      return 4;
    }
    case 0xd: {
      // "DEC L"
      const value = (CPU.L - 1) & 0xff;
      const halfCarry: bool = ((getLowNibble(CPU.L) - 1) & 0x10) > 0 ? 1 : 0;
      CPU.setZeroFlag(value > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(1);
      CPU.L = value;
      return 4;
    }
    case 0xe: {
      // "LD L, n"
      CPU.L = Memory.readByteAtPc();
      return 8;
    }
    case 0xf: {
      // "CPL"
      CPU.A = CPU.A ^ 0xff;
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(1);
      return 4;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}

export function handle3xOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "JR NC, e"
      const relativeOffset: i8 = <i8>Memory.readByteAtPc();
      const carryFlag = CPU.getCarryFlag();
      if (carryFlag == 0) {
        CPU.pc += relativeOffset;
        return 12;
      }
      return 8;
    }
    case 0x1: {
      // "LD SP, nn"
      const lowByte = Memory.readByteAtPc();
      const highByte = Memory.readByteAtPc();
      const nn = combineBytes(highByte, lowByte);
      CPU.sp = nn;
      return 12;
    }
    case 0x2: {
      // "LD (HL-), A"
      const hl = CPU.getHL();
      Memory.writeByte(hl, CPU.A);
      const hlDec = (hl - 1) & 0xffff;
      CPU.setHL(hlDec);
      return 8;
    }
    case 0x3: {
      // "INC SP"
      const spInc = (CPU.sp + 1) & 0xffff;
      CPU.sp = spInc;
      return 8;
    }
    case 0x4: {
      // "INC (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const valueInc = (value + 1) & 0xff;
      const halfCarry: bool = ((getLowNibble(value) + 1) & 0x10) > 0 ? 1 : 0;
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(valueInc > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      Memory.writeByte(hl, valueInc);
      return 12;
    }
    case 0x5: {
      // "DEC (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const valueDec = (value - 1) & 0xff;
      const halfCarry: bool = ((getLowNibble(value) - 1) & 0x10) > 0 ? 1 : 0;
      CPU.setNegativeFlag(1);
      CPU.setZeroFlag(valueDec > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      Memory.writeByte(hl, valueDec);
      return 12;
    }
    case 0x6: {
      // "LD (HL), n"
      const n = Memory.readByteAtPc();
      const hlAddress = CPU.getHL();
      Memory.writeByte(hlAddress, n);
      return 12;
    }
    case 0x7: {
      // "SCF"
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setCarryFlag(1);
      return 4;
    }
    case 0x8: {
      // "JR C, e"
      const relativeOffset: i8 = <i8>Memory.readByteAtPc();
      const carryFlag = CPU.getCarryFlag();
      if (carryFlag) {
        CPU.pc += relativeOffset;
        return 12;
      }
      return 8;
    }
    case 0x9: {
      // "ADD HL, SP"
      const hl = CPU.getHL();
      const result: u32 = <u32>hl + <u32>CPU.sp;
      const halfCarry: bool =
        (((hl & 0xfff) + (CPU.sp & 0xfff)) & 0x1000) > 0 ? 1 : 0;
      CPU.setCarryFlag(result > 0xffff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setHL(<u16>(result & 0xffff));
      return 8;
    }
    case 0xa: {
      // "LD A, (HL-)"
      const hl = CPU.getHL();
      CPU.A = Memory.readByte(hl);
      const hlDec = (hl - 1) & 0xffff;
      CPU.setHL(hlDec);
      return 8;
    }
    case 0xb: {
      // "DEC SP"
      const spDec = (CPU.sp - 1) & 0xffff;
      CPU.sp = spDec;
      return 8;
    }
    case 0xc: {
      // "INC A"
      const value = (CPU.A + 1) & 0xff;
      const halfCarry: bool = ((getLowNibble(CPU.A) + 1) & 0x10) > 0 ? 1 : 0;
      CPU.setZeroFlag(value > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(0);
      CPU.A = value;
      return 4;
    }
    case 0xd: {
      // "DEC A"
      const value = (CPU.A - 1) & 0xff;
      const halfCarry: bool = ((getLowNibble(CPU.A) - 1) & 0x10) > 0 ? 1 : 0;
      CPU.setZeroFlag(value > 0 ? 0 : 1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(1);
      CPU.A = value;
      return 4;
    }
    case 0xe: {
      // "LD A, n"
      CPU.A = Memory.readByteAtPc();
      return 8;
    }
    case 0xf: {
      // "CCF"
      const carryFlag: u8 = <u8>CPU.getCarryFlag();
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setCarryFlag(<bool>(carryFlag ^ 1));
      return 4;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}

export function handle4xOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "LD B, B"
      CPU.B = CPU.B;
      return 4;
    }
    case 0x1: {
      // "LD B, C"
      CPU.B = CPU.C;
      return 4;
    }
    case 0x2: {
      // "LD B, D"
      CPU.B = CPU.D;
      return 4;
    }
    case 0x3: {
      // "LD B, E"
      CPU.B = CPU.E;
      return 4;
    }
    case 0x4: {
      // "LD B, H"
      CPU.B = CPU.H;
      return 4;
    }
    case 0x5: {
      // "LD B, L"
      CPU.B = CPU.L;
      return 4;
    }
    case 0x6: {
      // "LD B, (HL)"
      const hl = CPU.getHL();
      CPU.B = Memory.readByte(hl);
      return 8;
    }
    case 0x7: {
      // "LD B, A"
      CPU.B = CPU.A;
      return 4;
    }
    case 0x8: {
      // "LD C, B"
      CPU.C = CPU.B;
      return 4;
    }
    case 0x9: {
      // "LD C, C"
      CPU.C = CPU.C;
      return 4;
    }
    case 0xa: {
      // "LD C, D"
      CPU.C = CPU.D;
      return 4;
    }
    case 0xb: {
      // "LD C, E"
      CPU.C = CPU.E;
      return 4;
    }
    case 0xc: {
      // "LD C, H"
      CPU.C = CPU.H;
      return 4;
    }
    case 0xd: {
      // "LD C, L"
      CPU.C = CPU.L;
      return 4;
    }
    case 0xe: {
      // "LD C, (HL)"
      const hl = CPU.getHL();
      CPU.C = Memory.readByte(hl);
      return 8;
    }
    case 0xf: {
      // "LD C, A"
      CPU.C = CPU.A;
      return 4;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}

export function handle5xOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "LD D, B"
      CPU.D = CPU.B;
      return 4;
    }
    case 0x1: {
      // "LD D, C"
      CPU.D = CPU.C;
      return 4;
    }
    case 0x2: {
      // "LD D, D"
      CPU.D = CPU.D;
      return 4;
    }
    case 0x3: {
      // "LD D, E"
      CPU.D = CPU.E;
      return 4;
    }
    case 0x4: {
      // "LD D, H"
      CPU.D = CPU.H;
      return 4;
    }
    case 0x5: {
      // "LD D, L"
      CPU.D = CPU.L;
      return 4;
    }
    case 0x6: {
      // "LD D, (HL)"
      const hl = CPU.getHL();
      CPU.D = Memory.readByte(hl);
      return 8;
    }
    case 0x7: {
      // "LD D, A"
      CPU.D = CPU.A;
      return 4;
    }
    case 0x8: {
      // "LD E, B"
      CPU.E = CPU.B;
      return 4;
    }
    case 0x9: {
      // "LD E, C"
      CPU.E = CPU.C;
      return 4;
    }
    case 0xa: {
      // "LD E, D"
      CPU.E = CPU.D;
      return 4;
    }
    case 0xb: {
      // "LD E, E"
      CPU.E = CPU.E;
      return 4;
    }
    case 0xc: {
      // "LD E, H"
      CPU.E = CPU.H;
      return 4;
    }
    case 0xd: {
      // "LD E, L"
      CPU.E = CPU.L;
      return 4;
    }
    case 0xe: {
      // "LD E, (HL)"
      const hl = CPU.getHL();
      CPU.E = Memory.readByte(hl);
      return 8;
    }
    case 0xf: {
      // "LD E, A"
      CPU.E = CPU.A;
      return 4;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}

export function handle6xOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "LD H, B"
      CPU.H = CPU.B;
      return 4;
    }
    case 0x1: {
      // "LD H, C"
      CPU.H = CPU.C;
      return 4;
    }
    case 0x2: {
      // "LD H, D"
      CPU.H = CPU.D;
      return 4;
    }
    case 0x3: {
      // "LD H, E"
      CPU.H = CPU.E;
      return 4;
    }
    case 0x4: {
      // "LD H, H"
      CPU.H = CPU.H;
      return 4;
    }
    case 0x5: {
      // "LD H, L"
      CPU.H = CPU.L;
      return 4;
    }
    case 0x6: {
      // "LD H, (HL)"
      const hl = CPU.getHL();
      CPU.H = Memory.readByte(hl);
      return 8;
    }
    case 0x7: {
      // "LD H, A"
      CPU.H = CPU.A;
      return 4;
    }
    case 0x8: {
      // "LD L, B"
      CPU.L = CPU.B;
      return 4;
    }
    case 0x9: {
      // "LD L, C"
      CPU.L = CPU.C;
      return 4;
    }
    case 0xa: {
      // "LD L, D"
      CPU.L = CPU.D;
      return 4;
    }
    case 0xb: {
      // "LD L, E"
      CPU.L = CPU.E;
      return 4;
    }
    case 0xc: {
      // "LD L, H"
      CPU.L = CPU.H;
      return 4;
    }
    case 0xd: {
      // "LD L, L"
      CPU.L = CPU.L;
      return 4;
    }
    case 0xe: {
      // "LD L, (HL)"
      const hl = CPU.getHL();
      CPU.L = Memory.readByte(hl);
      return 8;
    }
    case 0xf: {
      // "LD L, A"
      CPU.L = CPU.A;
      return 4;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}

export function handle7xOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "LD (HL), B"
      const hl = CPU.getHL();
      Memory.writeByte(hl, CPU.B);
      return 8;
    }
    case 0x1: {
      // "LD (HL), C"
      const hl = CPU.getHL();
      Memory.writeByte(hl, CPU.C);
      return 8;
    }
    case 0x2: {
      // "LD (HL), D"
      const hl = CPU.getHL();
      Memory.writeByte(hl, CPU.D);
      return 8;
    }
    case 0x3: {
      // "LD (HL), E"
      const hl = CPU.getHL();
      Memory.writeByte(hl, CPU.E);
      return 8;
    }
    case 0x4: {
      // "LD (HL), H"
      const hl = CPU.getHL();
      Memory.writeByte(hl, CPU.H);
      return 8;
    }
    case 0x5: {
      // "LD (HL), L"
      const hl = CPU.getHL();
      Memory.writeByte(hl, CPU.L);
      return 8;
    }
    case 0x6: {
      // "HALT"
      CPU.isHalted = true;
      return 4;
    }
    case 0x7: {
      // "LD (HL), A"
      const hl = CPU.getHL();
      Memory.writeByte(hl, CPU.A);
      return 8;
    }
    case 0x8: {
      // "LD A, B"
      CPU.A = CPU.B;
      return 4;
    }
    case 0x9: {
      // "LD A, C"
      CPU.A = CPU.C;
      return 4;
    }
    case 0xa: {
      // "LD A, D"
      CPU.A = CPU.D;
      return 4;
    }
    case 0xb: {
      // "LD A, E"
      CPU.A = CPU.E;
      return 4;
    }
    case 0xc: {
      // "LD A, H"
      CPU.A = CPU.H;
      return 8;
    }
    case 0xd: {
      // "LD A, L"
      CPU.A = CPU.L;
      return 4;
    }
    case 0xe: {
      // "LD A, (HL)"
      const hl = CPU.getHL();
      CPU.A = Memory.readByte(hl);
      return 8;
    }
    case 0xf: {
      // "LD A, A"
      CPU.A = CPU.A;
      return 8;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}

export function handle8xOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "ADD A, B"
      const result: u16 = <u16>CPU.A + <u16>CPU.B;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(CPU.B)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) == 0 ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.A = <u8>(result & 0xff);
      return 4;
    }
    case 0x1: {
      // "ADD A, C"
      const result: u16 = <u16>CPU.A + <u16>CPU.C;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(CPU.C)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 4;
    }
    case 0x2: {
      // "ADD A, D"
      const result: u16 = <u16>CPU.A + <u16>CPU.D;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(CPU.D)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 4;
    }
    case 0x3: {
      // "ADD A, E"
      const result: u16 = <u16>CPU.A + <u16>CPU.E;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(CPU.E)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 4;
    }
    case 0x4: {
      // "ADD A, H"
      const result: u16 = <u16>CPU.A + <u16>CPU.H;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(CPU.H)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 4;
    }
    case 0x5: {
      // "ADD A, L"
      const result: u16 = <u16>CPU.A + <u16>CPU.L;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(CPU.L)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 4;
    }
    case 0x6: {
      // "ADD A, (HL)"
      const hl = CPU.getHL();
      const hlValue = Memory.readByte(hl);
      const result: u16 = <u16>CPU.A + <u16>hlValue;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(hlValue)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 8;
    }
    case 0x7: {
      // "ADD A, A"
      const result: u16 = <u16>CPU.A + <u16>CPU.A;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(CPU.A)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 4;
    }
    case 0x8: {
      // "ADC A, B"
      const carry = <u8>CPU.getCarryFlag();
      const result: u16 = <u16>CPU.A + <u16>CPU.B + <u16>carry;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(CPU.B) + carry) & 0x10) > 0
          ? 1
          : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 4;
    }
    case 0x9: {
      // "ADC A, C"
      const carry = <u8>CPU.getCarryFlag();
      const result: u16 = <u16>CPU.A + <u16>CPU.C + <u16>carry;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(CPU.C) + carry) & 0x10) > 0
          ? 1
          : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 4;
    }
    case 0xa: {
      // "ADC A, D"
      const carry = <u8>CPU.getCarryFlag();
      const result: u16 = <u16>CPU.A + <u16>CPU.D + <u16>carry;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(CPU.D) + carry) & 0x10) > 0
          ? 1
          : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 4;
    }
    case 0xb: {
      // "ADC A, E"
      const carry = <u8>CPU.getCarryFlag();
      const result: u16 = <u16>CPU.A + <u16>CPU.E + <u16>carry;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(CPU.E) + carry) & 0x10) > 0
          ? 1
          : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 4;
    }
    case 0xc: {
      // "ADC A, H"
      const carry = <u8>CPU.getCarryFlag();
      const result: u16 = <u16>CPU.A + <u16>CPU.H + <u16>carry;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(CPU.H) + carry) & 0x10) > 0
          ? 1
          : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 4;
    }
    case 0xd: {
      // "ADC A, L"
      const carry = <u8>CPU.getCarryFlag();
      const result: u16 = <u16>CPU.A + <u16>CPU.L + <u16>carry;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(CPU.L) + carry) & 0x10) > 0
          ? 1
          : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 4;
    }
    case 0xe: {
      // "ADC A, (HL)"
      const carry = <u8>CPU.getCarryFlag();
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const result = <u16>CPU.A + <u16>value + <u16>carry;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(value) + carry) & 0x10) > 0
          ? 1
          : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 8;
    }
    case 0xf: {
      // "ADC A, A"
      const carry = <u8>CPU.getCarryFlag();
      const result = <u16>CPU.A + <u16>CPU.A + <u16>carry;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(CPU.A) + carry) & 0x10) > 0
          ? 1
          : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 4;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}

export function handle9xOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "SUB A, B"
      const result = CPU.A - CPU.B;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(CPU.B)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(CPU.B > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result & 0xff;
      return 4;
    }
    case 0x1: {
      // "SUB A, C"
      const result = CPU.A - CPU.C;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(CPU.C)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(CPU.C > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result & 0xff;
      return 4;
    }
    case 0x2: {
      // "SUB A, D"
      const result = CPU.A - CPU.D;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(CPU.D)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(CPU.D > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result & 0xff;
      return 4;
    }
    case 0x3: {
      // "SUB A, E"
      const result = CPU.A - CPU.E;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(CPU.E)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(CPU.E > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result & 0xff;
      return 4;
    }
    case 0x4: {
      // "SUB A, H"
      const result = CPU.A - CPU.H;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(CPU.H)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(CPU.H > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result & 0xff;
      return 4;
    }
    case 0x5: {
      // "SUB A, L"
      const result = CPU.A - CPU.L;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(CPU.L)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(CPU.L > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result & 0xff;
      return 4;
    }
    case 0x6: {
      // "SUB A, (HL)"
      const hl = CPU.getHL();
      const hlValue = Memory.readByte(hl);
      const result = CPU.A - hlValue;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(hlValue)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(hlValue > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result & 0xff;
      return 8;
    }
    case 0x7: {
      // "SUB A, A"
      const result = CPU.A - CPU.A;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(CPU.A)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(CPU.A > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result & 0xff;
      return 4;
    }
    case 0x8: {
      // "SBC A, B"
      const carry = <u8>CPU.getCarryFlag();
      const result = CPU.A - CPU.B - carry;
      const halfCarry = (CPU.A ^ CPU.B ^ result) & 0x10;
      const overflowedResult =
        <u16>CPU.A - <u16>CPU.B - <u16>CPU.getCarryFlag();
      CPU.setHalfCarryFlag(halfCarry != 0);
      CPU.setCarryFlag((overflowedResult & 0x100) > 0);
      CPU.setZeroFlag(result == 0);
      CPU.setNegativeFlag(1);
      CPU.A = result & 0xff;
      return 4;
    }
    case 0x9: {
      // "SBC A, C"
      const carry = <u8>CPU.getCarryFlag();
      const result = CPU.A - CPU.C - carry;
      const halfCarry = (CPU.A ^ CPU.C ^ result) & 0x10;
      const overflowedResult =
        <u16>CPU.A - <u16>CPU.C - <u16>CPU.getCarryFlag();
      CPU.setHalfCarryFlag(halfCarry != 0);
      CPU.setCarryFlag((overflowedResult & 0x100) > 0);
      CPU.setZeroFlag(result == 0);
      CPU.setNegativeFlag(1);
      CPU.A = result & 0xff;
      return 4;
    }
    case 0xa: {
      // "SBC A, D"
      const carry = <u8>CPU.getCarryFlag();
      const result = CPU.A - CPU.D - carry;
      const halfCarry = (CPU.A ^ CPU.D ^ result) & 0x10;
      const overflowedResult =
        <u16>CPU.A - <u16>CPU.D - <u16>CPU.getCarryFlag();
      CPU.setHalfCarryFlag(halfCarry != 0);
      CPU.setCarryFlag((overflowedResult & 0x100) > 0);
      CPU.setZeroFlag(result == 0);
      CPU.setNegativeFlag(1);
      CPU.A = result & 0xff;
      return 4;
    }
    case 0xb: {
      // "SBC A, E"
      const carry = <u8>CPU.getCarryFlag();
      const result = CPU.A - CPU.E - carry;
      const halfCarry = (CPU.A ^ CPU.E ^ result) & 0x10;
      const overflowedResult =
        <u16>CPU.A - <u16>CPU.E - <u16>CPU.getCarryFlag();
      CPU.setHalfCarryFlag(halfCarry != 0);
      CPU.setCarryFlag((overflowedResult & 0x100) > 0);
      CPU.setZeroFlag(result == 0);
      CPU.setNegativeFlag(1);
      CPU.A = result & 0xff;
      return 4;
    }
    case 0xc: {
      // "SBC A, H"
      const carry = <u8>CPU.getCarryFlag();
      const result = CPU.A - CPU.H - carry;
      const halfCarry = (CPU.A ^ CPU.H ^ result) & 0x10;
      const overflowedResult =
        <u16>CPU.A - <u16>CPU.H - <u16>CPU.getCarryFlag();
      CPU.setHalfCarryFlag(halfCarry != 0);
      CPU.setCarryFlag((overflowedResult & 0x100) > 0);
      CPU.setZeroFlag(result == 0);
      CPU.setNegativeFlag(1);
      CPU.A = result & 0xff;
      return 4;
    }
    case 0xd: {
      // "SBC A, L"
      const carry = <u8>CPU.getCarryFlag();
      const result = CPU.A - CPU.L - carry;
      const halfCarry = (CPU.A ^ CPU.L ^ result) & 0x10;
      const overflowedResult =
        <u16>CPU.A - <u16>CPU.L - <u16>CPU.getCarryFlag();
      CPU.setHalfCarryFlag(halfCarry != 0);
      CPU.setCarryFlag((overflowedResult & 0x100) > 0);
      CPU.setZeroFlag(result == 0);
      CPU.setNegativeFlag(1);
      CPU.A = result & 0xff;
      return 4;
    }
    case 0xe: {
      // "SBC A, (HL)"
      const carry = <u8>CPU.getCarryFlag();
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const result = CPU.A - value - carry;
      const halfCarry = (CPU.A ^ value ^ result) & 0x10;
      const overflowedResult =
        <u16>CPU.A - <u16>value - <u16>CPU.getCarryFlag();
      CPU.setHalfCarryFlag(halfCarry != 0);
      CPU.setCarryFlag((overflowedResult & 0x100) > 0);
      CPU.setZeroFlag(result == 0);
      CPU.setNegativeFlag(1);
      CPU.A = result & 0xff;
      return 8;
    }
    case 0xf: {
      // "SBC A, A"
      const carry = <u8>CPU.getCarryFlag();
      const result = CPU.A - CPU.A - carry;
      const halfCarry = (CPU.A ^ CPU.A ^ result) & 0x10;
      const overflowedResult =
        <u16>CPU.A - <u16>CPU.A - <u16>CPU.getCarryFlag();
      CPU.setHalfCarryFlag(halfCarry != 0);
      CPU.setCarryFlag((overflowedResult & 0x100) > 0);
      CPU.setZeroFlag(result == 0);
      CPU.setNegativeFlag(1);
      CPU.A = result & 0xff;
      return 4;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}

export function handleAxOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "AND A, B"
      const result = CPU.A & CPU.B;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(1);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0x1: {
      // "AND A, C"
      const result = CPU.A & CPU.C;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(1);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0x2: {
      // "AND A, D"
      const result = CPU.A & CPU.D;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(1);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0x3: {
      // "AND A, E"
      const result = CPU.A & CPU.E;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(1);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0x4: {
      // "AND A, H"
      const result = CPU.A & CPU.H;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(1);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0x5: {
      // "AND A, L"
      const result = CPU.A & CPU.L;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(1);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0x6: {
      // "AND A, (HL)"
      const hl = CPU.getHL();
      const hlValue = Memory.readByte(hl);
      const result = CPU.A & hlValue;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(1);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 8;
    }
    case 0x7: {
      // "AND A, A"
      const result = CPU.A & CPU.A;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(1);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0x8: {
      // "XOR A, B"
      const result = CPU.A ^ CPU.B;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0x9: {
      // "XOR A, C"
      const result = CPU.A ^ CPU.C;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0xa: {
      // "XOR A, D"
      const result = CPU.A ^ CPU.D;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0xb: {
      // "XOR A, E"
      const result = CPU.A ^ CPU.E;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0xc: {
      // "XOR A, H"
      const result = CPU.A ^ CPU.H;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0xd: {
      // "XOR A, L"
      const result = CPU.A ^ CPU.L;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0xe: {
      // "XOR A, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const result = CPU.A ^ value;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 8;
    }
    case 0xf: {
      // "XOR A, A"
      const result = CPU.A ^ CPU.A;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}

export function handleBxOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "OR A, B"
      const result = CPU.A | CPU.B;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0x1: {
      // "OR A, C"
      const result = CPU.A | CPU.C;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0x2: {
      // "OR A, D"
      const result = CPU.A | CPU.D;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0x3: {
      // "OR A, E"
      const result = CPU.A | CPU.E;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0x4: {
      // "OR A, H"
      const result = CPU.A | CPU.H;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0x5: {
      // "OR A, L"
      const result = CPU.A | CPU.L;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0x6: {
      // "OR A, (HL)"
      const hl = CPU.getHL();
      const hlValue = Memory.readByte(hl);
      const result = CPU.A | hlValue;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 8;
    }
    case 0x7: {
      // "OR A, A"
      const result = CPU.A | CPU.A;
      CPU.setCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result;
      return 4;
    }
    case 0x8: {
      // "CP A, B"
      const result = CPU.A - CPU.B;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(CPU.B)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(CPU.B > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      return 4;
    }
    case 0x9: {
      // "CP A, C"
      const result = CPU.A - CPU.C;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(CPU.C)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(CPU.C > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      return 4;
    }
    case 0xa: {
      // "CP A, D"
      const result = CPU.A - CPU.D;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(CPU.D)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(CPU.D > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      return 4;
    }
    case 0xb: {
      // "CP A, E"
      const result = CPU.A - CPU.E;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(CPU.E)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(CPU.E > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      return 4;
    }
    case 0xc: {
      // "CP A, H"
      const result = CPU.A - CPU.H;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(CPU.H)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(CPU.H > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      return 4;
    }
    case 0xd: {
      // "CP A, L"
      const result = CPU.A - CPU.L;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(CPU.L)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(CPU.L > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      return 4;
    }
    case 0xe: {
      // "CP A, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const result = CPU.A - value;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(value)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(value > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      return 8;
    }
    case 0xf: {
      // "CP A, A"
      const result = CPU.A - CPU.A;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(CPU.A)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      return 4;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}

export function handleCxOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "RET NZ"
      const zeroFlag = CPU.getZeroFlag();
      if (zeroFlag == 0) {
        const lowByte = Memory.readByte(CPU.sp);
        const highByte = Memory.readByte(CPU.sp + 1);
        CPU.sp += 2;
        CPU.pc = combineBytes(highByte, lowByte);
        return 20;
      }
      return 8;
    }
    case 0x1: {
      // "POP BC"
      const lowByte = Memory.readByte(CPU.sp);
      const highByte = Memory.readByte(CPU.sp + 1);
      CPU.sp += 2;
      CPU.setBC(combineBytes(highByte, lowByte));
      return 12;
    }
    case 0x2: {
      // "JP NZ, nn"
      const zeroFlag = CPU.getZeroFlag();
      const lowByte = Memory.readByteAtPc();
      const highByte = Memory.readByteAtPc();
      const nn = combineBytes(highByte, lowByte);
      if (zeroFlag == 0) {
        CPU.pc = nn;
        return 16;
      }
      return 12;
    }
    case 0x3: {
      // "JP nn"
      const lowByte = Memory.readByteAtPc();
      const highByte = Memory.readByteAtPc();
      const nn = combineBytes(highByte, lowByte);
      // "NN", 1, nn
      CPU.pc = nn;
      return 16;
    }
    case 0x4: {
      // "CALL NZ, nn"
      const zeroFlag = CPU.getZeroFlag();
      const lowByte = Memory.readByteAtPc();
      const highByte = Memory.readByteAtPc();
      const nn = combineBytes(highByte, lowByte);
      if (zeroFlag == 0) {
        Memory.writeByte(CPU.sp - 1, getHighByte(CPU.pc));
        Memory.writeByte(CPU.sp - 2, getLowByte(CPU.pc));
        CPU.sp -= 2;
        CPU.pc = nn;
        return 24;
      }
      return 12;
    }
    case 0x5: {
      // "PUSH BC"
      Memory.writeByte(CPU.sp - 1, CPU.B);
      Memory.writeByte(CPU.sp - 2, CPU.C);
      CPU.sp -= 2;
      return 16;
    }
    case 0x6: {
      // "ADD A, n"
      const n = Memory.readByteAtPc();
      const result: u16 = <u16>CPU.A + <u16>n;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(n)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 8;
    }
    case 0x7: {
      // "RST 00h"
      Memory.writeByte(CPU.sp - 1, getHighByte(CPU.pc));
      Memory.writeByte(CPU.sp - 2, getLowByte(CPU.pc));
      CPU.sp -= 2;
      CPU.pc = 0x0;
      return 16;
    }
    case 0x8: {
      // "RET Z"
      const zeroFlag = CPU.getZeroFlag();
      if (zeroFlag == 1) {
        const lowByte = Memory.readByte(CPU.sp);
        const highByte = Memory.readByte(CPU.sp + 1);
        CPU.sp += 2;
        CPU.pc = combineBytes(highByte, lowByte);
        return 20;
      }
      return 8;
    }
    case 0x9: {
      // "RET"
      const lowByte = Memory.readByte(CPU.sp);
      const highByte = Memory.readByte(CPU.sp + 1);
      CPU.sp += 2;
      CPU.pc = combineBytes(highByte, lowByte);
      return 16;
    }
    case 0xa: {
      // "JP Z"
      const zeroFlag = CPU.getZeroFlag();
      const lowByte = Memory.readByteAtPc();
      const highByte = Memory.readByteAtPc();
      const nn = combineBytes(highByte, lowByte);
      if (zeroFlag == 1) {
        CPU.pc = nn;
        return 16;
      }
      return 12;
    }
    case 0xb: {
      // "PREFIX CB"
      const cbOpcode = Memory.readByteAtPc();
      return handleCBOpcode(cbOpcode);
    }
    case 0xc: {
      // "CALL Z, nn"
      const zeroFlag = CPU.getZeroFlag();
      const lowByte = Memory.readByteAtPc();
      const highByte = Memory.readByteAtPc();
      const nn = combineBytes(highByte, lowByte);
      if (zeroFlag == 1) {
        Memory.writeByte(CPU.sp - 1, getHighByte(CPU.pc));
        Memory.writeByte(CPU.sp - 2, getLowByte(CPU.pc));
        CPU.sp -= 2;
        CPU.pc = nn;
        return 24;
      }
      return 12;
    }
    case 0xd: {
      // "CALL nn"
      const lowByte = Memory.readByteAtPc();
      const highByte = Memory.readByteAtPc();
      const nn = combineBytes(highByte, lowByte);
      Memory.writeByte(CPU.sp - 1, getHighByte(CPU.pc));
      Memory.writeByte(CPU.sp - 2, getLowByte(CPU.pc));
      CPU.sp -= 2;
      CPU.pc = nn;
      return 24;
    }
    case 0xe: {
      // "ADC A, n"
      const carry: u16 = <u16>CPU.getCarryFlag();
      const n = Memory.readByteAtPc();
      const result: u16 = <u16>CPU.A + <u16>n + carry;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) + getLowNibble(n) + carry) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(result > 0xff ? 1 : 0);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = <u8>(result & 0xff);
      return 8;
    }
    case 0xf: {
      // "RST 08h"
      Memory.writeByte(CPU.sp - 1, getHighByte(CPU.pc));
      Memory.writeByte(CPU.sp - 2, getLowByte(CPU.pc));
      CPU.sp -= 2;
      CPU.pc = 0x08;
      return 16;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}

export function handleDxOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "RET NC"
      const carryFlag = CPU.getCarryFlag();
      if (carryFlag == 0) {
        const lowByte = Memory.readByte(CPU.sp);
        const highByte = Memory.readByte(CPU.sp + 1);
        CPU.sp += 2;
        CPU.pc = combineBytes(highByte, lowByte);
        return 20;
      }
      return 8;
    }
    case 0x1: {
      // "POP DE"
      const lowByte = Memory.readByte(CPU.sp);
      const highByte = Memory.readByte(CPU.sp + 1);
      CPU.sp += 2;
      CPU.setDE(combineBytes(highByte, lowByte));
      return 12;
    }
    case 0x2: {
      // "JP NC, nn"
      const carryFlag = CPU.getCarryFlag();
      const lowByte = Memory.readByteAtPc();
      const highByte = Memory.readByteAtPc();
      const nn = combineBytes(highByte, lowByte);
      if (carryFlag == 0) {
        CPU.pc = nn;
        return 16;
      }
      return 12;
    }
    case 0x4: {
      // "CALL NC, nn"
      const carryFlag = CPU.getCarryFlag();
      const lowByte = Memory.readByteAtPc();
      const highByte = Memory.readByteAtPc();
      const nn = combineBytes(highByte, lowByte);
      if (carryFlag == 0) {
        Memory.writeByte(CPU.sp - 1, getHighByte(CPU.pc));
        Memory.writeByte(CPU.sp - 2, getLowByte(CPU.pc));
        CPU.sp -= 2;
        CPU.pc = nn;
        return 24;
      }
      return 12;
    }
    case 0x5: {
      // "PUSH DE"
      Memory.writeByte(CPU.sp - 1, CPU.D);
      Memory.writeByte(CPU.sp - 2, CPU.E);
      CPU.sp -= 2;
      return 16;
    }
    case 0x6: {
      // "SUB A, n"
      const n = Memory.readByteAtPc();
      const result = CPU.A - n;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(n)) & 0x10) > 0 ? 1 : 0;
      CPU.setCarryFlag(n > CPU.A ? 1 : 0);
      CPU.setNegativeFlag(1);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.A = result & 0xff;
      return 8;
    }
    case 0x7: {
      // "RST 10h"
      Memory.writeByte(CPU.sp - 1, getHighByte(CPU.pc));
      Memory.writeByte(CPU.sp - 2, getLowByte(CPU.pc));
      CPU.sp -= 2;
      CPU.pc = 0x10;
      return 16;
    }
    case 0x8: {
      // "RET C"
      const carryFlag = CPU.getCarryFlag();
      if (carryFlag == 1) {
        const lowByte = Memory.readByte(CPU.sp);
        const highByte = Memory.readByte(CPU.sp + 1);
        CPU.sp += 2;
        CPU.pc = combineBytes(highByte, lowByte);
        return 20;
      }
      return 8;
    }
    case 0x9: {
      // "RETI"
      const lowByte = Memory.readByte(CPU.sp);
      const highByte = Memory.readByte(CPU.sp + 1);
      CPU.sp += 2;
      CPU.pc = combineBytes(highByte, lowByte);
      return 16;
    }
    case 0xa: {
      // "JP C"
      const carryFlag = CPU.getCarryFlag();
      const lowByte = Memory.readByteAtPc();
      const highByte = Memory.readByteAtPc();
      const nn = combineBytes(highByte, lowByte);
      if (carryFlag == 1) {
        CPU.pc = nn;
        return 16;
      }
      return 12;
    }
    case 0xc: {
      // "CALL C, nn"
      const carryFlag = CPU.getCarryFlag();
      const lowByte = Memory.readByteAtPc();
      const highByte = Memory.readByteAtPc();
      const nn = combineBytes(highByte, lowByte);
      if (carryFlag == 1) {
        Memory.writeByte(CPU.sp - 1, getHighByte(CPU.pc));
        Memory.writeByte(CPU.sp - 2, getLowByte(CPU.pc));
        CPU.sp -= 2;
        CPU.pc = nn;
        return 24;
      }
      return 12;
    }
    case 0xe: {
      // "SBC A, n"
      const carry = <u8>CPU.getCarryFlag();
      const n = Memory.readByteAtPc();
      const result = CPU.A - n - carry;
      const halfCarry = (CPU.A ^ n ^ result) & 0x10;
      const overflowedResult = <u16>CPU.A - <u16>n - <u16>CPU.getCarryFlag();
      CPU.setHalfCarryFlag(halfCarry != 0);
      CPU.setCarryFlag((overflowedResult & 0x100) > 0);
      CPU.setZeroFlag(result == 0);
      CPU.setNegativeFlag(1);
      CPU.A = result & 0xff;
      return 8;
    }
    case 0xf: {
      // "RST 18h"
      Memory.writeByte(CPU.sp - 1, getHighByte(CPU.pc));
      Memory.writeByte(CPU.sp - 2, getLowByte(CPU.pc));
      CPU.sp -= 2;
      CPU.pc = 0x18;
      return 16;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}

export function handleExOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "LD (FF00 + n), A"
      const n = Memory.readByteAtPc();
      const address = combineBytes(0xff, n);
      Memory.writeByte(address, CPU.A);
      return 12;
    }
    case 0x1: {
      // "POP HL"
      const lowByte = Memory.readByte(CPU.sp);
      const highByte = Memory.readByte(CPU.sp + 1);
      CPU.sp += 2;
      CPU.setHL(combineBytes(highByte, lowByte));
      return 12;
    }
    case 0x2: {
      // "LD (FF00 + C), A"
      const address = combineBytes(0xff, CPU.C);
      Memory.writeByte(address, CPU.A);
      return 8;
    }
    case 0x5: {
      // "PUSH HL"
      Memory.writeByte(CPU.sp - 1, CPU.H);
      Memory.writeByte(CPU.sp - 2, CPU.L);
      CPU.sp -= 2;
      return 16;
    }
    case 0x6: {
      // "AND A, n"
      const n = Memory.readByteAtPc();
      const result = CPU.A & n;
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.setNegativeFlag(0);
      CPU.setCarryFlag(0);
      CPU.setHalfCarryFlag(1);
      CPU.A = result;
      return 8;
    }
    case 0x7: {
      // "RST 20h"
      Memory.writeByte(CPU.sp - 1, getHighByte(CPU.pc));
      Memory.writeByte(CPU.sp - 2, getLowByte(CPU.pc));
      CPU.sp -= 2;
      CPU.pc = 0x20;
      return 16;
    }
    case 0x8: {
      // "ADD SP, n"
      const n = <i8>Memory.readByteAtPc();
      const result: u32 = <u32>CPU.sp + n;
      if (n >= 0) {
        const carry = (CPU.sp & 0xff) + n > 0xff;
        const halfCarry = (CPU.sp & 0xf) + (n & 0xf) > 0xf;
        CPU.setCarryFlag(carry);
        CPU.setHalfCarryFlag(halfCarry);
      } else {
        const carry = (result & 0xff) <= (CPU.sp & 0xff);
        const halfCarry = (result & 0xf) <= (CPU.sp & 0xf);
        CPU.setCarryFlag(carry);
        CPU.setHalfCarryFlag(halfCarry);
      }
      CPU.setZeroFlag(0);
      CPU.setNegativeFlag(0);
      CPU.sp = <u16>(result & 0xffff);
      return 16;
    }
    case 0x9: {
      // "JP HL"
      CPU.pc = CPU.getHL();
      return 4;
    }
    case 0xa: {
      // "LD (nn), A"
      const lowByte = Memory.readByteAtPc();
      const highByte = Memory.readByteAtPc();
      const nn = combineBytes(highByte, lowByte);
      Memory.writeByte(nn, CPU.A);
      return 16;
    }
    case 0xe: {
      // "XOR A, n"
      const n = Memory.readByteAtPc();
      const result = CPU.A ^ n;
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.A = result;
      return 8;
    }
    case 0xf: {
      // "RST 28h"
      Memory.writeByte(CPU.sp - 1, getHighByte(CPU.pc));
      Memory.writeByte(CPU.sp - 2, getLowByte(CPU.pc));
      CPU.sp -= 2;
      CPU.pc = 0x28;
      return 16;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}

export function handleFxOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "LD A, (FF00 + n)"
      const n = Memory.readByteAtPc();
      const address = combineBytes(0xff, n);
      CPU.A = Memory.readByte(address);
      return 12;
    }
    case 0x1: {
      // "POP AF"
      const lowByte = Memory.readByte(CPU.sp);
      const highByte = Memory.readByte(CPU.sp + 1);
      CPU.sp += 2;
      CPU.setAF(combineBytes(highByte, lowByte));
      return 12;
    }
    case 0x2: {
      // "LD A, (FF00 + C)"
      const address = combineBytes(0xff, CPU.C);
      CPU.A = Memory.readByte(address);
      return 8;
    }
    case 0x3: {
      // "DI"
      return 4;
    }
    case 0x5: {
      // "PUSH AF"
      Memory.writeByte(CPU.sp - 1, CPU.A);
      Memory.writeByte(CPU.sp - 2, CPU.F);
      CPU.sp -= 2;
      return 16;
    }
    case 0x6: {
      // "OR A, n"
      const n = Memory.readByteAtPc();
      const result = CPU.A | n;
      CPU.setZeroFlag((result & 0xff) > 0 ? 0 : 1);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setCarryFlag(0);
      CPU.A = result;
      return 8;
    }
    case 0x7: {
      // "RST 30h"
      Memory.writeByte(CPU.sp - 1, getHighByte(CPU.pc));
      Memory.writeByte(CPU.sp - 2, getLowByte(CPU.pc));
      CPU.sp -= 2;
      CPU.pc = 0x30;
      return 16;
    }
    case 0x8: {
      // "LD HL, SP + n"
      const n = <i8>Memory.readByteAtPc();
      const result: u32 = <u32>CPU.sp + n;
      if (n >= 0) {
        const carry = (CPU.sp & 0xff) + n > 0xff;
        const halfCarry = (CPU.sp & 0xf) + (n & 0xf) > 0xf;
        CPU.setCarryFlag(carry);
        CPU.setHalfCarryFlag(halfCarry);
      } else {
        const carry = (result & 0xff) <= (CPU.sp & 0xff);
        const halfCarry = (result & 0xf) <= (CPU.sp & 0xf);
        CPU.setCarryFlag(carry);
        CPU.setHalfCarryFlag(halfCarry);
      }
      CPU.setZeroFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setHL(<u16>(result & 0xffff));
      return 12;
    }
    case 0x9: {
      // "LD SP, HL"
      CPU.sp = CPU.getHL();
      return 8;
    }
    case 0xa: {
      // "LD A, (nn)"
      const lowByte = Memory.readByteAtPc();
      const highByte = Memory.readByteAtPc();
      const nn = combineBytes(highByte, lowByte);
      CPU.A = Memory.readByte(nn);
      return 16;
    }
    case 0xb: {
      // "EI"
      return 4;
    }
    case 0xe: {
      // "CP A, n"
      const n = Memory.readByteAtPc();
      const result = CPU.A - n;
      const halfCarry: bool =
        ((getLowNibble(CPU.A) - getLowNibble(n)) & 0x10) > 0 ? 1 : 0;
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(n > CPU.A ? 1 : 0);
      CPU.setHalfCarryFlag(halfCarry);
      CPU.setNegativeFlag(1);
      return 8;
    }
    case 0xf: {
      // "RST 38h"
      Memory.writeByte(CPU.sp - 1, getHighByte(CPU.pc));
      Memory.writeByte(CPU.sp - 2, getLowByte(CPU.pc));
      CPU.sp -= 2;
      CPU.pc = 0x38;
      return 16;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}
