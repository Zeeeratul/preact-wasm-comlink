import { useRef } from "preact/hooks";
import { useGameboy } from "./gameboy-provider";

export default function Controls() {
  const { play, pause, reset, loadRom } = useGameboy();
  const fileInput = useRef<HTMLInputElement>(null);

  const handlePlay = async () => {
    const data = await play("frame");
    console.log(data);
  };

  const handlePause = async () => {
    const data = await pause();
    console.log(data);
  };

  const handleReset = async () => {
    const data = await reset();
    console.log(data);
  };

  const handleLoadRom = () => {
    fileInput?.current?.click();
  };

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target?.result instanceof ArrayBuffer) {
          const arrayBuffer = e.target.result;
          const rom = new Uint8Array(arrayBuffer);
          await loadRom(rom);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        className="bg-white text-black py-2 text-xl text-center px-6"
        onClick={handlePlay}
      >
        Play
      </button>
      <button
        className="bg-white text-black py-2 text-xl text-center px-6"
        onClick={handlePlay}
      >
        Play step
      </button>
      <button
        className="bg-white text-black py-2 text-xl text-center px-6"
        onClick={handlePlay}
      >
        Play frame
      </button>
      <button
        className="bg-white text-black py-2 text-xl text-center px-6"
        onClick={handlePause}
      >
        Pause
      </button>
      <button
        className="bg-white text-black py-2 text-xl text-center px-6"
        onClick={handleReset}
      >
        Reset
      </button>
      <button
        className="bg-white text-black py-2 text-xl text-center px-6"
        onClick={handleLoadRom}
      >
        Load rom
      </button>
      <input
        type="file"
        ref={fileInput}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
