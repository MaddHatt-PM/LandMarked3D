import React, { useState } from "react";
import { SamplePointData } from "../../Types/SamplePointData";
import PointPolygon from "../PointPolygon/PointPolygon";
import SamplePointView from "../SamplePointView/SamplePointView";
import { Container, EventCatcher, GridLines, Image, TransformableDiv } from "./LocationViewport.styles";
import { PointPolygonData } from "../../Types/PointPolygonData"
import { ToolModes } from "../../Pages/LocationViewerPage/ToolModes";
import { clamp } from "../../Utilities/math";
import appendPoint from "../../Types/PointPolygonData/ToolInteractions/append-point";
import { MouseButtons } from "../../Utilities/mouse-buttons";
import removePoint from "../../Types/PointPolygonData/ToolInteractions/remove-last-point";

interface LocationViewportProps {
  activeToolMode: ToolModes;
  activePointPolygonID: number;

  renderData: ViewportRenderData;

  pointPolygons: PointPolygonData[]
  setPointPolygon: (id: number, data: PointPolygonData) => void;
  // setRenderData: (data: ViewportRenderData) => void;
}


const LocationViewport = (props: LocationViewportProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

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
          activePointPolygonID: props.activePointPolygonID,
          activePointPolygon: activePointPolygon,
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
    const newZoom = clamp(0.1, 5, zoom + (event.deltaY > 0 ? -0.1 : 0.1));
    setZoom(newZoom);

    // TODO: zoom to mouse cursor
  };

  const testSamplePointData: SamplePointData[] = [
    { id: 0, x: 0, y: 0, elevation: 10 },
    { id: 1, x: 5, y: 35, elevation: 10 },
    { id: 2, x: 15, y: 25, elevation: 20 },
    { id: 3, x: 25, y: 15, elevation: 30 },
    { id: 4, x: 35, y: 5, elevation: 40 },
  ]

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
        <Image src={"https://www.maptiler.com/img/maps/satellite/slider-2/slider-5.webp"} />
        <Image src="https://4.bp.blogspot.com/-xstBGhuD2gk/UA-73uP0isI/AAAAAAAAKGE/oq3-yqXs9rs/s1600/jotunheimen_contours.png" />

        {/* SVG Elements */}
        <SamplePointView
          data={testSamplePointData}
          zoom={zoom}
        />

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

export default LocationViewport;