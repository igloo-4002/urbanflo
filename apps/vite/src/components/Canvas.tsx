import type Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Image, Layer, Stage } from "react-konva";

import carImage from "../assets/car.png";

const CarCanvas: React.FC = () => {
  const [car, setCar] = useState<HTMLImageElement | null>(null);
  const carRef = useRef<Konva.Image>(null);

  useEffect(() => {
    const image = new window.Image();
    image.src = carImage;
    image.onload = () => {
      setCar(image);
    };
  }, []);

  useEffect(() => {
    if (carRef.current) {
      carRef.current.cache();
      carRef.current.getLayer()?.batchDraw();
    }
  }, [car]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carRef.current) return;

      const step = 5;
      let newPosition: { x: number; y: number };

      switch (e.key) {
        case "ArrowUp":
          newPosition = { x: carRef.current.x(), y: carRef.current.y() - step };
          break;
        case "ArrowDown":
          newPosition = { x: carRef.current.x(), y: carRef.current.y() + step };
          break;
        case "ArrowLeft":
          newPosition = { x: carRef.current.x() - step, y: carRef.current.y() };
          break;
        case "ArrowRight":
          newPosition = { x: carRef.current.x() + step, y: carRef.current.y() };
          break;
        default:
          return;
      }

      carRef.current.position(newPosition);
      carRef.current.getLayer()?.batchDraw();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {car && (
          <Image
            alt="A car"
            ref={carRef}
            image={car}
            x={window.innerWidth / 2}
            y={window.innerHeight / 2}
            draggable
          />
        )}
      </Layer>
    </Stage>
  );
};

export default CarCanvas;
