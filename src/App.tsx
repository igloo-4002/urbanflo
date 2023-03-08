import React, { useRef } from 'react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="flex items-center justify-center">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default App;
