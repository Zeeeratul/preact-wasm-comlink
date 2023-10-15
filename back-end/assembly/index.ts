import Gameboy from "./gameboy";

let gameboy: Gameboy | null = null;

export function isGameboyInitialized(): bool {
  return !!gameboy;
}

export function initGameboy(romBuffer: Uint8Array): void {
  gameboy = new Gameboy(romBuffer);
}

export function step(stepNumber: u32): void {
  if (!gameboy) throw new Error("Gameboy not initialized");
  gameboy!.step();
}

export function runFrame(frameNumber: u32): void {
  if (!gameboy) throw new Error("Gameboy not initialized");
  gameboy!.step();
}

export function getMemory(): StaticArray<u8> {
  if (!gameboy) throw new Error("Gameboy not initialized");
  return gameboy!.memory.buffer;
}

export function getCpuRegisters(): StaticArray<u16> {
  if (!gameboy) throw new Error("Gameboy not initialized");
  const registers = new StaticArray<u16>(5);
  registers[0] = gameboy!.cpu.a;
  registers[1] = gameboy!.cpu.f;
  registers[2] = gameboy!.cpu.getBC();
  registers[3] = gameboy!.cpu.getDE();
  registers[4] = gameboy!.cpu.getHL();
  return registers;
}
