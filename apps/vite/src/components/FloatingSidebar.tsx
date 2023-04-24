import { useContext } from "react";

import AppStateContext from "../context/AppStateContext";
import { ModalViewNames } from "../context/types";
import IntersectionPropertiesEditor from "./Modals/IntersectionPropertiesEditor";
import RoadPropertiesEditor from "./Modals/RoadPropertiesEditor";

export default function FloatingSideBar() {
  const { appState, setAppState } = useContext(AppStateContext);

  function closeModal() {
    setAppState({
      ...appState,
      leftSideBarState: { isOpen: false, viewName: null },
    });
  }
  function isSideBarOpen() {
    return appState.leftSideBarState.isOpen;
  }

  function view() {
    switch (appState.leftSideBarState.viewName) {
      case null:
        return (
          <p>
            appState.leftSideBarState.viewName is null but the sidebar is open -
            make sure you are setting the view name when you open the sidebar
          </p>
        );
      case ModalViewNames.ROAD_PROPERTIES_EDITOR:
        return <RoadPropertiesEditor />;
      case ModalViewNames.INTERSECTION_PROPERTIES_EDITOR:
        return <IntersectionPropertiesEditor />;
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 15,
        left: 15,
        zIndex: 1000,
        maxHeight: "min-content",
        width: "200px",
        display: isSideBarOpen() ? "flex" : "none",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        backgroundColor: "#FAF9F6",
        padding: "12px",
        borderRadius: "10px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        overflowWrap: "break-word",
      }}
    >
      <button
        style={{ width: "100%", marginBottom: "8px" }}
        onClick={() => closeModal()}
      >
        Close
      </button>
      {view()}
    </div>
  );
}
