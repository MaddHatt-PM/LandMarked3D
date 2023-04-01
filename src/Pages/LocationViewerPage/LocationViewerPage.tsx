import { ReactNode, useState } from "react";
import ViewportRenderer from "../../Components/ViewportRenderer/ViewportRenderer";
import HoverButton from "../../Components/ToolbarButton/ToolbarButton";
import StatusBar from "../../Components/StatusBar/StatusBar";
import Toolbar from "../../Components/Toolbar/Toolbar";
import { HStack, VStack, Wrapper } from "./LocationViewerPage.styles";
import { AreaSVG as PointPolygonSVG, CloudDownloadSVG, ExportSVG, GearSVG, GroupSVG, LayersSVG, PathSVG, QuestionMarkSVG, SamplePointsSVG, TreeSVG } from "../../Assets/SVGAssets";
import ControlsView from "../../Components/ControlsView/ControlsView";
import UITestPanel from "../../Components/UITestPanel/UITestPanel";
import NotImplementedPanel from "../../Components/NotImplementedPanel/NotImplementedPanel";
import AreaEditorPanel from "../../Components/PointPolygonInspector/PointPolygonInspector";
import { PointPolygonData } from "../../Types/PointPolygonData";
import { ToolModes } from "./ToolModes";
import { PointFieldData } from "../../Types/PointFieldData";
import SamplePointInspector from "../../Components/SamplePointInspector/SamplePointInspector";
import ImageMapInspector from "../../Components/ImageMapInspector/ImageMapInspector";
import PointPathInspector from "../../Components/PointPathInspector/PointPathInspector";
import { PointPathData } from "../../Types/PointPathData";


enum InspectorModes {
  // Upper
  PointPolygonInspector,
  GroupInspector,
  TreeInspector,
  SamplePointsInspector,
  PathInspector,

  // DEV
  UITest,

  // Lower
  ImageMapEditor,
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

  const [allPointPaths, setAllPointPaths] = useState<PointPathData[]>([
    {
      name: "testpath",
      color: "#e21d90",
      wasImported: false,
      points: [
        { id: 0, x: 800, y: 400, elevation: 10 },
        { id: 1, x: 850, y: 400, elevation: 10 },
        { id: 2, x: 950, y: 500, elevation: 20 },
        { id: 2, x: 1050, y: 550, elevation: 20 },
      ]
    },
        {
      name: "imported path",
      color: "#e25b1d",
      wasImported: true,
      points: [
        { id: 0, x: 900, y: 400, elevation: 10 },
        { id: 1, x: 950, y: 400, elevation: 10 },
        { id: 2, x: 1050, y: 500, elevation: 20 },
        { id: 2, x: 1150, y: 550, elevation: 20 },
      ]
    }
  ])

  
  const [activePathID, setActivePathID] = useState<number | null>(0);
  const setPointPathData = (id:number, modified: PointPathData | undefined) => {
    if (modified === undefined) {
      const newActivePathID = allPointPaths.length - 2;
      setActivePathID(newActivePathID < 0 ? null : newActivePathID);
      setAllPointPaths(allPointPaths.filter((_, index) => index !== id))
      // TODO: Set a parameter somewhere that lets backend know to delete those files
      return;
    }

    if (id === -1) {
      setActivePathID(allPointPaths.length);
      setAllPointPaths([...allPointPaths, modified]);
      return;
    }

    if (0 <= id && id < allPointPaths.length) {
      const newPointPathData = [...allPointPaths];
      newPointPathData[id] = modified;
      setAllPointPaths(newPointPathData);
      return;
    }
  }

  const [allPointFields, setAllPointFields] = useState<PointFieldData[]>([
    {
      name: "testPoints",
      color: "#e8b322",
      isViewable: true,
      points: [
        { id: 0, x: 0, y: 0, elevation: 10 },
        { id: 1, x: 5, y: 35, elevation: 10 },
        { id: 2, x: 15, y: 25, elevation: 20 },
        { id: 3, x: 25, y: 15, elevation: 30 },
        { id: 4, x: 35, y: 5, elevation: 40 },
      ]
    }
  ]);

  const setPointFieldData = (id: number, modified: PointFieldData | undefined) => {
    if (modified === undefined) {
      // Delete
      return;
    }

    if (id === -1) {
      // Add new
      return;
    }

    if (0 <= id && id < allPointFields.length) {
      const newPointFieldData = [...allPointFields];
      newPointFieldData[id] = modified;
      setAllPointFields(newPointFieldData);
      return;
    }
  }

