import React, { useState } from "react";

function Road() {
  const [color, setColor] = useState("#F7B326");
  const [width, setWidth] = useState("100px");
  const [height, setHeight] = useState("20px");

  return (
    <div style={{ backgroundColor: color, width: width, height: height }}></div>
    // The above JSX code will render a div element that represents the road with the style properties specified by the state variables.
  );
}

export default Road;
