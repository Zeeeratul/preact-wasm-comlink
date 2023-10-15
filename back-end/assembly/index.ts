import Memory from "./components/memory";
import CPU from "./components/cpu";

let romBuffer: Uint8Array = new Uint8Array(0);

function step(): void {
  const opcode = Memory.readByteAtPc();
  CPU.executeOpcode(opcode);
}

export function isGameboyInit(): bool {
  return romBuffer.length >= 0x8000;
}

export function runStep(nb: u32): void {
  for (let i: u32 = 0; i < nb; i++) {
    step();
  }
}

export function loadRom(buffer: Uint8Array): void {
  romBuffer = buffer;
  if (buffer.length < 0x8000) throw new Error("Rom is invalid or too short");
  for (let i: u16 = 0; i < 0x8000; i++) {
    Memory.writeByte(i, buffer[i]);
  }
}

export function reset(): void {
  loadRom(romBuffer);
}
