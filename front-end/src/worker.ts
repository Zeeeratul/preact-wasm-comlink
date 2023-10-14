import { expose } from "comlink";
import * as gameboy from "./build/debug";

let intervalId: number | null = null;
let cartridge: Uint8Array;

function isPlaying() {
  return !!intervalId;
}

function isGameboyInitialized() {
  return gameboy.isGameboyInitialized();
}

function play(type: "frame" | "step" | "continuous", nb = 1) {
  if (isPlaying()) return;
  if (!isGameboyInitialized()) return;

  switch (type) {
    case "continuous": {
      intervalId = setInterval(() => {
        gameboy.runFrame(1);
      }, 1000 / 60);
      break;
    }
    case "frame": {
      gameboy.runFrame(nb);
      break;
    }
    case "step": {
      gameboy.step(nb);
      break;
    }
  }
}

function pause() {
  if (!isPlaying()) return;
  if (!isGameboyInitialized()) return;

  clearInterval(intervalId!);
  intervalId = null;
}

function loadRom(romBuffer: Uint8Array) {
  if (isPlaying()) {
    pause();
  }
  cartridge = romBuffer;
  gameboy.initGameboy(romBuffer);
}

function reset() {
  if (isPlaying()) {
    pause();
  }
  if (cartridge) {
    gameboy.initGameboy(cartridge);
  }
}

expose({
  play,
  pause,
  loadRom,
  reset,
});

export type WorkerAPI = typeof gameboy;
