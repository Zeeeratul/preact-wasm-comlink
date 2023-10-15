import CPU from "./components/cpu";
import Memory from "./components/memory";
import PPU from "./components/ppu";

export default class Gameboy {
  memory: Memory;
  ppu: PPU;
  cpu: CPU;

  constructor(romBuffer: Uint8Array) {
    if (romBuffer.length < 0x8000) {
      throw new Error("romBuffer is empty or has an invalid size.");
    }

    const memory = new Memory(romBuffer);
    this.memory = memory;
    this.ppu = new PPU(memory);
    this.cpu = new CPU(memory);
  }

  step(): void {}
}
