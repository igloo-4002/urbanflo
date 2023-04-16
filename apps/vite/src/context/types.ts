export type AppState = {
  projectInfo: {
    name: string; // Normal Project settings, e.g. name, description, etc.
  };
  canvasState: {
    canvasItems: JSX.Element[]; // Roads, Cars, traffic lights, etc.
  };
  projectState: {
    isSaved: boolean;
  };
};
