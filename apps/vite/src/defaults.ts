import { type AppState } from "./types";

export const getDefaultAppState: () => AppState = () => {
  return {
    name: "untitled",
  };
};