  const [allImageMaps, setAllImageMapData] = useState<ImageMapData[]>([
    {
      name: "Terrain",
      opacity: 1.0,
      url: "https://raw.githubusercontent.com/MaddHatt-PM/golf-course-data-processors/main/SavedAreas/DemoCourse/Satelite.png",
      isViewable: true,
      filters: []
    },
    {
      name: "Contours",
      opacity: 1.0,
      url: "https://raw.githubusercontent.com/MaddHatt-PM/golf-course-data-processors/main/SavedAreas/DemoCourse/Contour.png",
      isViewable: true,
      filters: []
    }
  ])

  const setImageMapData = (id: number, modified: ImageMapData | undefined) => {
    if (modified === undefined) {
      // Delete
      return;
    }

    if (id === -1) {
      // Add new
      return;
    }

    if (0 <= id && id < allImageMaps.length) {
      const newImageData = [...allImageMaps];
      newImageData[id] = modified;
      setAllImageMapData(newImageData);
      return;
    }
  }

  const swapImageMapPosition = (indexA: number, indexB: number): void => {
    if (0 > indexA || indexA >= allImageMaps.length) { return; }
    if (0 > indexB || indexB >= allImageMaps.length) { return; }

    const newArray = [...allImageMaps];
    const temp = newArray[indexA];
    newArray[indexA] = newArray[indexB];
    newArray[indexB] = temp;
    setAllImageMapData(newArray)
  }

  const [renderData, setRenderData] = useState<ViewportRenderData>({
    pointPolygonVertexRadius: 6,
    pointPolygonStrokeWidth: 4,
    pointPolygonLastLineAsSolid: true,
    displayPointPolygons: true,

    pointFieldRadius: 8,
    displayPointFields: true,

    pointPathVertexRadius: 6,
    pointPathStrokeWidth: 4,
    displayPointPaths:true,

    displayImageMaps: true,
  })

  const inspectors: Record<InspectorModes, ReactNode> = {
    [InspectorModes.PointPolygonInspector]: (<AreaEditorPanel
      pointPolygons={allPointPolygons}
      setPointPolygonData={setPointPolygonData}

      activeToolMode={activeToolMode}
      setActiveToolMode={setActiveToolMode}

      renderData={renderData}
      setRenderData={setRenderData}

      activePointPolygonID={activePolygonID}
      setActivePointPolygonID={setActiveAreaID}
    />),
    [InspectorModes.GroupInspector]: (<NotImplementedPanel name={"Group Inspector"} />),
    [InspectorModes.SamplePointsInspector]: (<SamplePointInspector
      renderData={renderData}
      setRenderData={setRenderData}
    />),

    [InspectorModes.PathInspector]: (<PointPathInspector
      pointPaths={allPointPaths}
      setPointPathData={setPointPathData}

      activeToolMode={activeToolMode}
      setActiveToolMode={setActiveToolMode}

      renderData={renderData}
      setRenderData={setRenderData}

      activePointPathID={activePathID}
      setActivePointPathID={setActivePathID}
    />),
    [InspectorModes.TreeInspector]: (<NotImplementedPanel name={"TreeEditor"} />),
    [InspectorModes.ImageMapEditor]: (<ImageMapInspector
      allImageMaps={allImageMaps}
      setImageMapData={setImageMapData}
      swapImageMapPosition={swapImageMapPosition}

      renderData={renderData}
      setRenderData={setRenderData}
    />),
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
    
    if(newInspector === InspectorModes.PointPolygonInspector) {
      setActiveToolMode(ToolModes.PointPolygonAppend);
    }

    if (newInspector === InspectorModes.PathInspector) {
      setActiveToolMode(ToolModes.PointPathAppend);
      console.log("test??")
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
                // { text: "Polygon Group Editor", icon: (<GroupSVG color="white" width={"22"} />), mode: InspectorModes.GroupInspector },
                { text: "Path Editor", icon: (<PathSVG color="white" width={"22"} />), mode: InspectorModes.PathInspector },
                { text: "Sample Point Editor", icon: (<SamplePointsSVG color="white" width={"20"} />), mode: InspectorModes.SamplePointsInspector },
                { text: "Layers", icon: (<LayersSVG color="white" width={"20"} />), mode: InspectorModes.ImageMapEditor },
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
            <ViewportRenderer
              activeToolMode={activeToolMode}
              activePointPolygonID={activePolygonID ?? -1}
              renderData={renderData}

              pointFields={allPointFields}
              setPointField={setPointFieldData}

              pointPaths={allPointPaths}
              setPointPath={setPointPathData}

              pointPolygons={allPointPolygons}
              setPointPolygon={setPointPolygonData}

              imageMaps={allImageMaps}
              setImageMap={setImageMapData}
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