import { Image } from "react-konva";

import { type RoadFields } from "../../context/types";
import { type CanvasItemProps } from "./types";

export interface RoadProps {
  roadFields: RoadFields;
  canvasProps: CanvasItemProps;
}

export function Road(props: RoadProps) {
  const canvasProps: CanvasItemProps = props.canvasProps;

  return (
    <Image
      alt={"road"}
      key={canvasProps.index}
      image={canvasProps.image}
      x={canvasProps.x}
      y={canvasProps.y}
      draggable
      offsetX={canvasProps.offsetX}
      offsetY={canvasProps.offsetY}
    />
  );
}
