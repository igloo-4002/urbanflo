import { createContext, type Dispatch, type SetStateAction } from "react";

import { getDefaultAppState } from "../defaults";
import { type AppState } from "../types";

type AppStateContextType = {
  context: AppState;
  setContext: Dispatch<SetStateAction<AppState>>;
};

const AppStateContextState = {
  context: getDefaultAppState(),
  setContext: () => {
    console.warn("unitialized setAppState context!");
  },
};

const AppStateContext =
  createContext<AppStateContextType>(AppStateContextState);

export default AppStateContext;
