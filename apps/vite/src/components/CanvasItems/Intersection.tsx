import { Image } from "react-konva";

import { type IntersectionFields } from "../../context/types";
import { type CanvasItemProps } from "./types";

export interface IntersectionProps {
  intersectionProps: IntersectionFields;
  canvasProps: CanvasItemProps;
}

export function Intersection(props: IntersectionProps) {
  const canvasProps: CanvasItemProps = props.canvasProps;

  return (
    <Image
      alt={"intersection"}
      key={canvasProps.index}
      image={canvasProps.image}
      x={canvasProps.x}
      y={canvasProps.y}
      draggable
      offsetX={canvasProps.offsetX}
      offsetY={canvasProps.offsetY}
      onClick={() => canvasProps.onClick(canvasProps.index)}
    />
  );
}
