import React, { useEffect, useRef, useState } from "react";
import { PointPolygonData } from "../../Types/PointPolygonData";
import { Container } from "./PointPolygon.styles";
import * as d3 from 'd3';
import { zoom } from "d3";
import { SamplePointData } from "../../Types/SamplePointData";

interface PointPolygonProps {
  data: PointPolygonData;
  position: { x: number, y: number };
  zoom: number;
  isAlreadyDragging: boolean;
}

const PointPolygon = (props: PointPolygonProps) => {
  const [points, setPoints] = useState(props.data.points);
  const [activePointID, setActivePoint] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);


  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const polygon = svg
      .insert('polygon', ":first-child")
      .attr('stroke', d3.color(props.data.color)?.brighter(0.5).formatHex() ?? "white")
      .attr('stroke-width', 4 / props.zoom)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('fill', props.data.color)
      .attr('fill-opacity', 0.25)

    const updatePolygon = () => {
      polygon.attr('points', points.map((p) => `${p.x},${p.y}`).join(' '));
    };

    updatePolygon();

    return () => {
      polygon.remove();
    };
  }, [points, props.data.color, props.zoom]);



  const handleMouseDown = (index: number, event: React.MouseEvent<SVGCircleElement>) => {
    if (activePointID === null) {
      setActivePoint(index);
    }
  }

  
  const handleMouseMove = (index: number, event: React.MouseEvent<SVGCircleElement>) => {
    if (activePointID === index) {
      const rect = event.currentTarget.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const svgCenterX = rect.width / 2;
      const svgCenterY = rect.height / 2;

      const deltaX = mouseX - svgCenterX;
      const deltaY = mouseY - svgCenterY;

      const newPoints = [...points];
      newPoints[index].x = newPoints[activePointID].x + deltaX / props.zoom;
      newPoints[index].y = newPoints[activePointID].y + deltaY / props.zoom;

      setPoints(newPoints);
    }
  }

  const handleMouseUp = (index: number, event: React.MouseEvent<SVGCircleElement>) => {
    console.log("??????")
    setActivePoint(null);
  }

  const radius = 8;

  return (
    <>
      <svg
        width="100%"
        height="100%"
        ref={svgRef}
        style={{ position: "absolute", overflow: "visible", top: "0", left: "0", pointerEvents: "none" }}
      >
        {points.map((p, index) => (
          <circle
            key={index}
            cx={p.x}
            cy={p.y}
            r={radius / props.zoom * (activePointID === index ? 10 : 1.0)}
            fill="#cb1d1d23"
            style={{ pointerEvents: props.isAlreadyDragging && activePointID !== index ? "none" : "all" }}
            onMouseDown={(event) => handleMouseDown(index, event)}
            onMouseMove={(event) => handleMouseMove(index, event)}
            onMouseUp={(event) => handleMouseUp(index, event)}
            onMouseLeave={(event) => handleMouseUp(index, event)}
          />
        ))}
        {points.map((p, index) => (
          <circle
            key={index + " visual"}
            cx={p.x}
            cy={p.y}
            r={radius / props.zoom * (activePointID === index ? 1.125 : 1.0)}
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth={1}
            style={{ pointerEvents: "none" }}
          />
        ))}
      </svg>
    </>
  );
};

export default PointPolygon;