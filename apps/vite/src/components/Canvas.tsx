import React, { useContext } from "react";
import { Layer, Stage } from "react-konva";

import AppStateContext from "../context/AppStateContext";
import { renderCanvasItems } from "./CanvasItems/util";

export default function Canvas() {
  const { appState, setAppState: _setAppState } = useContext(AppStateContext);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>{renderCanvasItems(appState.canvasState.canvasItems)}</Layer>
    </Stage>
  );
}
