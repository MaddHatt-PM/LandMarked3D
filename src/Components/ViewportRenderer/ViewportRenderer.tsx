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

interface ViewportRendererProps {
  activeToolMode: ToolModes;
  activePointPolygonID: number;

  renderData: ViewportRenderData;
  // setRenderData: (data: ViewportRenderData) => void;

  pointBookmarks: PointBookmarkData[];
  setPointBookmarks: (id: number, polygon: PointBookmarkData | undefined) => void;

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
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
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
    // const newZoom = Math.max(0.1, Math.min(5, zoom + (event.deltaY > 0 ? -0.1 : 0.1)));
    const newZoom = clamp(zoomDeltaIncrement, 5, zoom + (event.deltaY > 0 ? -zoomDeltaIncrement : zoomDeltaIncrement));
    setZoom(newZoom);

    // TODO: zoom to mouse cursor
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
        {props.renderData.displayPointFields &&
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
      </TransformableDiv>

    </Container>
  );
};

export default ViewportRenderer;