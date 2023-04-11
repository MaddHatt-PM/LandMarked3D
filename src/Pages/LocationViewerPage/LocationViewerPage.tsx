import { ReactNode, useCallback, useEffect, useState } from "react";
import ViewportRenderer from "../../Components/ViewportRenderer/ViewportRenderer";
import HoverButton from "../../Components/ToolbarButton/ToolbarButton";
import StatusBar from "../../Components/StatusBar/StatusBar";
import Toolbar from "../../Components/Toolbar/Toolbar";
import { HStack, VStack, Wrapper } from "./LocationViewerPage.styles";
import { AreaSVG as PointPolygonSVG, CloudDownloadSVG, ExportSVG, GearSVG, GroupSVG, LayersSVG, PathSVG, QuestionMarkSVG, SamplePointsSVG, TreeSVG } from "../../Assets/SVGAssets";
import ControlsView from "../../Components/ControlsView/ControlsView";
import UITestPanel from "../../Inspectors/UITestInspector/UITestInspector";
import NotImplementedPanel from "../../Inspectors/NotImplementedPanel/NotImplementedPanel";
import AreaEditorPanel from "../../Inspectors/PointPolygonInspector/PointPolygonInspector";
import { PointPolygonData } from "../../Types/PointPolygonData";
import { ToolModes } from "./ToolModes";
import { PointFieldData } from "../../Types/PointFieldData";
import SamplePointInspector from "../../Inspectors/PointFieldInspector/PointFieldInspector";
import ImageMapInspector from "../../Inspectors/ImageMapInspector/ImageMapInspector";
import PointPathInspector from "../../Inspectors/PointPathInspector/PointPathInspector";
import { PointPathData } from "../../Types/PointPathData";
import { SamplePointData } from "../../Types/SamplePointData";
import { PointBookmarkData } from "../../Types/PointBookmarkData";
import PointBookMarkInspector from "../../Inspectors/PointBookmarkInspector/PointBookmarkInspector";
import { LoadedLocationPayload } from "../../Types/LoadedLocationPayload";
import windowEvents from "../../WindowEvents/window-events";
import toMainEvents from "../../IPCEvents/ipc-to-main-events";
import fromMainEvents from "../../IPCEvents/ipc-from-main-events";
import { webContents } from "electron";
import setLocationNameEvent from "../../WindowEvents/set-location-name";
// import { ipcRenderer } from "electron";


enum InspectorModes {
  // Upper
  PointBookmarkInspector,
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

enum LocationStates {
  NotLoaded,
  Loading,
  Loaded,

