import { useContext } from "preact/hooks";
import { createContext } from "preact";
import { Remote, wrap } from "comlink";
import type { WorkerAPI } from "../worker";

const worker = new Worker(new URL("../worker.ts", import.meta.url), {
  type: "module",
});

const workerAPI = wrap<WorkerAPI>(worker);

type Context = Remote<WorkerAPI>;

const GameboyProviderContext = createContext<Context>(undefined!);

export function GameboyProvider({ children }: { children: any }) {
  return (
    <GameboyProviderContext.Provider value={workerAPI}>
      {children}
    </GameboyProviderContext.Provider>
  );
}

export const useGameboy = () => {
  const context = useContext(GameboyProviderContext);

  if (context === undefined)
    throw new Error("useGameboy must be used within a GameboyProvider");

  return context;
};
