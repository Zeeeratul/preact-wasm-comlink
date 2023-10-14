const staticArray = new StaticArray<u8>(0xffff);
const array = new Uint8Array(0xffff);

export function getArray(): Uint8Array {
  return array;
}

export function getStaticArray(): StaticArray<u8> {
  return staticArray;
}
