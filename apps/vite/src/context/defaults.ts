import {
  CanvasItemType,
  ModalViewNames,
  type AppState,
  type Road,
} from "./types";

export const getDefaultAppState: () => AppState = () => {
  const road1: Road = {
    info: {
      type: CanvasItemType.ROAD,
    },
    props: {
      alt: "Road 1",
      image: new window.Image(),
      x: 500,
      y: 500,
      draggable: true,
      offsetX: 50,
      offsetY: 50,
    },
    speedLimit: 60,
    lanes: 1,
    length: 200,
    direction: "up",
  };

  const road2: Road = {
    info: {
      type: CanvasItemType.ROAD,
    },
    props: {
      alt: "Road 2",
      image: new window.Image(),
      x: 420,
      y: 420,
      draggable: true,
      offsetX: 50,
      offsetY: 50,
    },
    speedLimit: 40,
    lanes: 1,
    length: 150,
    direction: "left",
  };

  return {
    projectInfo: {
      name: "untitled",
    },
    canvasState: {
      canvasItems: [road1, road2],
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
