import { type AppState } from "./types";

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
  };
};
