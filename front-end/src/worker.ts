import { expose } from "comlink";
import * as gameboy from "./build/debug";

let intervalId: number | null = null;
let cartridge: Uint8Array | null = null;

function isPlaying() {
  return !!intervalId;
}

function isGameboyInitialized() {
  return gameboy.isGameboyInitialized();
}

function getValues() {
  const memory = gameboy.getMemory();
  const cpuRegisters = gameboy.getCpuRegisters();
  return { memory, cpuRegisters };
}

async function playContinuous() {
  intervalId = setInterval(() => {
    gameboy.runFrame(1);
  }, 1000 / 60);
  return getValues();
}

async function play(type: "frame" | "step" | "continuous", nb = 1) {
  if (isPlaying()) return;
  if (!isGameboyInitialized()) return;

  switch (type) {
    case "continuous": {
      return playContinuous();
    }
    case "frame": {
      gameboy.runFrame(nb);
      return getValues();
    }
    case "step": {
      gameboy.step(nb);
      return getValues();
    }
  }
}

function pause() {
  if (!isPlaying()) return;
  if (!isGameboyInitialized()) return;

  clearInterval(intervalId!);
  intervalId = null;
}

async function reset() {
  if (isPlaying()) {
    pause();
  }
  if (cartridge) {
    gameboy.initGameboy(cartridge);
  }
  return getValues();
}

async function loadRom(romBuffer: Uint8Array) {
  if (isPlaying()) {
    pause();
  }
  gameboy.initGameboy(romBuffer);
  cartridge = romBuffer;
  return getValues();
}

const api = {
  play,
  pause,
  loadRom,
  reset,
};

expose(api);

export type WorkerAPI = typeof api;
