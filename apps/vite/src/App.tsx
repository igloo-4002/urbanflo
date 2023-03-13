import { useRef } from "react";

import { TRPCProvider } from "./utils/api";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <TRPCProvider>
      <canvas ref={canvasRef} />
    </TRPCProvider>
  );
}

export default App;
