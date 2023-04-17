import { useState } from "react";

export default function FloatingSideBar() {
  const [show, setShow] = useState(true);

  return (
    <div
      style={{
        position: "fixed",
        top: 15,
        left: 15,
        zIndex: 1000,
        maxHeight: "min-content",
        maxWidth: "min-content",
        display: show ? "flex" : "none",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "red",
        padding: "15px",
      }}
      onClick={() => setShow(!show)}
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe nisi,
        nulla, quidem exercitationem hic labore tempore fuga, expedita maiores
        earum minus illum iusto excepturi voluptas aut odio inventore odit
        ipsum.
      </p>
    </div>
  );
}
