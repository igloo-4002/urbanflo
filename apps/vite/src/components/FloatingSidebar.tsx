import { useContext } from "react";

import AppStateContext from "../context/AppStateContext";

export default function FloatingSideBar() {
  const { appState, setAppState } = useContext(AppStateContext);

  return (
    <div
      style={{
        position: "fixed",
        top: 15,
        left: 15,
        zIndex: 1000,
        maxHeight: "min-content",
        maxWidth: "min-content",
        display: appState.isLeftSideBarOpen ? "flex" : "none",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        backgroundColor: "red",
        padding: "15px",
      }}
    >
      <button
        onClick={() => setAppState({ ...appState, isLeftSideBarOpen: false })}
      >
        Close
      </button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe nisi,
        nulla, quidem exercitationem hic labore tempore fuga, expedita maiores
        earum minus illum iusto excepturi voluptas aut odio inventore odit
        ipsum.
      </p>
    </div>
  );
}
