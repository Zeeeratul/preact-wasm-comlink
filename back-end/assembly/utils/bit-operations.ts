export function getLowNibble(byte: u8): u8 {
  return byte & 0xf;
}

export function getHighNibble(byte: u8): u8 {
  return (byte & 0xf0) >> 4;
}

export function getLowByte(word: u16): u8 {
  return <u8>(word & 0xff);
}

export function getHighByte(word: u16): u8 {
  return <u8>((word & 0xff00) >> 8);
}

export function combineBytes(highByte: u8, lowByte: u8): u16 {
  return ((<u16>highByte) << 8) | (<u16>lowByte);
}

export function combineNibbles(highNibble: u8, lowNibble: u8): u8 {
  return (highNibble << 4) | lowNibble;
}

export function getBitValue(byte: u8, bitIndex: u8): bool {
  const bitMask = <u8>Math.pow(2, bitIndex);
  return (byte & bitMask) > 0 ? true : false;
}

export function setBitValue(byte: u8, bitIndex: u8, bitValue: bool): u8 {
  const bitOnMask = <u8>Math.pow(2, bitIndex);
  const bitOffMask = <u8>(255 - <u8>Math.pow(2, bitIndex));
  if (bitValue == 1) {
    return byte | bitOnMask;
  } else {
    return byte & bitOffMask;
  }
}
