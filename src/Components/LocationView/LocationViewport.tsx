import React, { useState } from "react";
import { SamplePointData } from "../../Types/SamplePointData";
import PointPolygon from "../PointPolygon/PointPolygon";
import SamplePointView from "../SamplePointView/SamplePointView";
import { Container, EventCatcher, GridLines, Image, TransformableDiv } from "./LocationViewport.styles";
import { PointPolygonData } from "../../Types/PointPolygonData"

const LocationViewport = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button === 0 || (event.ctrlKey && event.button === 0)) {
      event.preventDefault();
      setIsDragging(true);
      setPrevPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      event.preventDefault();
      const aspectRatio = window.innerWidth / window.innerHeight / 2;
      const {clientX, clientY} = event;
      const dX = (clientX - prevPosition.x) / aspectRatio;
      const dY = (clientY - prevPosition.y) / aspectRatio;
      setPrevPosition({ x: event.clientX, y: event.clientY });
      setTranslateX(prevX => prevX + dX);
      setTranslateY(prevY => prevY + dY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const newZoom = Math.max(0.1, Math.min(5, zoom + (event.deltaY > 0 ? -0.1 : 0.1)));
    setZoom(newZoom);
  };

  const testSamplePointData: SamplePointData[] = [
    { id: 0, x: 0, y: 0, elevation: 10 },
    { id: 1, x: 5, y: 35, elevation: 10 },
    { id: 2, x: 15, y: 25, elevation: 20 },
    { id: 3, x: 25, y: 15, elevation: 30 },
    { id: 4, x: 35, y: 5, elevation: 40 },
  ]

  const testPolygonData: PointPolygonData = {
    color: "#39dfe2",
    points: [
      { id: 0, x: 100, y: 100, elevation: 0 },
      { id: 0, x: 300, y: 100, elevation: 0 },
      { id: 0, x: 300, y: 300, elevation: 0 },
      { id: 0, x: 100, y: 300, elevation: 0 },
    ]
  }


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
      >

        {/* Items go here */}
        <Image src={"https://www.maptiler.com/img/maps/satellite/slider-2/slider-5.webp"} />
        <Image src="https://4.bp.blogspot.com/-xstBGhuD2gk/UA-73uP0isI/AAAAAAAAKGE/oq3-yqXs9rs/s1600/jotunheimen_contours.png" />

        {/* SVG Items go */}
        <SamplePointView
          data={testSamplePointData}
          zoom={zoom}
        />

        <PointPolygon
          data={testPolygonData}
          position={{x: translateX, y:translateY}}
          zoom={zoom}
          isAlreadyDragging={isDragging}
        />


      </TransformableDiv>


    </Container>
  );
};

export default LocationViewport;