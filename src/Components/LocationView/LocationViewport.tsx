import React, { useState } from "react";
import { Container, EventCatcher, GridLines, Image, TransformableDiv } from "./LocationViewport.styles";

const LocationViewport = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button === 0 || (event.ctrlKey && event.button === 0)) {
      event.preventDefault();
      setIsDragging(true);
      setPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      event.preventDefault();
      const dX = (event.clientX - position.x);
      const dY = (event.clientY - position.y);
      setPosition({ x: event.clientX, y: event.clientY });
      setTranslateX(prevX => prevX + dX);
      setTranslateY(prevY => prevY + dY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const newZoom = Math.max(0.1, Math.min(5, zoom + (event.deltaY > 0 ? -0.1 : 0.1)));
    setZoom(newZoom);
  };

  return (
    <Container>
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

      </TransformableDiv>

      <EventCatcher
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
      />
    </Container>
  );
};

export default LocationViewport;