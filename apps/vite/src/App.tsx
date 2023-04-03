import Canvas from "./components/Canvas";
import { TRPCProvider } from "./utils/api";

function App() {
  return (
    <TRPCProvider>
      <div className="flex h-screen w-screen items-center justify-center bg-white">
        <Canvas />
      </div>
    </TRPCProvider>
  );
}

export default App;
