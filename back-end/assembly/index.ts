import Memory from "./components/memory";
import CPU from "./components/cpu";

function step(): void {
  const opcode = Memory.readByteAtPc();
  CPU.executeOpcode(opcode);
}

export function runStep(nb: u32): void {
  for (let i: u32 = 0; i < nb; i++) {
    step();
  }
}
