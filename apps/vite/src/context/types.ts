import { type RefObject } from "react";
import { type Image } from "react-konva";

export const CanvasItemType = {
  ROAD: "road",
  CAR: "car",
  TRAFFIC_LIGHT: "traffic-light",
} as const;

export const ModalViewNames = {
  ROAD_PROPERTIES_EDITOR: "road-properties-editor",
  INTERSECTION_PROPERTIES_EDITOR: "intersection-properties-editor",
} as const;

export interface CanvasItem {
  info: {
    type: typeof CanvasItemType;
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
  leftSideBarState: {
    viewName: string | null;
    isOpen: boolean;
  };
};
