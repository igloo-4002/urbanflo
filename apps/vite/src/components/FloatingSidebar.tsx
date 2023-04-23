import { useContext } from "react";

import AppStateContext from "../context/AppStateContext";

export default function FloatingSideBar() {
  const { appState, setAppState } = useContext(AppStateContext);

  function closeModal() {
    setAppState({ ...appState, isLeftSideBarOpen: false });
  }

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
        backgroundColor: "lightgreen",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <button style={{ width: "200px" }} onClick={() => closeModal()}>
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
