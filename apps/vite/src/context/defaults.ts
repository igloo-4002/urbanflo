import { ModalViewNames, type AppState } from "./types";

export const getDefaultAppState: () => AppState = () => {
  return {
    projectInfo: {
      name: "untitled",
    },
    canvasState: {
      canvasItems: [],
    },
    projectState: {
      isSaved: true, // when a user creates a project, it is saved by default
    },
    leftSideBarState: {
      isOpen: true,
      viewName: ModalViewNames.ROAD_PROPERTIES_EDITOR,
    },
  };
};
