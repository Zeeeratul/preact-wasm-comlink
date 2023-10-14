import { wrap } from "comlink";
import { WorkerAPI } from "./worker.ts";

const worker = new Worker(new URL("./worker.ts", import.meta.url), {
  type: "module",
});

const workerAPI = wrap<WorkerAPI>(worker);

export function App() {
  return (
    <div className="bg-red-100 w-screen h-screen">
      <h1 className="text-3xl font-bold bg-fuchsia-500 underline">
        Hello world!
      </h1>

      <button></button>
    </div>
  );
}
