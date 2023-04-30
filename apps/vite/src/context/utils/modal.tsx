import { type Dispatch, type SetStateAction } from "react";

import IntersectionPropertiesEditor from "../../components/Modals/IntersectionPropertiesEditor";
import RoadPropertiesEditor from "../../components/Modals/RoadPropertiesEditor";
import { ModalViewNames, type AppState } from "../types";

export function openSidebar(
  appState: AppState,
  setAppState: Dispatch<SetStateAction<AppState>>,
  viewName: string,
) {
  setAppState({
    ...appState,
    leftSideBarState: { isOpen: true, viewName },
  });
}

export function closeSidebar(
  appState: AppState,
  setAppState: Dispatch<SetStateAction<AppState>>,
) {
  setAppState({
    ...appState,
    leftSideBarState: { isOpen: false, viewName: null },
  });
}

export function isSideBarOpen(appState: AppState) {
  return appState.leftSideBarState.isOpen;
}

export function getViewName(appState: AppState) {
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
