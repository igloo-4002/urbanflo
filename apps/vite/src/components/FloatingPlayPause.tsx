import { useContext } from "react";

import AppStateContext from "../context/AppStateContext";
import { ModalViewNames } from "../context/types";
import IntersectionPropertiesEditor from "./Modals/IntersectionPropertiesEditor";
import RoadPropertiesEditor from "./Modals/RoadPropertiesEditor";

export default function FloatingPlayPause() {
  const { appState, setAppState } = useContext(AppStateContext);

  function playPause() {
    setAppState({
      ...appState,
      canvasState: {
        canvasItems: appState.canvasState.canvasItems,
        selectedCanvasItem: appState.canvasState.selectedCanvasItem,
        isPlaying: !appState.canvasState.isPlaying,
      },
    });
  }

  return (
    <button
      style={{
        position: "fixed",
        top: 15,
        left: 500,
        zIndex: 1000,
      }}
      onClick={playPause}
    >
      {appState.canvasState.isPlaying ? "Pause" : "Play"}
    </button>
  );
}
