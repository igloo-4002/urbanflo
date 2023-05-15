import type Konva from "konva";
import React, { useContext, useEffect, useRef } from "react";
import { Layer, Stage } from "react-konva";

import AppStateContext from "../context/AppStateContext";
import { renderCanvasItems } from "./CanvasItems/util";

export default function Canvas() {
  const { appState, setAppState: _setAppState } = useContext(AppStateContext);
  const carRef = useRef<Konva.Image>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  const roadRef = useRef<Konva.Image>(null);

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

      const roadBounds1 = roadRef.current.getClientRect({
        skipTransform: true,
        skipShadow: true,
      });

      roadBounds1.width = 250;
      roadBounds1.height = 100;
      roadBounds1.x = 500;
      roadBounds1.y = 500;

      const roadBounds2 = roadRef.current.getClientRect({
        skipTransform: true,
        skipShadow: true,
      });

      roadBounds2.width = 100;
      roadBounds2.height = 250;
      roadBounds2.x = 420;
      roadBounds2.y = 420;

      if (keysPressed.current["ArrowUp"] || appState.canvasState.isPlaying) {
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
  }, [appState]);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>{renderCanvasItems(appState.canvasState.canvasItems)}</Layer>
    </Stage>
  );
}
