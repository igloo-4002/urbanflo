import { useContext, useState } from "react";

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

  const { speedLimit, lanes, direction } = appState.canvasState
    .selectedCanvasItem as Road;

  const [newSpeedLimit, setNewSpeedLimit] = useState(speedLimit || 0);
  const [newLanes, setNewLanes] = useState(lanes || 0);
  const [newDirection, setNewDirection] = useState<string>(direction || "up");

  function submitRoadProperties() {
    const updatedProperties: Partial<Road> = {
      speedLimit: newSpeedLimit,
      lanes: newLanes,
      direction: newDirection,
    };
    console.log("updatedProperties: ", updatedProperties);

    const updatedRoad: Road = {
      ...(appState.canvasState.selectedCanvasItem as Road),
      ...updatedProperties,
    };
    console.log("updatedRoad: ", updatedRoad);

    const updatedCanvasItems: CanvasItem[] =
      appState.canvasState.canvasItems.map((item) => {
        if (item.id === appState.canvasState.selectedCanvasItem?.id) {
          return updatedRoad;
        }
        return item;
      });

    console.log("updatedCanvasItems: ", updatedCanvasItems);
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
          value={newSpeedLimit}
          onChange={(e) => setNewSpeedLimit(parseInt(e.target.value))}
        />
      </RowStack>
      <RowStack>
        <p>Number of Lanes</p>
        <input
          style={{ width: "30%" }}
          type="number"
          value={newLanes}
          onChange={(e) => setNewLanes(parseInt(e.target.value))}
        />
      </RowStack>
      <RowStack>
        <p>Direction</p>
        <select
          value={newDirection}
          onChange={(e) => setNewDirection(e.target.value)}
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
