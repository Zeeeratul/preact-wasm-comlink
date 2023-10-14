import Gameboy from "./gameboy";

let gameboy: Gameboy | null = null;

export function isGameboyInitialized(): bool {
  return !!gameboy;
}

export function initGameboy(romBuffer: Uint8Array): void {
  gameboy = new Gameboy(romBuffer);
}

export function step(stepNumber: u32): void {
  if (!isGameboyInitialized()) return;
  gameboy!.step();
}

export function runFrame(frameNumber: u32): void {
  if (!isGameboyInitialized()) return;
  gameboy!.step();
}
