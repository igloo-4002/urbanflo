import { Image } from "react-konva";

import { type CarFields } from "../../context/types";
import { type CanvasItemProps } from "./types";

export interface CarProps {
  canvasProps: CanvasItemProps;
  carFields: CarFields;
}

export function Car(props: CarProps) {
  const canvasProps: CanvasItemProps = props.canvasProps;

  return (
    <Image
      alt={"car"}
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
