import { type RefObject } from "react";
import { type Image } from "react-konva";

export enum CanvasItemType {
  ROAD = "road",
  CAR = "car",
  TRAFFIC_LIGHT = "traffic-light",
}

export interface CanvasItem {
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
}

export interface Road extends CanvasItem {
  speedLimit: number;
  lanes: number;
  length: number;
  direction: "horizontal" | "vertical";
}

export interface Car extends CanvasItem {
  speed: number;
  direction: "horizontal" | "vertical";
}

export interface Intersection extends CanvasItem {
  connectingRoads: number[];
}

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
  isLeftSideBarOpen: boolean;
};
