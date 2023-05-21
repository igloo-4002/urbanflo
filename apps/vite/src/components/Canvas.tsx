import React from "react";
import { Circle, Layer, Line, Stage } from "react-konva";

const MAP_RATIO = 2; // This ratio is used to scale the network to fit the canvas size

function mapCoordinates(
  x: number,
  y: number,
  canvasWidth = window.innerWidth,
  canvasHeight = window.innerHeight,
) {
  return {
    x: x * MAP_RATIO + canvasWidth / 2,
    y: y * MAP_RATIO + canvasHeight / 2, // Multiply by -1 because y increases downwards in Konva
  };
}

export default function Canvas({
  x,
  y,
  color,
}: {
  x: number;
  y: number;
  color: string;
}) {
  const nodes = [
    { id: "start", x: 0.0, y: 0.0 },
    { id: "end", x: 400.0, y: 0.0 },
  ];

  const edges = [{ id: "start_end", from: "start", to: "end" }];

  const getNodeById = (id: string) => nodes.find((node) => node.id === id);

  const carPositions = [
    { x: 41.49294905988499, y: -4.8 },
    { x: 38.017991663981235, y: -4.8 },
    { x: 92.30788270906547, y: -4.8 },
    { x: 53.502549675642506, y: -4.8 },
    { x: 162.83601074482436, y: -4.8 },
    { x: 26.089717962499705, y: -4.8 },
    { x: 55.32929933872075, y: -4.8 },
    { x: 11.068741357768886, y: -4.8 },
    { x: 48.57433211205061, y: -4.8 },
    { x: 48.97933477631304, y: -4.8 },
    { x: 123.5905698460533, y: -4.8 },
    { x: 112.24469129420913, y: -4.8 },
    { x: 43.23254432287067, y: -4.8 },
    { x: 91.25295146781382, y: -4.8 },
    { x: 80.94091290933798, y: -4.8 },
    { x: 15.501278712740167, y: -4.8 },
    { x: 11.602273806906306, y: -4.8 },
    { x: 157.4464569345004, y: -4.8 },
    { x: 174.7426710002455, y: -4.8 },
    { x: 5.1, y: -4.8 },
    { x: 112.5946889223383, y: -4.8 },
    { x: 151.88847698923612, y: -4.8 },
    { x: 90.83337086792969, y: -4.8 },
    { x: 132.3576746030624, y: -4.8 },
    { x: 6.476679887389763, y: -4.8 },
  ];

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {edges.map((edge) => {
          const fromNode = getNodeById(edge.from);
          const toNode = getNodeById(edge.to);

          if (!fromNode || !toNode) throw new Error("Invalid edge");

          const fromCoordinates = mapCoordinates(fromNode.x, fromNode.y);
          const toCoordinates = mapCoordinates(toNode.x, toNode.y);

          return (
            <Line
              key={edge.id}
              points={[
                fromCoordinates.x,
                fromCoordinates.y,
                toCoordinates.x,
                toCoordinates.y,
              ]}
              stroke="black"
              strokeWidth={20} // Adjust for lane width
            />
          );
        })}

        {nodes.map((node) => {
          const coordinates = mapCoordinates(node.x, node.y);

          return (
            <Circle
              key={node.id}
              x={coordinates.x}
              y={coordinates.y}
              radius={10} // Adjust for visual clarity
              fill="green"
            />
          );
        })}

        {carPositions.map((position, index) => {
          const redDotCoordinates = mapCoordinates(x, y);

          return (
            <Circle
              key={index}
              x={redDotCoordinates.x}
              y={redDotCoordinates.y}
              radius={10} // Adjust for visibility
              fill={color}
            />
          );
        })}
      </Layer>
    </Stage>
  );
}
