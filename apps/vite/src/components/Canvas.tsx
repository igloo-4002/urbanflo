import React, { useEffect, useRef } from "react";

import carPNG from "../assets/car.png";
import sinkSVG from "../assets/sink.svg";
import sourceSVG from "../assets/source.svg";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const carPos = useRef({ x: 0, y: 0 });

  const placeCar = () => {
    const canvas = canvasRef.current;

    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const car = new Image();
      car.src = carPNG;
      car.onload = () => {
        ctx.drawImage(
          car,
          carPos.current.x,
          canvas.height - car.height - carPos.current.y,
        );
      };
    }
  };

  const placeSourceAndSink = () => {
    const canvas = canvasRef.current;

    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      // Set the canvas dimensions
      canvas.width = 600; // You can set this value as needed
      canvas.height = 600; // You can set this value as needed

      // place source.svg in the bottom left corner of the canvas
      const source = new Image();
      source.src = sourceSVG;
      source.onload = () => {
        ctx.drawImage(source, 0, canvas.height - source.height);
      };

      // place sink.svg in the top right corner of the canvas
      const sink = new Image();
      sink.src = sinkSVG;
      sink.onload = () => {
        ctx.drawImage(sink, canvas.width - sink.width, 0);
      };
    }
  };

  useEffect(() => {
    placeSourceAndSink();
    placeCar();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="border bg-slate-300"
      style={{ width: "600px", height: "600px" }}
    />
  );
};

export default Canvas;
