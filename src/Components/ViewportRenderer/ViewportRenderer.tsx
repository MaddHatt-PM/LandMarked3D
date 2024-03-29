import React, { useState } from "react";
import { SamplePointData } from "../../Types/SamplePointData";
import PointPolygon from "../PointPolygon/PointPolygon";
import PointField from "../PointField/PointField";
import { Container, EventCatcher, GridLines, Image, TransformableDiv } from "./ViewportRenderer.styles";
import { PointPolygonData } from "../../Types/PointPolygonData"
import { ToolModes } from "../../Pages/LocationViewerPage/ToolModes";
import { clamp } from "../../Utilities/math";
import appendPoint from "../../Types/PointPolygonData/ToolInteractions/append-point";
import { MouseButtons } from "../../Utilities/mouse-buttons";
import removePoint from "../../Types/PointGenericFunctions/remove-last-point";
import { PointFieldData } from "../../Types/PointFieldData";
import ImageView from "../ImageView/ImageView";
import { PointPathData } from "../../Types/PointPathData";
import PointPath from "../PointPath/PointPath";
import { PointBookmarkData } from "../../Types/PointBookmarkData";
import PointBookmark from "../PointBookmark/PointBookmark";
import isPointBookmarkInInvalidPosition from "../../Types/PointBookmarks/is-point-bookmark-in-invalid-position";
import { sendViewportCoordinatesEvent } from "../../WindowEvents/send-viewport-coordinates";
import { InspectorModes } from "../../Pages/LocationViewerPage/LocationViewerPage";

interface ViewportRendererProps {
  activeToolMode: ToolModes;
  activeInspector: InspectorModes

  renderData: ViewportRenderData;
  setRenderData: (data: ViewportRenderData) => void;

  activePointBookmarkID: number | null;
  pointBookmarks: PointBookmarkData[];
  setPointBookmark: (id: number, polygon: PointBookmarkData | undefined) => void;

  activePointPolygonID: number | null;
  pointPolygons: PointPolygonData[];
  setPointPolygon: (id: number, polygon: PointPolygonData | undefined) => void;

  pointPaths: PointPathData[];
  setPointPath: (id: number, polygon: PointPathData | undefined) => void;

  pointFields: PointFieldData[];
  setPointField: (id: number, field: PointFieldData) => void;

  imageMaps: ImageMapData[];
  setImageMap: (id: number, image: ImageMapData) => void;
}


