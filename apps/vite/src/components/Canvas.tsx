import type Konva from "konva";
import React, { useEffect, useRef, useState } from "react";
import { Image, Layer, Stage } from "react-konva";

import carImage from "../assets/car.png";
import roadImage from "../assets/road.png";

export default function Canvas() {
  const [car, setCar] = useState<HTMLImageElement | null>(null);
  const carRef = useRef<Konva.Image>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const [road, setRoad] = useState<HTMLImageElement | null>(null);
  const roadRef = useRef<Konva.Image>(null);

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
    const image = new window.Image();
    image.src = roadImage;
    image.width = 250;
    image.height = 100;
    image.onload = () => {
      setRoad(image);
    };
  }, []);

  useEffect(() => {
    if (carRef.current) {
      carRef.current.cache();
      carRef.current.getLayer()?.batchDraw();
    }
  }, [car]);

  useEffect(() => {
    if (roadRef.current) {
      roadRef.current.rotation(90);
    }
  }, [road]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false;
    };

    const moveCar = () => {
      if (!carRef.current || !roadRef.current) return;

      const step = 5;
      const rotationStep = 5;

      const carBounds = carRef.current.getClientRect();
      const roadBounds1 = roadRef.current.getClientRect({
        skipTransform: true,
        skipShadow: true,
      });
      roadBounds1.x = 300;
      roadBounds1.y = 145;

      const roadBounds2 = roadRef.current.getClientRect({
        skipTransform: true,
        skipShadow: true,
      });
      roadBounds2.x = 300;
      roadBounds2.y = 300;

      if (keysPressed.current["ArrowUp"]) {
        const angle = carRef.current.rotation() * (Math.PI / 180);
        const newPosition = {
          x: carRef.current.x() + step * Math.sin(angle),
          y: carRef.current.y() - step * Math.cos(angle),
        };
        if (
          isPointInsideRect(newPosition, roadBounds1) ||
          isPointInsideRect(newPosition, roadBounds2)
        ) {
          carRef.current.position(newPosition);
        }
      }

      if (keysPressed.current["ArrowDown"]) {
        const angle = carRef.current.rotation() * (Math.PI / 180);
        const newPosition = {
          x: carRef.current.x() - step * Math.sin(angle),
          y: carRef.current.y() + step * Math.cos(angle),
        };
        if (
          isPointInsideRect(newPosition, roadBounds1) ||
          isPointInsideRect(newPosition, roadBounds2)
        ) {
          carRef.current.position(newPosition);
        }
      }

      if (keysPressed.current["ArrowLeft"]) {
        carRef.current.rotation(carRef.current.rotation() - rotationStep);
      }

      if (keysPressed.current["ArrowRight"]) {
        carRef.current.rotation(carRef.current.rotation() + rotationStep);
      }

      carRef.current.getLayer()?.batchDraw();
    };

    const isPointInsideRect = (
      point: { x: number; y: number },
      rect: Konva.RectConfig | undefined,
    ) => {
      if (
        !rect ||
        rect.x === undefined ||
        rect.y === undefined ||
        rect.width === undefined ||
        rect.height === undefined
      ) {
        return false;
      }
      return (
        point.x >= rect.x &&
        point.x <= rect.x + rect.height &&
        point.y >= rect.y &&
        point.y <= rect.y + rect.width
      );
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
        {road && (
          <Image
            alt="A road"
            ref={roadRef}
            image={road}
            x={300}
            y={145}
            draggable
            offsetX={road.width / 2}
            offsetY={road.height / 2}
          />
        )}
        {road && (
          <Image
            alt="A road"
            ref={roadRef}
            image={road}
            x={300}
            y={300}
            draggable
            offsetX={road.width / 2}
            offsetY={road.height / 2}
          />
        )}
        {car && (
          <Image
            alt="A car"
            ref={carRef}
            image={car}
            x={300}
            y={300}
            draggable
            offsetX={car.width / 2}
            offsetY={car.height / 2}
          />
        )}
      </Layer>
    </Stage>
  );
}
