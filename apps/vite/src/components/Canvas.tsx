import type Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Image, Layer, Stage } from "react-konva";

import carImage from "../assets/car.png";

export default function Canvas() {
  const [car, setCar] = useState<HTMLImageElement | null>(null);
  const carRef = useRef<Konva.Image>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const image = new window.Image();
    image.src = carImage;
    image.width = 50;
    image.height = 125;
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
      keysPressed.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    const moveCar = () => {
      if (!carRef.current) return;

      const step = 5;
      const rotationStep = 5;

      if (keysPressed.current["ArrowUp"]) {
        const angle = carRef.current.rotation() * (Math.PI / 180);
        const newPosition = {
          x: carRef.current.x() + step * Math.sin(angle),
          y: carRef.current.y() - step * Math.cos(angle),
        };
        carRef.current.position(newPosition);
      }

      if (keysPressed.current["ArrowDown"]) {
        const angle = carRef.current.rotation() * (Math.PI / 180);
        const newPosition = {
          x: carRef.current.x() - step * Math.sin(angle),
          y: carRef.current.y() + step * Math.cos(angle),
        };
        carRef.current.position(newPosition);
      }

      if (keysPressed.current["ArrowLeft"]) {
        carRef.current.rotation(carRef.current.rotation() - rotationStep);
      }

      if (keysPressed.current["ArrowRight"]) {
        carRef.current.rotation(carRef.current.rotation() + rotationStep);
      }

      carRef.current.getLayer()?.batchDraw();
    };

    const interval = setInterval(moveCar, 1000 / 60); // 60 FPS

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
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
            x={0}
            y={0}
            draggable
            offsetX={car.width / 2}
            offsetY={car.height / 2}
          />
        )}
      </Layer>
    </Stage>
  );
}
