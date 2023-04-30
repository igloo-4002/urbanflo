import { useContext, useEffect, useState } from "react";

import AppStateContext from "../../context/AppStateContext";
import { RoadDirections } from "../../context/types";
import { ColumnStack, RowStack } from "../Stacks";

interface RoadPropertiesEditorProps {
  speedLimit?: number;
  numLanes?: number;
  direction?: string;
}

export default function RoadPropertiesEditor(props: RoadPropertiesEditorProps) {
  const { appState, setAppState } = useContext(AppStateContext);
  const [speedLimit, setSpeedLimit] = useState(
    appState.canvasState.selectedCanvasItem.speedLimit,
  );
  const [numLanes, setNumLanes] = useState(
    appState.canvasState.selectedCanvasItem.lanes,
  );
  const [direction, setDirection] = useState<string>(
    appState.canvasState.selectedCanvasItem.direction || "up",
  );

  useEffect(() => {
    setSpeedLimit(appState.canvasState.selectedCanvasItem.speedLimit);
    setNumLanes(appState.canvasState.selectedCanvasItem.lanes);
    setDirection(appState.canvasState.selectedCanvasItem.direction || "up");
  }, [appState]);

  function submitRoadProperties() {
    setAppState({
      ...appState,
      leftSideBarState: { isOpen: false, viewName: null },
    });
    console.log("onclick submitRoadProperties does nothing");
  }

  return (
    <ColumnStack style={{ gap: "8px" }}>
      <RowStack>
        <p>Speed Limit</p>
        <input
          style={{ width: "30%" }}
          type="number"
          value={speedLimit}
          onChange={(e) => setSpeedLimit(parseInt(e.target.value))}
        />
      </RowStack>
      <RowStack>
        <p>Number of Lanes</p>
        <input
          style={{ width: "30%" }}
          type="number"
          value={numLanes}
          onChange={(e) => setNumLanes(parseInt(e.target.value))}
        />
      </RowStack>
      <RowStack>
        <p>Direction</p>
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
        >
          <option value={`${RoadDirections.UP}`}>Up</option>
          <option value={`${RoadDirections.DOWN}`}>Down</option>
          <option value={`${RoadDirections.LEFT}`}>Left</option>
          <option value={`${RoadDirections.RIGHT}`}>Right</option>
        </select>
      </RowStack>
      <button onClick={submitRoadProperties}>Update road properties</button>
    </ColumnStack>
  );
}
