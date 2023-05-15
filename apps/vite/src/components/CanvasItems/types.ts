export interface CanvasItemProps {
  index: number;
  image: CanvasImageSource;
  x: number;
  y: number;
  draggable: string;
  offsetX: number;
  offsetY: number;
  onClick: (index: number) => void;
}
