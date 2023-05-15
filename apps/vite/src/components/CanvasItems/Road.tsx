import { useEffect, useState } from "react";
import { Image } from "react-konva";

import roadImageHorizontal from "../../assets/roadHorizontal.png";
import roadImageVertical from "../../assets/roadVertical.png";
import { RoadDirections, type RoadFields } from "../../context/types";
import { type CanvasItemProps } from "./types";

export interface RoadProps {
  roadFields: RoadFields;
  canvasProps: CanvasItemProps;
}

export function Road(props: RoadProps) {
  const canvasProps: CanvasItemProps = props.canvasProps;
  const roadFields: RoadFields = props.roadFields;

  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const isHorizontal =
    roadFields.direction === RoadDirections.LEFT ||
    roadFields.direction === RoadDirections.RIGHT;

  const horizontalWidth = 250;
  const horizontalHeight = 100;

  const verticalWidth = horizontalHeight;
  const verticalHeight = horizontalWidth;

  useEffect(() => {
    const img = new window.Image();
    img.src = isHorizontal ? roadImageHorizontal : roadImageVertical;
    img.width = isHorizontal ? horizontalWidth : verticalWidth;
    img.height = isHorizontal ? horizontalHeight : verticalHeight;
    img.onload = () => {
      setImage(img);
    };
  }, [isHorizontal, roadFields.direction, verticalHeight, verticalWidth]);

  return image ? (
    <Image
      alt={"road"}
      key={canvasProps.index}
      image={image}
      x={canvasProps.x}
      y={canvasProps.y}
      draggable={false}
      offsetX={canvasProps.offsetX}
      offsetY={canvasProps.offsetY}
    />
  ) : null;
}
