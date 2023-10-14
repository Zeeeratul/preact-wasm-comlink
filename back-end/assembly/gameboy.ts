import Memory from "./components/memory";
import PPU from "./components/ppu";

export default class Gameboy {
  private memory: Memory = null!;
  private ppu: PPU = null!;

  constructor(romBuffer: Uint8Array) {
    this.memory = new Memory(romBuffer);
    this.ppu = new PPU(this.memory);
  }

  step(): void {
    console.log(this.ppu.getNumber().toString());
  }
}
