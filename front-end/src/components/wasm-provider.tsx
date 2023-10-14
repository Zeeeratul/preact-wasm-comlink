import { createContext, useContext } from "react";
import { Remote, wrap } from "comlink";
import type { WorkerAPI } from "../worker";

const worker = new Worker(new URL("../worker.ts", import.meta.url), {
  type: "module",
});

const workerAPI = wrap<WorkerAPI>(worker);

type Context = Remote<WorkerAPI>;

const WasmProviderContext = createContext<Context>(undefined!);

export function WasmProvider({ children }: { children: React.ReactNode }) {
  return (
    <WasmProviderContext.Provider value={workerAPI}>
      {children}
    </WasmProviderContext.Provider>
  );
}

export const useWasm = () => {
  const context = useContext(WasmProviderContext);

  if (context === undefined)
    throw new Error("useWasm must be used within a WasmProvider");

  return context;
};
