import { type RefObject } from "react";
import { type Image } from "react-konva";

export enum CanvasItemType {
  ROAD = "road",
  CAR = "car",
  TRAFFIC_LIGHT = "traffic-light",
}

export type CanvasItem = {
  info: {
    type: CanvasItemType;
  };
  props: {
    alt: string;
    ref?: RefObject<typeof Image>;
    image: HTMLImageElement;
    x: number;
    y: number;
    draggable: boolean;
    offsetX: number;
    offsetY: number;
  };
};

export type AppState = {
  projectInfo: {
    name: string; // Normal Project settings, e.g. name, description, etc.
  };
  canvasState: {
    canvasItems: CanvasItem[]; // Roads, Cars, traffic lights, etc.
  };
  projectState: {
    isSaved: boolean;
  };
};
