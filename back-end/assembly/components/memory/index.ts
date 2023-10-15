import CPU from "../cpu";

export default class Memory {
  static buffer: StaticArray<u8> = new StaticArray<u8>(0xffff).fill(0);

  static readByte(address: u16): u8 {
    return Memory.buffer[address];
  }

  static writeByte(address: u16, byte: u8): void {
    Memory.buffer[address] = byte;
  }

  static readByteAtPc(): u8 {
    const byte = Memory.buffer[CPU.pc];
    CPU.pc = CPU.pc + 1;
    return byte;
  }
}
