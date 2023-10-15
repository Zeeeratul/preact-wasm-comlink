import { useContext, useState } from "preact/hooks";
import { createContext } from "preact";
import * as gameboy from "../build/debug";

let cartridge: Uint8Array | null = null;

interface State {}

const GameboyProviderContext = createContext<{
  play: (type: "frame" | "step", nb: number) => void;
  reset: () => void;
  loadCartridge: (cartridge: Uint8Array) => void;
  state: State;
}>(undefined!);

export function GameboyProvider({ children }: { children: any }) {
  const [state, setState] = useState<State>({});

  function play(type: "frame" | "step", nb = 1) {
    if (nb <= 0) return;
    if (!cartridge) return alert("Load a rom please");

    switch (type) {
      case "step": {
        gameboy.step(nb);
        break;
      }
    }
  }

  function reset() {
    if (!cartridge) return alert("Load a rom please");
    gameboy.initGameboy(cartridge);
  }

  function loadCartridge(buffer: Uint8Array) {
    cartridge = buffer;
    gameboy.initGameboy(buffer);
  }

  return (
    <GameboyProviderContext.Provider
      value={{
        play,
        reset,
        loadCartridge,
        state,
      }}
    >
      {children}
    </GameboyProviderContext.Provider>
  );
}

export const useGameboy = () => {
  const context = useContext(GameboyProviderContext);

  if (context === undefined) {
    throw new Error("useGameboy must be used within a GameboyProvider");
  }

  return context;
};
