import { useEffect, useState } from "react";
import { Image } from "react-konva";

import roadImageHorizontal from "../../assets/roadHorizontal.png";
import roadImageVertical from "../../assets/roadVertical.png";
import { type RoadFields } from "../../context/types";
import { type CanvasItemProps } from "./types";

export interface RoadProps {
  roadFields: RoadFields;
  canvasProps: CanvasItemProps;
}

export function Road(props: RoadProps) {
  const canvasProps: CanvasItemProps = props.canvasProps;
  const roadFields: RoadFields = props.roadFields;

  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.src =
      roadFields.direction === "horizontal"
        ? roadImageHorizontal
        : roadImageVertical;
    img.width = 250;
    img.height = 100;
    img.onload = () => {
      setImage(img);
    };
  }, [roadFields.direction]);

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
