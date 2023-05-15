import { useContext, useEffect, useState } from "react";

import AppStateContext from "../../context/AppStateContext";
import {
  RoadDirections,
  type CanvasItem,
  type Road,
} from "../../context/types";
import { ColumnStack, RowStack } from "../Stacks";

interface RoadPropertiesEditorProps {
  speedLimit?: number;
  numLanes?: number;
  direction?: string;
}

// TODO: check if we need the props parameter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function RoadPropertiesEditor(props: RoadPropertiesEditorProps) {
  const { appState, setAppState } = useContext(AppStateContext);

  const [speedLimit, setSpeedLimit] = useState(
    appState.canvasState.selectedCanvasItem?.speedLimit || 0,
  );
  const [numLanes, setNumLanes] = useState(
    appState.canvasState.selectedCanvasItem?.lanes || 0,
  );
  const [direction, setDirection] = useState<string>(
    appState.canvasState.selectedCanvasItem?.direction || "up",
  );

  useEffect(() => {
    setSpeedLimit(appState.canvasState.selectedCanvasItem?.speedLimit || 0);
    setNumLanes(appState.canvasState.selectedCanvasItem?.lanes || 0);
    setDirection(appState.canvasState.selectedCanvasItem?.direction || "up");
  }, [appState]);

  function submitRoadProperties() {
    const updatedProperties: Partial<Road> = {
      speedLimit: speedLimit,
      lanes: numLanes,
      direction: direction,
    };

    const updatedRoad: Road = {
      ...(appState.canvasState.selectedCanvasItem as Road),
      ...updatedProperties,
    };

    const updatedCanvasItems: CanvasItem[] =
      appState.canvasState.canvasItems.map((item) => {
        if (item === appState.canvasState.selectedCanvasItem) {
          return updatedRoad;
        }
        return item;
      });

    setAppState({
      ...appState,
      canvasState: {
        ...appState.canvasState,
        canvasItems: updatedCanvasItems,
        selectedCanvasItem: updatedRoad,
      },
    });
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
