import { ReactNode, useState } from "react";
import LocationViewport from "../../Components/LocationView/LocationViewport";
import HoverButton from "../../Components/ToolbarButton/ToolbarButton";
import StatusBar from "../../Components/StatusBar/StatusBar";
import Toolbar from "../../Components/Toolbar/Toolbar";
import { HStack, VStack, Wrapper } from "./LocationViewerPage.styles";
import { AreaSVG as PointPolygonSVG, CloudDownloadSVG, ExportSVG, GearSVG, GroupSVG, LayersSVG, PathSVG, QuestionMarkSVG, TreeSVG } from "../../Assets/SVGAssets";
import ControlsView from "../../Components/ControlsView/ControlsView";
import UITestPanel from "../../Components/UITestPanel/UITestPanel";
import NotImplementedPanel from "../../Components/NotImplementedPanel/NotImplementedPanel";
import AreaEditorPanel from "../../Components/PointPolygonInspector/PointPolygonInspector";
import { PointPolygonData } from "../../Types/PointPolygonData";
import { ToolModes } from "./ToolModes";


enum InspectorModes {
  // Upper
  PointPolygonInspector,
  GroupInspector,
  TreeInspector,

  // DEV
  UITest,

  // Lower
  LayerEditor,
  Download,
  Export,
  Settings,
}

function LocationViewerPage() {
  const [inspector, setInspector] = useState(InspectorModes.PointPolygonInspector);
  const [showInspector, setShowInspector] = useState(true);

  const [activeToolMode, setActiveToolMode] = useState(ToolModes.PointPolygonAppend);

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

  const setPointPolygonData = (id: number, modified: PointPolygonData | undefined) => {
    if (modified === undefined) {
      const newActiveAreaID = allPointPolygons.length - 2;
      setActiveAreaID(newActiveAreaID < 0 ? null : newActiveAreaID);
      setAllPointPolygons(allPointPolygons.filter((_, index) => index !== id))
      // TODO: Set a parameter somewhere that lets backend know to delete those files
      return;
    }

    if (id === -1) {
      setActiveAreaID(allPointPolygons.length);
      setAllPointPolygons([...allPointPolygons, modified]);
      return;
    }

    if (0 <= id && id < allPointPolygons.length) {
      const newPointPolygonData = [...allPointPolygons];
      newPointPolygonData[id] = modified;
      setAllPointPolygons(newPointPolygonData);
      return;
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
    lastLineAsSolid: true,
    displayPointPolygons: true,
  })

  const inspectors: Record<InspectorModes, ReactNode> = {
    [InspectorModes.PointPolygonInspector]: (<AreaEditorPanel
      pointPolygons={allPointPolygons}
      addPointPolygonData={addPointPolygonData}
      setPointPolygonData={setPointPolygonData}
      removePointPolygonData={removePointPolygonData}

      activeToolMode={activeToolMode}
      setActiveToolMode={setActiveToolMode}

      renderData={renderData}
      setRenderData={setRenderData}

      activePointPolygonID={activePolygonID}
      setActivePointPolygonID={setActiveAreaID}
    />),
    [InspectorModes.GroupInspector]: (<NotImplementedPanel name={"Group Inspector"} />),
    [InspectorModes.TreeInspector]: (<NotImplementedPanel name={"TreeEditor"} />),
    [InspectorModes.LayerEditor]: (<NotImplementedPanel name={"LayerEditor"} />),
    [InspectorModes.Download]: (<NotImplementedPanel name={"Download"} />),
    [InspectorModes.Export]: (<NotImplementedPanel name={"Export"} />),
    [InspectorModes.Settings]: (<NotImplementedPanel name={"Settings"} />),
    [InspectorModes.UITest]: (<UITestPanel />)
  }

  const handleToolbarCallback = (newInspector: InspectorModes) => {
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
                { text: "Point Polygon Editor", icon: (<PointPolygonSVG color="white" width={"20"} />), mode: InspectorModes.PointPolygonInspector },
                { text: "Polygon Group Editor", icon: (<GroupSVG color="white" width={"22"} />), mode: InspectorModes.GroupInspector },
                { text: "Path Editor", icon: (<PathSVG color="white" width={"22"} />), mode: InspectorModes.GroupInspector },
                { text: "Tree Editor", icon: (<TreeSVG color="white" width={"20"} />), mode: InspectorModes.TreeInspector },
              ].map((o, id) => <HoverButton
                key={id}
                width={"44px"}
                text={o.text}
                icon={o.icon}
                callback={() => { handleToolbarCallback(o.mode) }}
              />)}

              lowerElements={[
                { text: "DEV: UI Test", icon: (<QuestionMarkSVG color="white" width={"12"} />), mode: InspectorModes.UITest },
                { text: "Layers", icon: (<LayersSVG color="white" width={"20"} />), mode: InspectorModes.LayerEditor },
                { text: "Download Data", icon: (<CloudDownloadSVG color="white" width={"20"} />), mode: InspectorModes.Download },
                { text: "Export", icon: (<ExportSVG color="white" width={"18"} />), mode: InspectorModes.Export },
                { text: "Settings", icon: (<GearSVG color="white" width={"20"} />), mode: InspectorModes.Settings },
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

              activeToolMode={activeToolMode}
              activePointPolygonID={activePolygonID ?? -1}

              renderData={renderData}

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