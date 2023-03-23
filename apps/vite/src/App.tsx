import { useState } from "react";

import Canvas from "./components/Canvas";
import AppStateContext from "./context/AppStateContext";
import { getDefaultAppState } from "./defaults";
import { type AppState } from "./types";
import { TRPCProvider } from "./utils/api";

function App() {
  const [appState, setAppState] = useState<AppState>(getDefaultAppState());

  return (
    <TRPCProvider>
      <AppStateContext.Provider
        value={{ context: appState, setContext: setAppState }}
      >
        <div className="flex h-screen w-screen items-center justify-center bg-white">
          <Canvas />
        </div>
      </AppStateContext.Provider>
    </TRPCProvider>
  );
}

export default App;
