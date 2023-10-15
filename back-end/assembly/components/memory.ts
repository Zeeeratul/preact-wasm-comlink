export default class Memory {
  buffer: StaticArray<u8>;
  romBuffer: Uint8Array;

  constructor(romBuffer: Uint8Array) {
    this.romBuffer = romBuffer;
    this.buffer = new StaticArray<u8>(0xffff).fill(0);

    for (let i = 0; i < 0x8000; i++) {
      console.log(i.toString());
      unchecked((this.buffer[i] = romBuffer[i]));
    }
  }
}
