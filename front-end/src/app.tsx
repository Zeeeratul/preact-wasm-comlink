import { WasmProvider } from "./components/wasm-provider";

export default function App() {
  return (
    <WasmProvider>
      <div className="w-screen h-screen flex flex-row">
        <div className="flex flex-col w-64"></div>

        <div className="flex-1"></div>
      </div>
    </WasmProvider>
  );
}
