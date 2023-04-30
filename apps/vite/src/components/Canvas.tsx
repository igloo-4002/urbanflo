import type Konva from "konva";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Image, Layer, Stage } from "react-konva";

import carImage from "../assets/car.png";
import roadImageHorizontal from "../assets/roadHorizontal.png";
import roadImageVertical from "../assets/roadVertical.png";
import AppStateContext from "../context/AppStateContext";

export default function Canvas() {
  const [car, setCar] = useState<HTMLImageElement | null>(null);
  const carRef = useRef<Konva.Image>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const [roadHorizontal, setRoadHorizontal] = useState<HTMLImageElement | null>(
    null,
  );
  const [roadVertical, setRoadVertical] = useState<HTMLImageElement | null>(
    null,
  );

  const { appState, setAppState } = useContext(AppStateContext);

  function updateSelectedItem(index: number): void {
    if (index == 0) {
      setAppState({
        ...appState,
        canvasState: {
          canvasItems: appState.canvasState.canvasItems,
          selectedCanvasItem: appState.canvasState.canvasItems[0],
        },
      });
    } else {
      setAppState({
        ...appState,
        canvasState: {
          canvasItems: appState.canvasState.canvasItems,
          selectedCanvasItem: appState.canvasState.canvasItems[1],
        },
      });
    }
  }
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
    const imageHorizontal = new window.Image();
    imageHorizontal.src = roadImageHorizontal;
    imageHorizontal.width = 250;
    imageHorizontal.height = 100;
    imageHorizontal.onload = () => {
      setRoadHorizontal(imageHorizontal);
    };
  }, []);

  useEffect(() => {
    const imageVertical = new window.Image();
    imageVertical.src = roadImageVertical;
    imageVertical.width = 100;
    imageVertical.height = 250;
    imageVertical.onload = () => {
      setRoadVertical(imageVertical);
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
      if (!carRef.current || !roadRef.current) return;

      const step = 5;
      const rotationStep = 5;

      const carBounds = carRef.current.getClientRect();
      const roadBounds1 = roadRef.current.getClientRect({
        skipTransform: true,
        skipShadow: true,
      });
      roadBounds1.x = 500;
      roadBounds1.y = 500;

      const roadBounds2 = roadRef.current.getClientRect({
        skipTransform: true,
        skipShadow: true,
      });
      roadBounds2.x = 420;
      roadBounds2.y = 420;

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
        {appState.canvasState.canvasItems.map((item, index) => {
          if (
            item.info.type === "road" &&
            roadHorizontal &&
            item.direction === "left"
          ) {
            return (
              <Image
                key={index}
                image={roadHorizontal}
                x={item.props.x}
                y={item.props.y}
                draggable
                offsetX={item.props.offsetX}
                offsetY={item.props.offsetY}
                onClick={() => updateSelectedItem(index)}
              />
            );
          } else if (
            item.info.type === "road" &&
            item.direction === "up" &&
            roadVertical
          ) {
            return (
              <Image
                key={index}
                ref={roadRef}
                image={roadVertical}
                x={item.props.x}
                y={item.props.y}
                draggable
                offsetX={item.props.offsetX}
                offsetY={item.props.offsetY}
                onClick={() => updateSelectedItem(index)}
              />
            );
          }
          return null;
        })}
        {car && (
          <Image
            alt="A car"
            ref={carRef}
            image={car}
            x={500}
            y={500}
            draggable
            offsetX={car.width / 2}
            offsetY={car.height / 2}
          />
        )}
      </Layer>
    </Stage>
  );
}
