import React, { useEffect, useRef, useState } from "react";
import { PointPolygonData } from "../../Types/PointPolygonData";
import { Container } from "./PointPolygon.styles";
import * as d3 from 'd3';
import { active, zoom } from "d3";
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
  const [deltaChange, setDeltaChange] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement | null>(null);
  const placementRef = useRef<SVGCircleElement | null>(null);


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

  const handleOnClick = (index: number, event: React.MouseEvent<SVGCircleElement>) => {
    if (activePointID === null) {
      handleMouseDown(index, event);
    } else {
      handleMouseUp(index, event);
    }
  }

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

      const dX = mouseX - svgCenterX;
      const dY = mouseY - svgCenterY;

      const newDelta = deltaChange;
      newDelta.x += dX / props.zoom;
      newDelta.y += dY / props.zoom;
      // console.log(event.currentTarget)
      event.currentTarget.setAttribute("transform", `translate(${newDelta.x} ${newDelta.y})`);
      placementRef.current?.setAttribute("transform", `translate(${newDelta.x} ${newDelta.y})`);
      setDeltaChange(newDelta);
    }
  }

  const handleMouseUp = (index: number, event: React.MouseEvent<SVGCircleElement>) => {
    if (activePointID === index) {
      const newPoints = [...points];
      newPoints[index].x += deltaChange.x;
      newPoints[index].y += deltaChange.y;
      setPoints(newPoints);
      setActivePoint(null);
      setDeltaChange({ x: 0, y: 0 })
      event.currentTarget.setAttribute("transform", `translate(${0} ${0})`);
    }
  }

  const radius = 6;

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
            r={radius / props.zoom * (activePointID === index ? 40 : 1.0)}
            // fill={d3.color(props.data.color)?.darker(0.8).formatHex() ?? "black"}
            fill={"transparent"}
            cursor={"pointer"}
            style={{ pointerEvents: props.isAlreadyDragging && activePointID !== index ? "none" : "all", animation: "all 0.3s linear" }}
            onMouseMove={(event) => handleMouseMove(index, event)}
            onMouseDown={(event) => handleMouseDown(index, event)}
            onMouseUp={(event) => handleMouseUp(index, event)}
            onMouseLeave={(event) => handleMouseUp(index, event)}
          />
        ))}
        {points.map((p, index) => (
          <circle
            key={index + " visual"}
            cx={p.x}
            cy={p.y}
            r={radius / props.zoom * (activePointID === index ? 1.0 : 1.0)}
            stroke={props.data.color}
            fill={activePointID === index
              ? props.data.color
              : d3.color(props.data.color)?.darker(1.0).formatHex() ?? "black"}
            strokeWidth={4 / props.zoom}
            style={{ pointerEvents: "none" }}
          />
        ))}
        {activePointID &&
          <circle
            ref={placementRef}
            cx={points[activePointID].x}
            cy={points[activePointID].y}
            r={radius}
            fill={d3.color(props.data.color)?.darker(0.8).formatHex() ?? "black"}
            style={{
              transform: `translate(${deltaChange.x} ${deltaChange.y})`
            }}
          // style={}
          />
        }
      </svg>
    </>
  );
};

export default PointPolygon;