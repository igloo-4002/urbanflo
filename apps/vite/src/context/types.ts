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

/**
 * Usage of `RoadDirections` is as follows:
 * If a direction is specified, then the direction of road travel would be towards that direction.
 *
 * For example, RoadDirections.UP would mean that the road is travelling from bottom to top.
 */
export const RoadDirections = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
} as const;

export interface CanvasItem {
  info: {
    type: string;
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
  direction: string;
}

export interface Car extends CanvasItem {
  speed: number;
  direction: "horizontal" | "vertical";
}

export interface Intersection extends CanvasItem {
  connectingRoads: number[];
}

export type CanvasItemTypes = Road | Car | Intersection;

export type AppState = {
  projectInfo: {
    name: string; // Normal Project settings, e.g. name, description, etc.
  };
  canvasState: {
    canvasItems: CanvasItem[]; // Roads, Cars, traffic lights, etc.
    selectedCanvasItem: CanvasItemTypes | null;
    isPlaying: boolean;
  };
  projectState: {
    isSaved: boolean;
  };
  leftSideBarState: {
    viewName: string | null;
    isOpen: boolean;
  };
};
