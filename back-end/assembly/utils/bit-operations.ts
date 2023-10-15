export function combineBytes(highByte: u8, lowByte: u8): u16 {
  return (highByte << 8) | lowByte;
}
