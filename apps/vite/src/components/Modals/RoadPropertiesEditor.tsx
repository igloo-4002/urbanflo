import { useState } from "react";

import { RoadDirections } from "../../context/types";
import { ColumnStack, RowStack } from "../Stacks";

export default function RoadPropertiesEditor() {
  const [speedLimit, setSpeedLimit] = useState(0);
  const [numLanes, setNumLanes] = useState(0);
  const [direction, setDirection] = useState<string>(RoadDirections.UP);

  function submitRoadProperties() {
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