  ErroredOnLoad,
}

interface LocationViewerPageProps {
  projectPath: string;
}

function LocationViewerPage() {
  const [locationName, setLocationName] = useState("");
  const [projectDirpath, setProjectDirPath] = useState("D:\terrain-viewer\save-tests\testing-region")
  const [locationState, setLocationState] = useState(LocationStates.NotLoaded);

  const [isDirty, setIsDirty] = useState(false);
  const handleSetIsDirty = (state = true) => {
    const notifyEvent = state ? windowEvents.NotifyOnLocationIsDirty : windowEvents.NotifyOnLocationIsClean;
    window.dispatchEvent(new CustomEvent(notifyEvent));
    setIsDirty(state);
  }

  const [inspector, setInspector] = useState(InspectorModes.PointPolygonInspector);
  const [showInspector, setShowInspector] = useState(true);
  const [activeToolMode, setActiveToolMode] = useState(ToolModes.PointPolygonAppend);


  /* ----Point-Bookmarks---- */
  const [allPointBookmarks, setAllPointBookmarks] = useState<PointBookmarkData[]>([]);
  const [activePointBookmarkID, setActivePointBookmarkID] = useState<number | null>(0);
  const setPointBookmarkData = (id: number, modified: PointBookmarkData | undefined) => {
    handleSetIsDirty(true);

    if (modified === undefined) {
      const nextActive = allPointBookmarks.length - 2;
      setActivePointBookmarkID(nextActive < 0 ? null : nextActive);
      setAllPointBookmarks(allPointBookmarks.filter((_, index) => index !== id))
      // TODO: Set a parameter somewhere that lets backend know to delete those files
      return;
    }

    if (id === -1) {
      setActivePointBookmarkID(allPointBookmarks.length);
      setAllPointBookmarks([...allPointBookmarks, modified]);
      return;
    }

    if (0 <= id && id < allPointBookmarks.length) {
      const newBookmarkData = [...allPointBookmarks];
      newBookmarkData[id] = modified;
      setAllPointBookmarks(newBookmarkData);
      return;
    }
  }

  /* ----Point-Polygons---- */
  const [allPointPolygons, setAllPointPolygons] = useState<PointPolygonData[]>([])
  const [activePolygonID, setActiveAreaID] = useState<number | null>(0);
  const setPointPolygonData = (id: number, modified: PointPolygonData | undefined) => {
    handleSetIsDirty(true);

    if (modified === undefined) {
      const newActiveAreaID = allPointPolygons.length - 2;
      setActiveAreaID(newActiveAreaID < 0 ? null : newActiveAreaID);
      setAllPointPolygons(allPointPolygons.filter((_, index) => index !== id))
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

  /* ----Polygon-Groups---- */
  const [allPolygonGroups, setAllPolygonGroups] = useState<PolygonGroupData[]>([])
  const setPolygonGroup = (id: number, modified: PolygonGroupData | undefined) => {
    handleSetIsDirty(true);

    if (modified === undefined) {
      const newActiveAreaID = allPolygonGroups.length - 2;
      setActiveAreaID(newActiveAreaID < 0 ? null : newActiveAreaID);
      setAllPolygonGroups(allPolygonGroups.filter((_, index) => index !== id))
      return;
    }

    if (id === -1) {
      setActiveAreaID(allPolygonGroups.length);
      setAllPolygonGroups([...allPolygonGroups, modified]);
      return;
    }

    if (0 <= id && id < allPolygonGroups.length) {
      const newPolygonGroupData = [...allPolygonGroups];
      newPolygonGroupData[id] = modified;
      setAllPolygonGroups(newPolygonGroupData);
      return;
    }
  }

  /* ----Point-Paths---- */
  const [allPointPaths, setAllPointPaths] = useState<PointPathData[]>([])
  const [activePathID, setActivePathID] = useState<number | null>(0);
  const setPointPathData = (id: number, modified: PointPathData | undefined) => {
    handleSetIsDirty(true);

    if (modified === undefined) {
      const newActivePathID = allPointPaths.length - 2;
      setActivePathID(newActivePathID < 0 ? null : newActivePathID);
      setAllPointPaths(allPointPaths.filter((_, index) => index !== id))
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


  /* ----Point-Fields---- */
  const [allPointFields, setAllPointFields] = useState<PointFieldData[]>([]);
  const [activePointFieldID, setActivePointFieldID] = useState<number | null>(0);
  const setPointFieldData = (id: number, modified: PointFieldData | undefined) => {
    handleSetIsDirty(true);

    if (modified === undefined) {
      // Delete
      console.log("TODO: setPointFieldData - delete")
      return;
    }

    if (id === -1) {
      console.log("TODO: setPointFieldData - add")
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


  /* ----Image-Maps---- */
  const [allImageMaps, setAllImageMapData] = useState<ImageMapData[]>([])
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
    handleSetIsDirty(true);
  }


  /* ----Render-Data---- */
  const [renderData, setRenderData] = useState<ViewportRenderData>({
    pointPolygonVertexRadius: 6,
    pointPolygonStrokeWidth: 4,
    displayPointPolygons: true,

    pointFieldRadius: 8,
    displayPointFields: true,

    pointPathVertexRadius: 6,
    pointPathStrokeWidth: 4,
    displayPointPaths: true,

    displayPointBookmarks: true,

    displayImageMaps: true,
  })

  const inspectors: Record<InspectorModes, ReactNode> = {
    [InspectorModes.PointBookmarkInspector]: (<PointBookMarkInspector
      activePointBookmarkID={activePointBookmarkID}
      pointBookmarks={allPointBookmarks}

      setActivePointBookmarkID={setActivePointBookmarkID}
      setPointBookmarkData={setPointBookmarkData}

      activeToolMode={activeToolMode}
      setActiveToolMode={setActiveToolMode}

      renderData={renderData}
      setRenderData={setRenderData}
    />),
    [InspectorModes.PointPolygonInspector]: (<AreaEditorPanel
      pointPolygons={allPointPolygons}
      setPointPolygonData={setPointPolygonData}

      polygonGroups={allPolygonGroups}
      setPolygonGroups={setPolygonGroup}

      activeToolMode={activeToolMode}
      setActiveToolMode={setActiveToolMode}

      renderData={renderData}
      setRenderData={setRenderData}

      activePointPolygonID={activePolygonID}
      setActivePointPolygonID={setActiveAreaID}
    />),
    [InspectorModes.GroupInspector]: (<NotImplementedPanel name={"Group Inspector"} />),
    [InspectorModes.SamplePointsInspector]: (<SamplePointInspector
      activePointFieldID={activePointFieldID}
      setActivePointFieldID={setActivePointFieldID}

      pointFields={allPointFields}
      setPointFieldData={setPointFieldData}

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

    if (newInspector === InspectorModes.PointBookmarkInspector) {
      setActiveToolMode(ToolModes.PointBookmarkGeneral);
    }

    if (newInspector === InspectorModes.PointPolygonInspector) {
      setActiveToolMode(ToolModes.PointPolygonAppend);
    }

    if (newInspector === InspectorModes.PathInspector) {
      setActiveToolMode(ToolModes.PointPathAppend);
    }

    setInspector(newInspector);
    setShowInspector(true);
  };


  const handleSaveLocationToFileSystem = useCallback(() => {
    if (window.projectFilepath === undefined) {
      console.error("Save Location was called while a projectFilepath was not loaded")
      return;
    }

    const data: LoadedLocationPayload = {
      name: locationName,
      projectDirpath: projectDirpath,
      saveTime: (new Date).toISOString(),
      
      bookmarks: allPointBookmarks,
      paths: allPointPaths,
      polygons: allPointPolygons,
      groups: allPolygonGroups,
      fields: allPointFields,
      imageMaps: allImageMaps,

      locationCorners: window.locationCorners!,
      renderData: renderData,
      projectFilepath: window.projectFilepath!,
    }

    window.api.request(toMainEvents.saveLocation, { data });

    handleSetIsDirty(false);
  }, [allPointBookmarks, allPointPaths, allPointPolygons, allPointFields, allImageMaps, renderData])

  useEffect(() => {
    window.addEventListener(windowEvents.SaveLocationToFileSystem, handleSaveLocationToFileSystem);

    return () => {
      window.removeEventListener(windowEvents.SaveLocationToFileSystem, handleSaveLocationToFileSystem);
    }
  }, [handleSaveLocationToFileSystem]);

  window.api.response(fromMainEvents.loadLocation, (args: any) => {
    const data = args.data as LoadedLocationPayload;
    setLocationName(data.name ?? "error")
    setProjectDirPath(data.projectDirpath ?? "error")
    setAllPointBookmarks(data.bookmarks ?? []);
    setAllPointPolygons(data.polygons ?? []);
    setAllPointPaths(data.paths ?? []);
    setAllPointFields(data.fields ?? []);
    setAllImageMapData(data.imageMaps ?? []);
    setAllPolygonGroups(data.groups ?? [])
    setRenderData(data.renderData);

    window.locationCorners = data.locationCorners;
    window.projectDirpath = data.projectDirpath;
    window.projectFilepath = data.projectFilepath;

    setLocationNameEvent({ name: data.name })
  });

  return (
    <>
      <VStack>
        <Wrapper>
          <HStack>
            <Toolbar
              upperElements={[
                { text: "Point Bookmark Editor", icon: (<QuestionMarkSVG color="white" width={"12"} />), mode: InspectorModes.PointBookmarkInspector },
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
              renderData={renderData}

              activePointBookmarkID={activePointBookmarkID}
              pointBookmarks={allPointBookmarks}
              setPointBookmark={setPointBookmarkData}

              activePointPolygonID={activePolygonID}
              pointPolygons={allPointPolygons}
              setPointPolygon={setPointPolygonData}

              pointPaths={allPointPaths}
              setPointPath={setPointPathData}

              pointFields={allPointFields}
              setPointField={setPointFieldData}

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