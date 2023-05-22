import { useContext } from "react";

import AppStateContext from "../context/AppStateContext";

export default function FloatingPlayPause() {
  const { appState, setAppState } = useContext(AppStateContext);

  function downloadNodFile() {
    const a = appState.canvasState.canvasItems.length;
    const nodes = [];

    for (let i = 0; i < a; i++) {
      console.log(appState.canvasState.canvasItems[i]);
      if (appState.canvasState.canvasItems[i].info.type === "road") {
        const id = appState.canvasState.canvasItems[i].id;
        const x = appState.canvasState.canvasItems[i].props.x;
        const y = appState.canvasState.canvasItems[i].props.y;

        const node1 = `<node id="${id}" x="${x}" y="${y}" type="priority" />`;
        nodes.push(node1);
        //If its direction is up - add the length to y
        const node2 = `<node id="${id}" x="${x}" y="${y}" type="priority" />`;
        //If its direction is side ways - add the length to x
        nodes.push(node2);
      }
    }

    const xmlContent = `<nodes>
      ${nodes.join("\n")}
    </nodes>`;

    console.log(xmlContent);

    const parser = new DOMParser();
    const xmlDOM = parser.parseFromString(xmlContent, "text/xml");

    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(xmlDOM);

    const blob = new Blob([xmlString], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "t.nod.xml";

    // Programmatically click the anchor element to trigger the file download
    anchor.click();

    // Clean up by revoking the temporary URL
    URL.revokeObjectURL(url);
  }

  function downloadEdgFile() {
    const a = appState.canvasState.canvasItems.length;
    const edges = [];

    for (let i = 0; i < a; i++) {
      console.log(appState.canvasState.canvasItems[i]);
      if (appState.canvasState.canvasItems[i].info.type === "road") {
        const id = appState.canvasState.canvasItems[i].id;
        const from = appState.canvasState.canvasItems[i].props.x;
        const to = appState.canvasState.canvasItems[i].props.y;
        const numLanes = 0;
        const speed = 0;

        const edge = `<node id="${id}" from="${from}" to="${to}" numLanes="priority" speed="" />`;
        edges.push(edge);
      }
    }

    const xmlContent = `<edges>
      ${edges.join("\n")}
    </edges>`;

    console.log(xmlContent);

    const parser = new DOMParser();
    const xmlDOM = parser.parseFromString(xmlContent, "text/xml");

    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(xmlDOM);

    const blob = new Blob([xmlString], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "t.edg.xml";

    // Programmatically click the anchor element to trigger the file download
    anchor.click();

    // Clean up by revoking the temporary URL
    URL.revokeObjectURL(url);
  }

  function playPause() {
    if (!appState.canvasState.isPlaying) {
      downloadNodFile();
      downloadEdgFile();
    }
    setAppState({
      ...appState,
      canvasState: {
        ...appState.canvasState,
        isPlaying: !appState.canvasState.isPlaying,
      },
    });
  }

  return (
    <button
      style={{
        position: "fixed",
        top: 15,
        left: "50%",
        zIndex: 1000,
        backgroundColor: "#FAF9F6",
        padding: "8px 18px",
        borderRadius: "10px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
      onClick={playPause}
    >
      {appState.canvasState.isPlaying ? "Pause" : "Play"}
    </button>
  );
}
