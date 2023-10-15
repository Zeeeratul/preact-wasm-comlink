import Controls from "./components/controls";
import Canvas from "./components/screen";
import { GameboyProvider } from "./components/gameboy-provider";

export default function App() {
  return (
    <GameboyProvider>
      <div className="w-screen h-screen flex flex-row bg-black">
        <div className="flex flex-col w-64 justify-between p-2">
          <Canvas />
          <Controls />
        </div>

        <div className="flex-1"></div>
      </div>
    </GameboyProvider>
  );
}
