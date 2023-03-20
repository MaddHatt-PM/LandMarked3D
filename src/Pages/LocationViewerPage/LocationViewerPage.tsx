import React, { ReactNode, useState } from "react";
import LayerEditor from "../../Components/LayerEditor/LayerEditor";
import LocationViewport from "../../Components/LocationView/LocationViewport";
import HoverButton from "../../Components/ToolbarButton/ToolbarButton";
import Panel from "../../Components/Panel/Panel";
import StatusBar from "../../Components/StatusBar/StatusBar";
import Toolbar from "../../Components/Toolbar/Toolbar";
import { HStack, VStack, Wrapper } from "./LocationViewerPage.styles";
import { AreaSVG, CloudDownloadSVG, ExportSVG, GearSVG, LayersSVG, QuestionMarkSVG, TreeSVG } from "../../Assets/SVGAssets";
import ControlsView from "../../Components/ControlsView/ControlsView";
import UITestPanel from "../../Components/UITestPanel/UITestPanel";
import NotImplementedPanel from "../../Components/NotImplementedPanel/NotImplementedPanel";
import AreaEditorPanel from "../../Components/AreaEditor/AreaEditor";
import { PointPolygonData } from "../../Types/PointPolygonData";


enum ToolbarModes {
  AreaEditor,
  TreeEditor,
  LayerEditor,
  Download,
  Export,
  Settings,

  // DEV
  UITest,
}


function LocationViewerPage() {

  const [inspector, setInspector] = useState(ToolbarModes.AreaEditor);
  const [showInspector, setShowInspector] = useState(true);

  const [activePolygonID, setActiveAreaID] = useState<number | null>(0);
  const [allPointPolygons, setAllPointPolygons] = useState<PointPolygonData[]>([
    {
      name: "Example A",
      color: "#39dfe2",
      points: [
        { id: 0, x: 100, y: 100, elevation: 0 },
        { id: 0, x: 300, y: 100, elevation: 0 },
        { id: 0, x: 300, y: 300, elevation: 0 },
        { id: 0, x: 100, y: 300, elevation: 0 },
      ]
    },
    {
      name: "Example B",
      color: "#38e029",
      points: [
        { id: 0, x: 500, y: 500, elevation: 0 },
        { id: 0, x: 850, y: 500, elevation: 0 },
        { id: 0, x: 850, y: 850, elevation: 0 },
        { id: 0, x: 500, y: 850, elevation: 0 },
      ]
    },
  ])

  const addPointPolygonData = (toAdd: PointPolygonData) => {
    setAllPointPolygons([...allPointPolygons, toAdd]);
    setActiveAreaID(allPointPolygons.length + 1);
  }

  const setPointPolygonData = (id: number, modified: PointPolygonData) => {
    if (0 <= id && id < allPointPolygons.length) {
      const newPointPolygonData = [...allPointPolygons];
      newPointPolygonData[id] = modified;
      setAllPointPolygons(newPointPolygonData);
    }
  }

  const removePointPolygonData = (id: number) => {
    const newActivePolygonID = activePolygonID !== null && activePolygonID - 1 >= 0
    ? activePolygonID - 1
    : null;
    setActiveAreaID(newActivePolygonID);
    setAllPointPolygons(allPointPolygons.splice(id, 1))
  }

  const [renderData, setRenderData] = useState<ViewportRenderData>({
    vertexRadius: 6,
    strokeWidth: 4,
    lastLineAsSolid: false,
  })

  const inspectors: Record<ToolbarModes, ReactNode> = {
    [ToolbarModes.AreaEditor]: (<AreaEditorPanel
      pointPolygons={allPointPolygons}
      addPointPolygonData={addPointPolygonData}
      setPointPolygonData={setPointPolygonData}
      removePointPolygonData={removePointPolygonData}

      renderData={renderData}
      setRenderData={setRenderData}

      activePointPolygonID={activePolygonID}
      setActivePointPolygonID={setActiveAreaID}
    />),
    [ToolbarModes.TreeEditor]: (<NotImplementedPanel name={"TreeEditor"} />),
    [ToolbarModes.LayerEditor]: (<NotImplementedPanel name={"LayerEditor"} />),
    [ToolbarModes.Download]: (<NotImplementedPanel name={"Download"} />),
    [ToolbarModes.Export]: (<NotImplementedPanel name={"Export"} />),
    [ToolbarModes.Settings]: (<NotImplementedPanel name={"Settings"} />),
    [ToolbarModes.UITest]: (<UITestPanel />)
  }

  const handleToolbarCallback = (newInspector: ToolbarModes) => {
    if (inspector === newInspector) {
      setShowInspector(!showInspector);
      return;
    }

    setInspector(newInspector);
    setShowInspector(true);
  };

  return (
    <>
      <VStack>
        <Wrapper>
          <HStack>
            <Toolbar
              upperElements={[
                { text: "Area Editor", icon: (<AreaSVG color="white" width={"20"} />), mode: ToolbarModes.AreaEditor },
                { text: "Tree Editor", icon: (<TreeSVG color="white" width={"20"} />), mode: ToolbarModes.TreeEditor },
              ].map((o, id) => <HoverButton
                key={id}
                width={"44px"}
                text={o.text}
                icon={o.icon}
                callback={() => { handleToolbarCallback(o.mode) }}
              />)}

              lowerElements={[
                { text: "DEV: UI Test", icon: (<QuestionMarkSVG color="white" width={"12"} />), mode: ToolbarModes.UITest },
                { text: "Layers", icon: (<LayersSVG color="white" width={"20"} />), mode: ToolbarModes.LayerEditor },
                { text: "Download Data", icon: (<CloudDownloadSVG color="white" width={"20"} />), mode: ToolbarModes.Download },
                { text: "Export", icon: (<ExportSVG color="white" width={"18"} />), mode: ToolbarModes.Export },
                { text: "Settings", icon: (<GearSVG color="white" width={"20"} />), mode: ToolbarModes.Settings },
              ].map((o, id) => <HoverButton
                key={id}
                width={"40px"}
                text={o.text}
                icon={o.icon}
                callback={() => { handleToolbarCallback(o.mode) }}
              />)}
            />

            {
              Object.values(inspectors).map((view, index) => (
                <div
                  key={index}
                  style={{ height: "100%", display: index === inspector && showInspector ? "block" : "none" }}>
                  {view}
                </div>
              ))
            }
            <LocationViewport
              renderData={renderData}
              activePointPolygonID={activePolygonID ?? -1}
              pointPolygons={allPointPolygons}
              setPointPolygon={setPointPolygonData}
            />

            <ControlsView enabledContent={
              <p>testing controls</p>
            } />
          </HStack>
        </Wrapper>
        <StatusBar />
      </VStack>
    </>
  );
};

export default LocationViewerPage;