import CPU from ".";
import Memory from "../memory";
import {
  getLowNibble,
  getBitValue,
  setBitValue,
  getHighNibble,
  combineNibbles,
} from "../../utils/bit-operations";

export default function handleCBOpcode(opcode: u8): i32 {
  switch (opcode) {
    case 0x0: {
      // "RLC B"
      const eighthBit = getBitValue(CPU.B, 7);
      const shiftedValue = CPU.B << 1;
      CPU.B = setBitValue(shiftedValue, 0, eighthBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.B > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 8;
    }
    case 0x1: {
      // "RLC C"
      const eighthBit = getBitValue(CPU.C, 7);
      const shiftedValue = CPU.C << 1;
      CPU.C = setBitValue(shiftedValue, 0, eighthBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.C > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 8;
    }
    case 0x2: {
      // "RLC D"
      const eighthBit = getBitValue(CPU.D, 7);
      const shiftedValue = CPU.D << 1;
      CPU.D = setBitValue(shiftedValue, 0, eighthBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.D > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 8;
    }
    case 0x3: {
      // "RLC E"
      const eighthBit = getBitValue(CPU.E, 7);
      const shiftedValue = CPU.E << 1;
      CPU.E = setBitValue(shiftedValue, 0, eighthBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.E > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 8;
    }
    case 0x4: {
      // "RLC H"
      const eighthBit = getBitValue(CPU.H, 7);
      const shiftedValue = CPU.H << 1;
      CPU.H = setBitValue(shiftedValue, 0, eighthBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.H > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 8;
    }
    case 0x5: {
      // "RLC L"
      const eighthBit = getBitValue(CPU.L, 7);
      const shiftedValue = CPU.L << 1;
      CPU.L = setBitValue(shiftedValue, 0, eighthBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.L > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 8;
    }
    case 0x6: {
      // "RLC (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const eighthBit = getBitValue(value, 7);
      let shiftedValue = value << 1;
      shiftedValue = setBitValue(shiftedValue, 0, eighthBit);
      Memory.writeByte(hl, shiftedValue);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(shiftedValue > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 16;
    }
    case 0x7: {
      // "RLC A"
      const eighthBit = getBitValue(CPU.A, 7);
      const shiftedValue = CPU.A << 1;
      CPU.A = setBitValue(shiftedValue, 0, eighthBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.A > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 8;
    }
    case 0x8: {
      // "RRC B"
      const firstBit = getBitValue(CPU.B, 0);
      const shiftedValue = CPU.B >> 1;
      CPU.B = setBitValue(shiftedValue, 7, firstBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.B > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 8;
    }
    case 0x9: {
      // "RRC C"
      const firstBit = getBitValue(CPU.C, 0);
      const shiftedValue = CPU.C >> 1;
      CPU.C = setBitValue(shiftedValue, 7, firstBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.C > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 8;
    }
    case 0xa: {
      // "RRC D"
      const firstBit = getBitValue(CPU.D, 0);
      const shiftedValue = CPU.D >> 1;
      CPU.D = setBitValue(shiftedValue, 7, firstBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.D > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 8;
    }
    case 0xb: {
      // "RRC E"
      const firstBit = getBitValue(CPU.E, 0);
      const shiftedValue = CPU.E >> 1;
      CPU.E = setBitValue(shiftedValue, 7, firstBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.E > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 8;
    }
    case 0xc: {
      // "RRC H"
      const firstBit = getBitValue(CPU.H, 0);
      const shiftedValue = CPU.H >> 1;
      CPU.H = setBitValue(shiftedValue, 7, firstBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.H > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 8;
    }
    case 0xd: {
      // "RRC L"
      const firstBit = getBitValue(CPU.L, 0);
      const shiftedValue = CPU.L >> 1;
      CPU.L = setBitValue(shiftedValue, 7, firstBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.L > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 8;
    }
    case 0xe: {
      // "RRC (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const firstBit = getBitValue(value, 0);
      let shiftedValue = value >> 1;
      shiftedValue = setBitValue(shiftedValue, 7, firstBit);
      Memory.writeByte(hl, shiftedValue);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(shiftedValue > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 16;
    }
    case 0xf: {
      // "RRC A"
      const firstBit = getBitValue(CPU.A, 0);
      const shiftedValue = CPU.A >> 1;
      CPU.A = setBitValue(shiftedValue, 7, firstBit);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.A > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 8;
    }
    case 0x10: {
      // "RL B"
      const eighthBit = getBitValue(CPU.B, 7);
      const shiftedValue = CPU.B << 1;
      CPU.B = setBitValue(shiftedValue, 0, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.B > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 8;
    }
    case 0x11: {
      // "RL C"
      const eighthBit = getBitValue(CPU.C, 7);
      const shiftedValue = CPU.C << 1;
      CPU.C = setBitValue(shiftedValue, 0, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.C > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 8;
    }
    case 0x12: {
      // "RL D"
      const eighthBit = getBitValue(CPU.D, 7);
      const shiftedValue = CPU.D << 1;
      CPU.D = setBitValue(shiftedValue, 0, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.D > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 8;
    }
    case 0x13: {
      // "RL E"
      const eighthBit = getBitValue(CPU.E, 7);
      const shiftedValue = CPU.E << 1;
      CPU.E = setBitValue(shiftedValue, 0, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.E > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 8;
    }
    case 0x14: {
      // "RL H"
      const eighthBit = getBitValue(CPU.H, 7);
      const shiftedValue = CPU.H << 1;
      CPU.H = setBitValue(shiftedValue, 0, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.H > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 8;
    }
    case 0x15: {
      // "RL L"
      const eighthBit = getBitValue(CPU.L, 7);
      const shiftedValue = CPU.L << 1;
      CPU.L = setBitValue(shiftedValue, 0, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.L > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 8;
    }
    case 0x16: {
      // "RL (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const eighthBit = getBitValue(value, 7);
      let shiftedValue = value << 1;
      shiftedValue = setBitValue(shiftedValue, 0, CPU.getCarryFlag());
      Memory.writeByte(hl, shiftedValue);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(shiftedValue > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 16;
    }
    case 0x17: {
      // "RL A"
      const eighthBit = getBitValue(CPU.A, 7);
      const shiftedValue = CPU.A << 1;
      CPU.A = setBitValue(shiftedValue, 0, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.A > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      return 8;
    }
    case 0x18: {
      // "RR B"
      const firstBit = getBitValue(CPU.B, 0);
      const shiftedValue = CPU.B >> 1;
      CPU.B = setBitValue(shiftedValue, 7, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.B > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 8;
    }
    case 0x19: {
      // "RR C"
      const firstBit = getBitValue(CPU.C, 0);
      const shiftedValue = CPU.C >> 1;
      CPU.C = setBitValue(shiftedValue, 7, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.C > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 8;
    }
    case 0x1a: {
      // "RR D"
      const firstBit = getBitValue(CPU.D, 0);
      const shiftedValue = CPU.D >> 1;
      CPU.D = setBitValue(shiftedValue, 7, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.D > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 8;
    }
    case 0x1b: {
      // "RR E"
      const firstBit = getBitValue(CPU.E, 0);
      const shiftedValue = CPU.E >> 1;
      CPU.E = setBitValue(shiftedValue, 7, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.E > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 8;
    }
    case 0x1c: {
      // "RR H"
      const firstBit = getBitValue(CPU.H, 0);
      const shiftedValue = CPU.H >> 1;
      CPU.H = setBitValue(shiftedValue, 7, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.H > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 8;
    }
    case 0x1d: {
      // "RR L"
      const firstBit = getBitValue(CPU.L, 0);
      const shiftedValue = CPU.L >> 1;
      CPU.L = setBitValue(shiftedValue, 7, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.L > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 8;
    }
    case 0x1e: {
      // "RR (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const firstBit = getBitValue(value, 0);
      let shiftedValue = value >> 1;
      shiftedValue = setBitValue(shiftedValue, 7, CPU.getCarryFlag());
      Memory.writeByte(hl, shiftedValue);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(shiftedValue > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 16;
    }
    case 0x1f: {
      // "RR A"
      const firstBit = getBitValue(CPU.A, 0);
      const shiftedValue = CPU.A >> 1;
      CPU.A = setBitValue(shiftedValue, 7, CPU.getCarryFlag());
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(CPU.A > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      return 8;
    }
    case 0x20: {
      // "SLA B"
      const eighthBit = getBitValue(CPU.B, 7);
      const result = CPU.B << 1;
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      CPU.B = result;
      return 8;
    }
    case 0x21: {
      // "SLA C"
      const eighthBit = getBitValue(CPU.C, 7);
      const result = CPU.C << 1;
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      CPU.C = result;
      return 8;
    }
    case 0x22: {
      // "SLA D"
      const eighthBit = getBitValue(CPU.D, 7);
      const result = CPU.D << 1;
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      CPU.D = result;
      return 8;
    }
    case 0x23: {
      // "SLA E"
      const eighthBit = getBitValue(CPU.E, 7);
      const result = CPU.E << 1;
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      CPU.E = result;
      return 8;
    }
    case 0x24: {
      // "SLA H"
      const eighthBit = getBitValue(CPU.H, 7);
      const result = CPU.H << 1;
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      CPU.H = result;
      return 8;
    }
    case 0x25: {
      // "SLA L"
      const eighthBit = getBitValue(CPU.L, 7);
      const result = CPU.L << 1;
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      CPU.L = result;
      return 8;
    }
    case 0x26: {
      // "SLA (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const eighthBit = getBitValue(value, 7);
      const result = value << 1;
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      Memory.writeByte(hl, result);
      return 16;
    }
    case 0x27: {
      // "SLA A"
      const eighthBit = getBitValue(CPU.A, 7);
      const result = CPU.A << 1;
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(eighthBit);
      CPU.A = result;
      return 8;
    }
    case 0x28: {
      // "SRA B"
      const eighthBit = getBitValue(CPU.B, 7);
      const firstBit = getBitValue(CPU.B, 0);
      let result = CPU.B >> 1;
      result = setBitValue(result, 7, eighthBit);
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      CPU.B = result;
      return 8;
    }
    case 0x29: {
      // "SRA C"
      const eighthBit = getBitValue(CPU.C, 7);
      const firstBit = getBitValue(CPU.C, 0);
      let result = CPU.C >> 1;
      result = setBitValue(result, 7, eighthBit);
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      CPU.C = result;
      return 8;
    }
    case 0x2a: {
      // "SRA D"
      const eighthBit = getBitValue(CPU.D, 7);
      const firstBit = getBitValue(CPU.D, 0);
      let result = CPU.D >> 1;
      result = setBitValue(result, 7, eighthBit);
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      CPU.D = result;
      return 8;
    }
    case 0x2b: {
      // "SRA E"
      const eighthBit = getBitValue(CPU.E, 7);
      const firstBit = getBitValue(CPU.E, 0);
      let result = CPU.E >> 1;
      result = setBitValue(result, 7, eighthBit);
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      CPU.E = result;
      return 8;
    }
    case 0x2c: {
      // "SRA H"
      const eighthBit = getBitValue(CPU.H, 7);
      const firstBit = getBitValue(CPU.H, 0);
      let result = CPU.H >> 1;
      result = setBitValue(result, 7, eighthBit);
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      CPU.H = result;
      return 8;
    }
    case 0x2d: {
      // "SRA L"
      const eighthBit = getBitValue(CPU.L, 7);
      const firstBit = getBitValue(CPU.L, 0);
      let result = CPU.L >> 1;
      result = setBitValue(result, 7, eighthBit);
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      CPU.L = result;
      return 8;
    }
    case 0x2e: {
      // "SRA (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const eighthBit = getBitValue(value, 7);
      const firstBit = getBitValue(value, 0);
      let result = value >> 1;
      result = setBitValue(result, 7, eighthBit);
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      Memory.writeByte(hl, result);
      return 16;
    }
    case 0x2f: {
      // "SRA A"
      const eighthBit = getBitValue(CPU.A, 7);
      const firstBit = getBitValue(CPU.A, 0);
      let result = CPU.A >> 1;
      result = setBitValue(result, 7, eighthBit);
      CPU.setHalfCarryFlag(0);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      CPU.A = result;
      return 8;
    }
    case 0x30: {
      // "SWAP B"
      const lowNibble = getLowNibble(CPU.B);
      const highNibble = getHighNibble(CPU.B);
      const swapped = combineNibbles(lowNibble, highNibble);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setCarryFlag(0);
      CPU.setZeroFlag(swapped > 0 ? 0 : 1);
      CPU.B = swapped;
      return 8;
    }
    case 0x31: {
      // "SWAP C"
      const lowNibble = getLowNibble(CPU.C);
      const highNibble = getHighNibble(CPU.C);
      const swapped = combineNibbles(lowNibble, highNibble);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setCarryFlag(0);
      CPU.setZeroFlag(swapped > 0 ? 0 : 1);
      CPU.C = swapped;
      return 8;
    }
    case 0x32: {
      // "SWAP D"
      const lowNibble = getLowNibble(CPU.D);
      const highNibble = getHighNibble(CPU.D);
      const swapped = combineNibbles(lowNibble, highNibble);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setCarryFlag(0);
      CPU.setZeroFlag(swapped > 0 ? 0 : 1);
      CPU.D = swapped;
      return 8;
    }
    case 0x33: {
      // "SWAP E"
      const lowNibble = getLowNibble(CPU.E);
      const highNibble = getHighNibble(CPU.E);
      const swapped = combineNibbles(lowNibble, highNibble);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setCarryFlag(0);
      CPU.setZeroFlag(swapped > 0 ? 0 : 1);
      CPU.E = swapped;
      return 8;
    }
    case 0x34: {
      // "SWAP H"
      const lowNibble = getLowNibble(CPU.H);
      const highNibble = getHighNibble(CPU.H);
      const swapped = combineNibbles(lowNibble, highNibble);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setCarryFlag(0);
      CPU.setZeroFlag(swapped > 0 ? 0 : 1);
      CPU.H = swapped;
      return 8;
    }
    case 0x35: {
      // "SWAP L"
      const lowNibble = getLowNibble(CPU.L);
      const highNibble = getHighNibble(CPU.L);
      const swapped = combineNibbles(lowNibble, highNibble);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setCarryFlag(0);
      CPU.setZeroFlag(swapped > 0 ? 0 : 1);
      CPU.L = swapped;
      return 8;
    }
    case 0x36: {
      // "SWAP (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const lowNibble = getLowNibble(value);
      const highNibble = getHighNibble(value);
      const swapped = combineNibbles(lowNibble, highNibble);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setCarryFlag(0);
      CPU.setZeroFlag(swapped > 0 ? 0 : 1);
      Memory.writeByte(hl, swapped);
      return 16;
    }
    case 0x37: {
      // "SWAP A"
      const lowNibble = getLowNibble(CPU.A);
      const highNibble = getHighNibble(CPU.A);
      const swapped = combineNibbles(lowNibble, highNibble);
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setCarryFlag(0);
      CPU.setZeroFlag(swapped > 0 ? 0 : 1);
      CPU.A = swapped;
      return 8;
    }
    case 0x38: {
      // "SRL B"
      const firstBit = getBitValue(CPU.B, 0);
      const result = CPU.B >> 1;
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      CPU.B = result;
      return 8;
    }
    case 0x39: {
      // "SRL C"
      const firstBit = getBitValue(CPU.C, 0);
      const result = CPU.C >> 1;
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      CPU.C = result;
      return 8;
    }
    case 0x3a: {
      // "SRL D"
      const firstBit = getBitValue(CPU.D, 0);
      const result = CPU.D >> 1;
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      CPU.D = result;
      return 8;
    }
    case 0x3b: {
      // "SRL E"
      const firstBit = getBitValue(CPU.E, 0);
      const result = CPU.E >> 1;
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      CPU.E = result;
      return 8;
    }
    case 0x3c: {
      // "SRL H"
      const firstBit = getBitValue(CPU.H, 0);
      const result = CPU.H >> 1;
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      CPU.H = result;
      return 8;
    }
    case 0x3d: {
      // "SRL L"
      const firstBit = getBitValue(CPU.L, 0);
      const result = CPU.L >> 1;
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      CPU.L = result;
      return 8;
    }
    case 0x3e: {
      // "SRL (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const firstBit = getBitValue(value, 0);
      const result = value >> 1;
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      Memory.writeByte(hl, result);
      return 16;
    }
    case 0x3f: {
      // "SRL A"
      const firstBit = getBitValue(CPU.A, 0);
      const result = CPU.A >> 1;
      CPU.setNegativeFlag(0);
      CPU.setHalfCarryFlag(0);
      CPU.setZeroFlag(result > 0 ? 0 : 1);
      CPU.setCarryFlag(firstBit);
      CPU.A = result;
      return 8;
    }
    case 0x40: {
      // "BIT 0, B"
      const bit = getBitValue(CPU.B, 0);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x41: {
      // "BIT 0, C"
      const bit = getBitValue(CPU.C, 0);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x42: {
      // "BIT 0, D"
      const bit = getBitValue(CPU.D, 0);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x43: {
      // "BIT 0, E"
      const bit = getBitValue(CPU.E, 0);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x44: {
      // "BIT 0, H"
      const bit = getBitValue(CPU.H, 0);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x45: {
      // "BIT 0, L"
      const bit = getBitValue(CPU.L, 0);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x46: {
      // "BIT 0, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const bit = getBitValue(value, 0);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 12;
    }
    case 0x47: {
      // "BIT 0, A"
      const bit = getBitValue(CPU.A, 0);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x48: {
      // "BIT 1, B"
      const bit = getBitValue(CPU.B, 1);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x49: {
      // "BIT 1, C"
      const bit = getBitValue(CPU.C, 1);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x4a: {
      // "BIT 1, D"
      const bit = getBitValue(CPU.D, 1);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x4b: {
      // "BIT 1, E"
      const bit = getBitValue(CPU.E, 1);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x4c: {
      // "BIT 1, H"
      const bit = getBitValue(CPU.H, 1);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x4d: {
      // "BIT 1, L"
      const bit = getBitValue(CPU.L, 1);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x4e: {
      // "BIT 1, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const bit = getBitValue(value, 1);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 12;
    }
    case 0x4f: {
      // "BIT 1, A"
      const bit = getBitValue(CPU.A, 1);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x50: {
      // "BIT 2, B"
      const bit = getBitValue(CPU.B, 2);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x51: {
      // "BIT 2, C"
      const bit = getBitValue(CPU.C, 2);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x52: {
      // "BIT 2, D"
      const bit = getBitValue(CPU.D, 2);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x53: {
      // "BIT 2, E"
      const bit = getBitValue(CPU.E, 2);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x54: {
      // "BIT 2, H"
      const bit = getBitValue(CPU.H, 2);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x55: {
      // "BIT 2, L"
      const bit = getBitValue(CPU.L, 2);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x56: {
      // "BIT 2, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const bit = getBitValue(value, 2);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 12;
    }
    case 0x57: {
      // "BIT 2, A"
      const bit = getBitValue(CPU.A, 2);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x58: {
      // "BIT 3, B"
      const bit = getBitValue(CPU.B, 3);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x59: {
      // "BIT 3, C"
      const bit = getBitValue(CPU.C, 3);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x5a: {
      // "BIT 3, D"
      const bit = getBitValue(CPU.D, 3);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x5b: {
      // "BIT 3, E"
      const bit = getBitValue(CPU.E, 3);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x5c: {
      // "BIT 3, H"
      const bit = getBitValue(CPU.H, 3);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x5d: {
      // "BIT 3, L"
      const bit = getBitValue(CPU.L, 3);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x5e: {
      // "BIT 3, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const bit = getBitValue(value, 3);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 12;
    }
    case 0x5f: {
      // "BIT 3, A"
      const bit = getBitValue(CPU.A, 3);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x60: {
      // "BIT 4, B"
      const bit = getBitValue(CPU.B, 4);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x61: {
      // "BIT 4, C"
      const bit = getBitValue(CPU.C, 4);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x62: {
      // "BIT 4, D"
      const bit = getBitValue(CPU.D, 4);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x63: {
      // "BIT 4, E"
      const bit = getBitValue(CPU.E, 4);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x64: {
      // "BIT 4, H"
      const bit = getBitValue(CPU.H, 4);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x65: {
      // "BIT 4, L"
      const bit = getBitValue(CPU.L, 4);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x66: {
      // "BIT 4, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const bit = getBitValue(value, 4);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 12;
    }
    case 0x67: {
      // "BIT 4, A"
      const bit = getBitValue(CPU.A, 4);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x68: {
      // "BIT 5, B"
      const bit = getBitValue(CPU.B, 5);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x69: {
      // "BIT 5, C"
      const bit = getBitValue(CPU.C, 5);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x6a: {
      // "BIT 5, D"
      const bit = getBitValue(CPU.D, 5);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x6b: {
      // "BIT 5, E"
      const bit = getBitValue(CPU.E, 5);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x6c: {
      // "BIT 5, H"
      const bit = getBitValue(CPU.H, 5);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x6d: {
      // "BIT 5, L"
      const bit = getBitValue(CPU.L, 5);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x6e: {
      // "BIT 5, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const bit = getBitValue(value, 5);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 12;
    }
    case 0x6f: {
      // "BIT 5, A"
      const bit = getBitValue(CPU.A, 5);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x70: {
      // "BIT 6, B"
      const bit = getBitValue(CPU.B, 6);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x71: {
      // "BIT 6, C"
      const bit = getBitValue(CPU.C, 6);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x72: {
      // "BIT 6, D"
      const bit = getBitValue(CPU.D, 6);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x73: {
      // "BIT 6, E"
      const bit = getBitValue(CPU.E, 6);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x74: {
      // "BIT 6, H"
      const bit = getBitValue(CPU.H, 6);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x75: {
      // "BIT 6, L"
      const bit = getBitValue(CPU.L, 6);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x76: {
      // "BIT 6, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const bit = getBitValue(value, 6);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 12;
    }
    case 0x77: {
      // "BIT 6, A"
      const bit = getBitValue(CPU.A, 6);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x78: {
      // "BIT 7, B"
      const bit = getBitValue(CPU.B, 7);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x79: {
      // "BIT 7, C"
      const bit = getBitValue(CPU.C, 7);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x7a: {
      // "BIT 7, D"
      const bit = getBitValue(CPU.D, 7);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x7b: {
      // "BIT 7, E"
      const bit = getBitValue(CPU.E, 7);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x7c: {
      // "BIT 7, H"
      const bit = getBitValue(CPU.H, 7);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x7d: {
      // "BIT 7, L"
      const bit = getBitValue(CPU.L, 7);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x7e: {
      // "BIT 7, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      const bit = getBitValue(value, 7);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 12;
    }
    case 0x7f: {
      // "BIT 7, A"
      const bit = getBitValue(CPU.A, 7);
      CPU.setHalfCarryFlag(1);
      CPU.setNegativeFlag(0);
      CPU.setZeroFlag(bit ? 0 : 1);
      return 8;
    }
    case 0x80: {
      // "RES 0, B"
      CPU.B = setBitValue(CPU.B, 0, 0);
      return 8;
    }
    case 0x81: {
      // "RES 0, C"
      CPU.C = setBitValue(CPU.C, 0, 0);
      return 8;
    }
    case 0x82: {
      // "RES 0, D"
      CPU.D = setBitValue(CPU.D, 0, 0);
      return 8;
    }
    case 0x83: {
      // "RES 0, E"
      CPU.E = setBitValue(CPU.E, 0, 0);
      return 8;
    }
    case 0x84: {
      // "RES 0, H"
      CPU.H = setBitValue(CPU.H, 0, 0);
      return 8;
    }
    case 0x85: {
      // "RES 0, L"
      CPU.L = setBitValue(CPU.L, 0, 0);
      return 8;
    }
    case 0x86: {
      // "RES 0, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 0, 0));
      return 16;
    }
    case 0x87: {
      // "RES 0, A"
      CPU.A = setBitValue(CPU.A, 0, 0);
      return 8;
    }
    case 0x88: {
      // "RES 1, B"
      CPU.B = setBitValue(CPU.B, 1, 0);
      return 8;
    }
    case 0x89: {
      // "RES 1, C"
      CPU.C = setBitValue(CPU.C, 1, 0);
      return 8;
    }
    case 0x8a: {
      // "RES 1, D"
      CPU.D = setBitValue(CPU.D, 1, 0);
      return 8;
    }
    case 0x8b: {
      // "RES 1, E"
      CPU.E = setBitValue(CPU.E, 1, 0);
      return 8;
    }
    case 0x8c: {
      // "RES 1, H"
      CPU.H = setBitValue(CPU.H, 1, 0);
      return 8;
    }
    case 0x8d: {
      // "RES 1, L"
      CPU.L = setBitValue(CPU.L, 1, 0);
      return 8;
    }
    case 0x8e: {
      // "RES 1, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 1, 0));
      return 16;
    }
    case 0x8f: {
      // "RES 1, A"
      CPU.A = setBitValue(CPU.A, 1, 0);
      return 8;
    }
    case 0x90: {
      // "RES 2, B"
      CPU.B = setBitValue(CPU.B, 2, 0);
      return 8;
    }
    case 0x91: {
      // "RES 2, C"
      CPU.C = setBitValue(CPU.C, 2, 0);
      return 8;
    }
    case 0x92: {
      // "RES 2, D"
      CPU.D = setBitValue(CPU.D, 2, 0);
      return 8;
    }
    case 0x93: {
      // "RES 2, E"
      CPU.E = setBitValue(CPU.E, 2, 0);
      return 8;
    }
    case 0x94: {
      // "RES 2, H"
      CPU.H = setBitValue(CPU.H, 2, 0);
      return 8;
    }
    case 0x95: {
      // "RES 2, L"
      CPU.L = setBitValue(CPU.L, 2, 0);
      return 8;
    }
    case 0x96: {
      // "RES 2, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 2, 0));
      return 16;
    }
    case 0x97: {
      // "RES 2, A"
      CPU.A = setBitValue(CPU.A, 2, 0);
      return 8;
    }
    case 0x98: {
      // "RES 3, B"
      CPU.B = setBitValue(CPU.B, 3, 0);
      return 8;
    }
    case 0x99: {
      // "RES 3, C"
      CPU.C = setBitValue(CPU.C, 3, 0);
      return 8;
    }
    case 0x9a: {
      // "RES 3, D"
      CPU.D = setBitValue(CPU.D, 3, 0);
      return 8;
    }
    case 0x9b: {
      // "RES 3, E"
      CPU.E = setBitValue(CPU.E, 3, 0);
      return 8;
    }
    case 0x9c: {
      // "RES 3, H"
      CPU.H = setBitValue(CPU.H, 3, 0);
      return 8;
    }
    case 0x9d: {
      // "RES 3, L"
      CPU.L = setBitValue(CPU.L, 3, 0);
      return 8;
    }
    case 0x9e: {
      // "RES 3, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 3, 0));
      return 16;
    }
    case 0x9f: {
      // "RES 3, A"
      CPU.A = setBitValue(CPU.A, 3, 0);
      return 8;
    }
    case 0xa0: {
      // "RES 4, B"
      CPU.B = setBitValue(CPU.B, 4, 0);
      return 8;
    }
    case 0xa1: {
      // "RES 4, C"
      CPU.C = setBitValue(CPU.C, 4, 0);
      return 8;
    }
    case 0xa2: {
      // "RES 4, D"
      CPU.D = setBitValue(CPU.D, 4, 0);
      return 8;
    }
    case 0xa3: {
      // "RES 4, E"
      CPU.E = setBitValue(CPU.E, 4, 0);
      return 8;
    }
    case 0xa4: {
      // "RES 4, H"
      CPU.H = setBitValue(CPU.H, 4, 0);
      return 8;
    }
    case 0xa5: {
      // "RES 4, L"
      CPU.L = setBitValue(CPU.L, 4, 0);
      return 8;
    }
    case 0xa6: {
      // "RES 4, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 4, 0));
      return 16;
    }
    case 0xa7: {
      // "RES 4, A"
      CPU.A = setBitValue(CPU.A, 4, 0);
      return 8;
    }
    case 0xa8: {
      // "RES 5, B"
      CPU.B = setBitValue(CPU.B, 5, 0);
      return 8;
    }
    case 0xa9: {
      // "RES 5, C"
      CPU.C = setBitValue(CPU.C, 5, 0);
      return 8;
    }
    case 0xaa: {
      // "RES 5, D"
      CPU.D = setBitValue(CPU.D, 5, 0);
      return 8;
    }
    case 0xab: {
      // "RES 5, E"
      CPU.E = setBitValue(CPU.E, 5, 0);
      return 8;
    }
    case 0xac: {
      // "RES 5, H"
      CPU.H = setBitValue(CPU.H, 5, 0);
      return 8;
    }
    case 0xad: {
      // "RES 5, L"
      CPU.L = setBitValue(CPU.L, 5, 0);
      return 8;
    }
    case 0xae: {
      // "RES 5, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 5, 0));
      return 16;
    }
    case 0xaf: {
      // "RES 5, A"
      CPU.A = setBitValue(CPU.A, 5, 0);
      return 8;
    }
    case 0xb0: {
      // "RES 6, B"
      CPU.B = setBitValue(CPU.B, 6, 0);
      return 8;
    }
    case 0xb1: {
      // "RES 6, C"
      CPU.C = setBitValue(CPU.C, 6, 0);
      return 8;
    }
    case 0xb2: {
      // "RES 6, D"
      CPU.D = setBitValue(CPU.D, 6, 0);
      return 8;
    }
    case 0xb3: {
      // "RES 6, E"
      CPU.E = setBitValue(CPU.E, 6, 0);
      return 8;
    }
    case 0xb4: {
      // "RES 6, H"
      CPU.H = setBitValue(CPU.H, 6, 0);
      return 8;
    }
    case 0xb5: {
      // "RES 6, L"
      CPU.L = setBitValue(CPU.L, 6, 0);
      return 8;
    }
    case 0xb6: {
      // "RES 6, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 6, 0));
      return 16;
    }
    case 0xb7: {
      // "RES 6, A"
      CPU.A = setBitValue(CPU.A, 6, 0);
      return 8;
    }
    case 0xb8: {
      // "RES 7, B"
      CPU.B = setBitValue(CPU.B, 7, 0);
      return 8;
    }
    case 0xb9: {
      // "RES 7, C"
      CPU.C = setBitValue(CPU.C, 7, 0);
      return 8;
    }
    case 0xba: {
      // "RES 7, D"
      CPU.D = setBitValue(CPU.D, 7, 0);
      return 8;
    }
    case 0xbb: {
      // "RES 7, E"
      CPU.E = setBitValue(CPU.E, 7, 0);
      return 8;
    }
    case 0xbc: {
      // "RES 7, H"
      CPU.H = setBitValue(CPU.H, 7, 0);
      return 8;
    }
    case 0xbd: {
      // "RES 7, L"
      CPU.L = setBitValue(CPU.L, 7, 0);
      return 8;
    }
    case 0xbe: {
      // "RES 7, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 7, 0));
      return 16;
    }
    case 0xbf: {
      // "RES 7, A"
      CPU.A = setBitValue(CPU.A, 7, 0);
      return 8;
    }
    case 0xc0: {
      // "SET 0, B"
      CPU.B = setBitValue(CPU.B, 0, 1);
      return 8;
    }
    case 0xc1: {
      // "SET 0, C"
      CPU.C = setBitValue(CPU.C, 0, 1);
      return 8;
    }
    case 0xc2: {
      // "SET 0, D"
      CPU.D = setBitValue(CPU.D, 0, 1);
      return 8;
    }
    case 0xc3: {
      // "SET 0, E"
      CPU.E = setBitValue(CPU.E, 0, 1);
      return 8;
    }
    case 0xc4: {
      // "SET 0, H"
      CPU.H = setBitValue(CPU.H, 0, 1);
      return 8;
    }
    case 0xc5: {
      // "SET 0, L"
      CPU.L = setBitValue(CPU.L, 0, 1);
      return 8;
    }
    case 0xc6: {
      // "SET 0, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 0, 1));
      return 16;
    }
    case 0xc7: {
      // "SET 0, A"
      CPU.A = setBitValue(CPU.A, 0, 1);
      return 8;
    }
    case 0xc8: {
      // "SET 1, B"
      CPU.B = setBitValue(CPU.B, 1, 1);
      return 8;
    }
    case 0xc9: {
      // "SET 1, C"
      CPU.C = setBitValue(CPU.C, 1, 1);
      return 8;
    }
    case 0xca: {
      // "SET 1, D"
      CPU.D = setBitValue(CPU.D, 1, 1);
      return 8;
    }
    case 0xcb: {
      // "SET 1, E"
      CPU.E = setBitValue(CPU.E, 1, 1);
      return 8;
    }
    case 0xcc: {
      // "SET 1, H"
      CPU.H = setBitValue(CPU.H, 1, 1);
      return 8;
    }
    case 0xcd: {
      // "SET 1, L"
      CPU.L = setBitValue(CPU.L, 1, 1);
      return 8;
    }
    case 0xce: {
      // "SET 1, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 1, 1));
      return 16;
    }
    case 0xcf: {
      // "SET 1, A"
      CPU.A = setBitValue(CPU.A, 1, 1);
      return 8;
    }
    case 0xd0: {
      // "SET 2, B"
      CPU.B = setBitValue(CPU.B, 2, 1);
      return 8;
    }
    case 0xd1: {
      // "SET 2, C"
      CPU.C = setBitValue(CPU.C, 2, 1);
      return 8;
    }
    case 0xd2: {
      // "SET 2, D"
      CPU.D = setBitValue(CPU.D, 2, 1);
      return 8;
    }
    case 0xd3: {
      // "SET 2, E"
      CPU.E = setBitValue(CPU.E, 2, 1);
      return 8;
    }
    case 0xd4: {
      // "SET 2, H"
      CPU.H = setBitValue(CPU.H, 2, 1);
      return 8;
    }
    case 0xd5: {
      // "SET 2, L"
      CPU.L = setBitValue(CPU.L, 2, 1);
      return 8;
    }
    case 0xd6: {
      // "SET 2, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 2, 1));
      return 16;
    }
    case 0xd7: {
      // "SET 2, A"
      CPU.A = setBitValue(CPU.A, 2, 1);
      return 8;
    }
    case 0xd8: {
      // "SET 3, B"
      CPU.B = setBitValue(CPU.B, 3, 1);
      return 8;
    }
    case 0xd9: {
      // "SET 3, C"
      CPU.C = setBitValue(CPU.C, 3, 1);
      return 8;
    }
    case 0xda: {
      // "SET 3, D"
      CPU.D = setBitValue(CPU.D, 3, 1);
      return 8;
    }
    case 0xdb: {
      // "SET 3, E"
      CPU.E = setBitValue(CPU.E, 3, 1);
      return 8;
    }
    case 0xdc: {
      // "SET 3, H"
      CPU.H = setBitValue(CPU.H, 3, 1);
      return 8;
    }
    case 0xdd: {
      // "SET 3, L"
      CPU.L = setBitValue(CPU.L, 3, 1);
      return 8;
    }
    case 0xde: {
      // "SET 3, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 3, 1));
      return 16;
    }
    case 0xdf: {
      // "SET 3, A"
      CPU.A = setBitValue(CPU.A, 3, 1);
      return 8;
    }
    case 0xe0: {
      // "SET 4, B"
      CPU.B = setBitValue(CPU.B, 4, 1);
      return 8;
    }
    case 0xe1: {
      // "SET 4, C"
      CPU.C = setBitValue(CPU.C, 4, 1);
      return 8;
    }
    case 0xe2: {
      // "SET 4, D"
      CPU.D = setBitValue(CPU.D, 4, 1);
      return 8;
    }
    case 0xe3: {
      // "SET 4, E"
      CPU.E = setBitValue(CPU.E, 4, 1);
      return 8;
    }
    case 0xe4: {
      // "SET 4, H"
      CPU.H = setBitValue(CPU.H, 4, 1);
      return 8;
    }
    case 0xe5: {
      // "SET 4, L"
      CPU.L = setBitValue(CPU.L, 4, 1);
      return 8;
    }
    case 0xe6: {
      // "SET 4, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 4, 1));
      return 16;
    }
    case 0xe7: {
      // "SET 4, A"
      CPU.A = setBitValue(CPU.A, 4, 1);
      return 8;
    }
    case 0xe8: {
      // "SET 5, B"
      CPU.B = setBitValue(CPU.B, 5, 1);
      return 8;
    }
    case 0xe9: {
      // "SET 5, C"
      CPU.C = setBitValue(CPU.C, 5, 1);
      return 8;
    }
    case 0xea: {
      // "SET 5, D"
      CPU.D = setBitValue(CPU.D, 5, 1);
      return 8;
    }
    case 0xeb: {
      // "SET 5, E"
      CPU.E = setBitValue(CPU.E, 5, 1);
      return 8;
    }
    case 0xec: {
      // "SET 5, H"
      CPU.H = setBitValue(CPU.H, 5, 1);
      return 8;
    }
    case 0xed: {
      // "SET 5, L"
      CPU.L = setBitValue(CPU.L, 5, 1);
      return 8;
    }
    case 0xee: {
      // "SET 5, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 5, 1));
      return 16;
    }
    case 0xef: {
      // "SET 5, A"
      CPU.A = setBitValue(CPU.A, 5, 1);
      return 8;
    }
    case 0xf0: {
      // "SET 6, B"
      CPU.B = setBitValue(CPU.B, 6, 1);
      return 8;
    }
    case 0xf1: {
      // "SET 6, C"
      CPU.C = setBitValue(CPU.C, 6, 1);
      return 8;
    }
    case 0xf2: {
      // "SET 6, D"
      CPU.D = setBitValue(CPU.D, 6, 1);
      return 8;
    }
    case 0xf3: {
      // "SET 6, E"
      CPU.E = setBitValue(CPU.E, 6, 1);
      return 8;
    }
    case 0xf4: {
      // "SET 6, H"
      CPU.H = setBitValue(CPU.H, 6, 1);
      return 8;
    }
    case 0xf5: {
      // "SET 6, L"
      CPU.L = setBitValue(CPU.L, 6, 1);
      return 8;
    }
    case 0xf6: {
      // "SET 6, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 6, 1));
      return 16;
    }
    case 0xf7: {
      // "SET 6, A"
      CPU.A = setBitValue(CPU.A, 6, 1);
      return 8;
    }
    case 0xf8: {
      // "SET 7, B"
      CPU.B = setBitValue(CPU.B, 7, 1);
      return 8;
    }
    case 0xf9: {
      // "SET 7, C"
      CPU.C = setBitValue(CPU.C, 7, 1);
      return 8;
    }
    case 0xfa: {
      // "SET 7, D"
      CPU.D = setBitValue(CPU.D, 7, 1);
      return 8;
    }
    case 0xfb: {
      // "SET 7, E"
      CPU.E = setBitValue(CPU.E, 7, 1);
      return 8;
    }
    case 0xfc: {
      // "SET 7, H"
      CPU.H = setBitValue(CPU.H, 7, 1);
      return 8;
    }
    case 0xfd: {
      // "SET 7, L"
      CPU.L = setBitValue(CPU.L, 7, 1);
      return 8;
    }
    case 0xfe: {
      // "SET 7, (HL)"
      const hl = CPU.getHL();
      const value = Memory.readByte(hl);
      Memory.writeByte(hl, setBitValue(value, 7, 1));
      return 16;
    }
    case 0xff: {
      // "SET 7, A"
      CPU.A = setBitValue(CPU.A, 7, 1);
      return 8;
    }
    default: {
      console.error("Impossible opcode");
      return -1;
    }
  }
}
