import { createId } from "@paralleldrive/cuid2";

import { CanvasItemType, type AppState, type Car, type Road } from "./types";

export const getDefaultAppState: () => AppState = () => {
  const road1: Road = {
    id: createId(),
    info: {
      type: CanvasItemType.ROAD,
    },
    props: {
      image: new window.Image(),
      x: 400,
      y: 400,
      draggable: true,
      offsetX: 0,
      offsetY: 0,
    },
    speedLimit: 60,
    lanes: 1,
    length: 200,
    direction: "up",
  };

  const road2: Road = {
    id: createId(),
    info: {
      type: CanvasItemType.ROAD,
    },
    props: {
      image: new window.Image(),
      x: 320,
      y: 320,
      draggable: true,
      offsetX: 0,
      offsetY: 0,
    },
    speedLimit: 40,
    lanes: 1,
    length: 150,
    direction: "left",
  };

  const car: Car = {
    id: createId(),
    info: {
      type: CanvasItemType.CAR,
    },
    props: {
      image: new window.Image(),
      x: 500,
      y: 750,
      draggable: true,
      offsetX: 25,
      offsetY: 62.5,
    },
    speed: 0,
    direction: "vertical",
  };

  return {
    projectInfo: {
      name: "untitled",
    },
    canvasState: {
      canvasItems: [road1, road2, car],
      selectedCanvasItem: null,
      isPlaying: false,
    },
    projectState: {
      isSaved: true, // when a user creates a project, it is saved by default
    },
    leftSideBarState: {
      isOpen: false,
      viewName: null,
    },
  };
};
