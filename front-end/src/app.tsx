import { WasmProvider } from "@/components/wasm-provider";
import Controls from "./components/controls";
import Screen from "./components/screen";

export default function App() {
  return (
    <WasmProvider>
      <div className="w-screen h-screen flex flex-row">
        <div className="flex flex-col w-64">
          <Screen />
          <Controls />
        </div>

        <div className="flex-1"></div>
      </div>
    </WasmProvider>
  );
}
