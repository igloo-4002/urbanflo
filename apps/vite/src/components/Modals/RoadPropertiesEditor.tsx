import { useContext, useEffect, useState } from "react";

import AppStateContext from "../../context/AppStateContext";
import {
  CanvasItemType,
  RoadDirections,
  type CanvasItem,
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
    appState.canvasState.selectedCanvasItem.speedLimit || 0,
  );
  const [numLanes, setNumLanes] = useState(
    appState.canvasState.selectedCanvasItem.lanes || 0,
  );
  const [direction, setDirection] = useState<string>(
    appState.canvasState.selectedCanvasItem.direction || "up",
  );

  useEffect(() => {
    setSpeedLimit(appState.canvasState.selectedCanvasItem.speedLimit || 0);
    setNumLanes(appState.canvasState.selectedCanvasItem.lanes || 0);
    setDirection(appState.canvasState.selectedCanvasItem.direction || "up");
  }, [appState]);

  function submitRoadProperties() {
    if (
      appState.canvasState.selectedCanvasItem ==
      appState.canvasState.canvasItems[0]
    ) {
      const canvasItemsNew: CanvasItem[] = [
        {
          info: {
            type: CanvasItemType.ROAD,
          },
          props: {
            alt: "Road 1",
            image: new window.Image(),
            x: 500,
            y: 500,
            draggable: true,
            offsetX: 50,
            offsetY: 50,
          },
          speedLimit: speedLimit,
          lanes: numLanes,
          length: 200,
          direction: direction,
        },
        appState.canvasState.canvasItems[1],
      ];
      setAppState({
        ...appState,
        canvasState: {
          canvasItems: canvasItemsNew,
          selectedCanvasItem: canvasItemsNew[0],
          isPlaying: appState.canvasState.isPlaying,
        },
      });
    } else {
      const canvasItemsNew: CanvasItem[] = [
        appState.canvasState.canvasItems[0],
        {
          info: {
            type: CanvasItemType.ROAD,
          },
          props: {
            alt: "Road 2",
            image: new window.Image(),
            x: 420,
            y: 420,
            draggable: true,
            offsetX: 50,
            offsetY: 50,
          },
          speedLimit: speedLimit,
          lanes: numLanes,
          length: 200,
          direction: direction,
        },
      ];

      setAppState({
        ...appState,
        canvasState: {
          canvasItems: canvasItemsNew,
          selectedCanvasItem: canvasItemsNew[1],
          isPlaying: appState.canvasState.isPlaying,
        },
      });
    }
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