const ViewportRenderer = (props: ViewportRendererProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const zoomDeltaIncrement = 0.05;

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button === MouseButtons.Middle || (event.ctrlKey && event.button === MouseButtons.Left)) {
      event.preventDefault();
      setIsDragging(true);
      setPrevPosition({ x: event.clientX, y: event.clientY });
      return;
    }

    const uiTransformEvent: UITransformEvent = {
      translateX: translateX,
      translateY: translateY,
      zoom: zoom,
      event: event,
    }

    if (props.activeToolMode === ToolModes.PointPolygonAppend && props.activePointPolygonID != null) {
      const activePointPolygon = props.pointPolygons[props.activePointPolygonID];

      if (event.button === MouseButtons.Left && props.renderData.displayPointPolygons) {
        appendPoint({
          activePointPolygonID: props.activePointPolygonID,
          activePointPolygon: activePointPolygon,
          uiTransformEvent: uiTransformEvent,
          setPointPolygon: props.setPointPolygon
        })
      }

      if (event.button === MouseButtons.Right) {
        removePoint({
          activePointGenericID: props.activePointPolygonID,
          activePointGeneric: activePointPolygon,
          indexToRemove: activePointPolygon.points.length - 1,
          setPointPolygon: props.setPointPolygon
        })
      }
    }

    if (props.activeToolMode === ToolModes.PointBookmarkGeneral) {
      const activeBookmarkID = props.activePointBookmarkID;
      if (activeBookmarkID !== null && isPointBookmarkInInvalidPosition(props.pointBookmarks[activeBookmarkID])) {
        const modified = { ...props.pointBookmarks[activeBookmarkID] };

        const cursorHeight = 32;
        modified.point.x = (event.clientX - translateX) / zoom;
        modified.point.y = (event.clientY - translateY - cursorHeight) / zoom;

        props.setPointBookmark(props.activePointBookmarkID!, modified);
        // x: (event.clientX - translateX) / zoom,
        //   y: (event.clientY - translateY - cursorHeight) / zoom,
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const cursorHeight = 32;
    sendViewportCoordinatesEvent({
      pixelX: (event.clientX - translateX) / zoom,
      pixelY: (event.clientY - translateY - cursorHeight) / zoom,
    })

    if (isDragging) {
      event.preventDefault();
      const { clientX, clientY } = event;
      const dX = clientX - prevPosition.x;
      const dY = clientY - prevPosition.y;
      setPrevPosition({ x: event.clientX, y: event.clientY });
      setTranslateX(prevX => prevX + dX);
      setTranslateY(prevY => prevY + dY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    // event.preventDefault();

    const { pointPolygonVertexRadius,
      pointPolygonStrokeWidth,
      pointFieldRadius,
      pointPathVertexRadius,
      pointPathStrokeWidth, } = props.renderData

    const diff = 0.5;

    if (event.shiftKey) {
      props.setRenderData({
        ...props.renderData,
        pointPolygonVertexRadius: clamp(0.1, 100, pointPolygonVertexRadius + (event.deltaY > 0 ? -diff : diff)),
        pointPolygonStrokeWidth: clamp(0.1, 100, pointPolygonStrokeWidth + (event.deltaY > 0 ? -diff : diff)),
        pointFieldRadius: clamp(0.1, 100, pointFieldRadius + (event.deltaY > 0 ? -diff : diff)),
        pointPathVertexRadius: clamp(0.1, 100, pointPathVertexRadius + (event.deltaY > 0 ? -diff : diff)),
        pointPathStrokeWidth: clamp(0.1, 100, pointPathStrokeWidth + (event.deltaY > 0 ? -diff : diff)),
      })
      return;
    }

    const newZoom = clamp(zoomDeltaIncrement, 5, zoom + (event.deltaY > 0 ? -zoomDeltaIncrement : zoomDeltaIncrement));
    const { clientX, clientY } = event.nativeEvent;
    const zoomFactor = newZoom / zoom;
    const offsetX = (clientX - translateX) * (1 - zoomFactor);
    const offsetY = (clientY - translateY) * (1 - zoomFactor);
    setZoom(newZoom);
    setTranslateX(prevX => prevX + offsetX);
    setTranslateY(prevY => prevY + offsetY);
  };

  return (
    <Container>
      <EventCatcher
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />
      <GridLines
        spacing={32}
        zoom={zoom}
        translateX={translateX}
        translateY={translateY}
      />
      <TransformableDiv
        zoom={zoom}
        translateX={translateX}
        translateY={translateY}
        draggable={false}
      >

        {/* Images go here */}
        {props.renderData.displayImageMaps &&
          props.imageMaps?.map((imageData, id) => {
            return (
              <ImageView
                key={id}
                imageMapData={imageData} />
            )
          })
        }

        {/* SVG Elements */}
        {props.renderData.displayPointFields && isDragging === false && props.activeInspector === InspectorModes.SamplePointsInspector &&
          props.pointFields?.map((field, id) => {
            return (
              <PointField
                key={id}
                data={field}
                zoom={zoom}
                renderData={props.renderData}
              />
            )
          })
        }

        {props.renderData.displayPointPaths &&
          props.pointPaths?.map((path, id) => {
            return (
              <PointPath
                key={id}
                data={path}
                position={{ x: translateX, y: translateY }}
                zoom={zoom}
                isAlreadyDragging={isDragging}
                renderData={props.renderData}
                activeToolMode={props.activeToolMode}
                id={id}
                isActive={id === props.activePointPolygonID}
                setPointPath={props.setPointPath}
              />
            )
          })
        }

        {props.renderData.displayPointPolygons &&
          props.pointPolygons?.map((polygon, id) => {
            return (
              <PointPolygon
                key={id}
                data={polygon}
                position={{ x: translateX, y: translateY }}
                zoom={zoom}
                isAlreadyDragging={isDragging}
                renderData={props.renderData}
                id={id}
                activeToolMode={props.activeToolMode}
                isActive={id === props.activePointPolygonID}
                setPointPolygon={props.setPointPolygon}
              />
            )
          })
        }

        {props.renderData.displayPointBookmarks &&
          props.pointBookmarks?.map((bookmark, id) => {
            return (
              <PointBookmark
                key={id}
                data={bookmark}
                position={{ x: translateX, y: translateY }}
                zoom={zoom}
                isAlreadyDragging={isDragging}
                renderData={props.renderData}
                id={id}
                activeToolMode={props.activeToolMode}
                isActive={id === props.activePointBookmarkID}
                setPointBookmark={props.setPointBookmark}
              />
            )
          })}
      </TransformableDiv>

    </Container>
  );
};

export default ViewportRenderer;