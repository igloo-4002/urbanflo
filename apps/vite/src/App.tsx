import { useState } from "react";

import Canvas from "./components/Canvas";
import AppStateContext from "./context/AppStateContext";
import { getDefaultAppState } from "./context/defaults";
import { type AppState } from "./context/types";
import { TRPCProvider } from "./utils/api";

function App() {
  const [appState, setAppState] = useState<AppState>(getDefaultAppState());

  return (
    <TRPCProvider>
      <AppStateContext.Provider value={{ appState, setAppState }}>
        <div className="flex h-screen w-screen items-center justify-center bg-white">
          <Canvas />
        </div>
      </AppStateContext.Provider>
    </TRPCProvider>
  );
}

export default App;
