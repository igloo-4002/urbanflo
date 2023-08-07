import { useContext } from "react";

import AppStateContext from "../context/AppStateContext";
import {
  CanvasItemType,
  type CanvasItemTypes,
  type Road,
} from "../context/types";

export default function FloatingPlayPause() {
  const { appState, setAppState } = useContext(AppStateContext);
  const nodes: string[] = [];
  const edges: string[] = [];
  const nodIDs: string[] = [];
  const edgeIDs: string[] = [];
  const connections: string[] = [];
  console.log(appState.canvasState.canvasItems);

  function isRoad(item: CanvasItemTypes): item is Road {
    return item.info.type === CanvasItemType.ROAD;
  }

  function downloadNodFile() {
    const a = appState.canvasState.canvasItems.length;

    for (let i = 0; i < a; i++) {
      if (isRoad(appState.canvasState.canvasItems[i])) {
        const id = appState.canvasState.canvasItems[i].id;
        const x = appState.canvasState.canvasItems[i].props.x;
        const y = appState.canvasState.canvasItems[i].props.y;

        const node1 = `<node id="${id}" x="${x}" y="${y}" type="priority" />`;
        nodes.push(node1);
        let node2 = `<node id="${id}" x="${x}" y="${y}" type="priority" />`;
        //If its direction is up - add the length to y
        const newID = id + "+2";
        if (
          appState.canvasState.canvasItems[i].direction === "up" ||
          appState.canvasState.canvasItems[i].direction === "down"
        ) {
          node2 = `<node id="${newID}" x="${x}" y="${
            y + appState.canvasState.canvasItems[i].length
          }" type="priority" />`;
        } else {
          node2 = `<node id="${newID}" x="${
            x + appState.canvasState.canvasItems[i].length
          }" y="${y}" type="priority" />`;
        }

        //If its direction is side ways - add the length to x
        nodes.push(node2);
        nodIDs.push(id);
        nodIDs.push(newID);
      }
    }

    const xmlContent = `<nodes>
      ${nodes.join("\n")}
    </nodes>`;

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
    console.log(nodes);
    const a = nodes.length;

    for (let i = 1; i < a; i++) {
      const id = nodIDs[0] + "---" + nodIDs[i];
      edgeIDs.push(id);
      const from = nodIDs[0];
      // How to decide the to?
      const to = nodIDs[i];
      let numLanes = 0;
      let speed = 0;
      if (i === 1) {
        numLanes = appState.canvasState.canvasItems[0].lanes;
        speed = appState.canvasState.canvasItems[0].speedLimit;
      } else {
        numLanes = appState.canvasState.canvasItems[1].lanes;
        speed = appState.canvasState.canvasItems[1].speedLimit;
      }

      //nodIds
      const edge = `<edge id="${id}" from="${from}" to="${to}" numLanes="${numLanes}" speed="${speed}" />`;
      edges.push(edge);
    }

    const xmlContent = `<edges>
      ${edges.join("\n")}
    </edges>`;

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

  function downloadConFile() {
    console.log(edges);
    const a = edges.length;

    for (let i = 1; i < a; i++) {
      const from = edgeIDs[0];
      const to = edgeIDs[i];
      const fromLane = 0;
      const toLane = 0;

      const connection = `<connection from="${from}" to="${to}" fromLane="${fromLane}" toLane="${toLane}" />`;
      connections.push(connection);
    }

    const xmlContent = `<connections>
      ${connections.join("\n")}
      </connections>`;

    const parser = new DOMParser();
    const xmlDOM = parser.parseFromString(xmlContent, "text/xml");

    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(xmlDOM);

    const blob = new Blob([xmlString], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "t.con.xml";

    // Programmatically click the anchor element to trigger the file download
    anchor.click();

    // Clean up by revoking the temporary URL
    URL.revokeObjectURL(url);
  }

  function downloadRouFile() {
    console.log(connections);
    const routes = [];
    const flows = [];

    const a = edges.length;

    for (let i = 1; i < a; i++) {
      const edgesFill = edgeIDs[0] + " " + edgeIDs[i];

      const route = `<route id="${edgesFill}" edges="${edgesFill}" />`;
      routes.push(route);
      const flow = `<flow id="${edgesFill}" type="car" route="${edgesFill}" begin="0" end="86400" period="5" />`;
      flows.push(flow);
    }

    const xmlContent = `<routes>
    <vType id="car" accel="2.6" decel="4.5" sigma="0.5" length="5" minGap="2.5" maxSpeed="70"/>
      ${routes.join("\n")}
      ${flows.join("\n")}
      </routes>`;

    const parser = new DOMParser();
    const xmlDOM = parser.parseFromString(xmlContent, "text/xml");

    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(xmlDOM);

    const blob = new Blob([xmlString], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "t.rou.xml";

    // Programmatically click the anchor element to trigger the file download
    anchor.click();

    // Clean up by revoking the temporary URL
    URL.revokeObjectURL(url);
  }

  function playPause() {
    if (!appState.canvasState.isPlaying) {
      downloadNodFile();
      downloadEdgFile();
      downloadConFile();
      downloadRouFile();
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
