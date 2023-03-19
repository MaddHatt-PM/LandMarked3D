import React, { useEffect, useRef, useState } from "react";
import { PointPolygonData } from "../../Types/PointPolygonData";
import * as d3 from 'd3';
import { SamplePointData } from "../../Types/SamplePointData";

interface PointPolygonProps {
  data: PointPolygonData;
  position: { x: number, y: number };
  zoom: number;
  isAlreadyDragging: boolean;
}

const PointPolygon = (props: PointPolygonProps) => {
  const [radius, setRadius] = useState(6);
  const [points, setPoints] = useState(props.data.points);
  const [activePointID, setActivePoint] = useState<number | null>(null);
  const [deltaChange, setDeltaChange] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const [deltaPoints, setDeltaPoints] = useState<SamplePointData[] | null>(null)

  const svgRef = useRef<SVGSVGElement | null>(null);
  const placementPointRef = useRef<SVGCircleElement | null>(null);
  const deltaPolygonRef = useRef<SVGPolygonElement | null>(null);


  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const polygon = svg
      .insert('polygon', ":nth-child(2)")
      .attr('stroke', d3.color(props.data.color)?.brighter(0.5).formatHex() ?? "white")
      .attr('stroke-width', 4 / props.zoom)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('fill', props.data.color)
      .attr('fill-opacity', 0.25)
      .attr('points', points.map((p) => `${p.x},${p.y}`).join(' '));

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

      const dX = mouseX - svgCenterX;
      const dY = mouseY - svgCenterY;

      const newDelta = deltaChange;
      newDelta.x += dX / props.zoom;
      newDelta.y += dY / props.zoom;

      event.currentTarget.setAttribute("transform", `translate(${newDelta.x} ${newDelta.y})`);
      placementPointRef.current?.setAttribute("transform", `translate(${newDelta.x} ${newDelta.y})`);
      setDeltaChange(newDelta);


      const lastIndex = points.length - 1;
      const prevIndex = (activePointID === 0) ? lastIndex : activePointID - 1;
      const nextIndex = (activePointID === lastIndex) ? 0 : activePointID + 1;

      const activePoint = { ...points[activePointID] };
      activePoint.x += newDelta.x;
      activePoint.y += newDelta.y;

      setDeltaPoints([points[prevIndex], activePoint, points[nextIndex]]);
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

  return (
    <>
      <svg
        width="100%"
        height="100%"
        ref={svgRef}
        style={{ position: "absolute", overflow: "visible", top: "0", left: "0", pointerEvents: "none" }}
      >
        <polyline
          ref={deltaPolygonRef}
          stroke={d3.color(props.data.color)?.darker(0.5).formatHex() ?? "white"}
          strokeWidth={4 / props.zoom}
          strokeLinejoin="round"
          strokeLinecap="round"
          fillOpacity={0.0}
          points={deltaPoints?.map((p) => `${p.x},${p.y}`).join(' ') ?? "0,0 0,0 0,0"}
          strokeDasharray="10,10"
          strokeDashoffset={100}
          style={{ pointerEvents: "none", animation: "dash 2000s linear forwards" }}
        />

        {points.map((p, index) => (
          <circle
            key={index}
            cx={p.x}
            cy={p.y}
            r={radius / props.zoom * (activePointID === index ? 40 : 1.0)}
            fill={"transparent"}
            cursor={"pointer"}
            style={{ pointerEvents: props.isAlreadyDragging && activePointID !== index ? "none" : "all" }}
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
        {activePointID !== null &&
          <circle
            ref={placementPointRef}
            cx={points[activePointID].x}
            cy={points[activePointID].y}
            r={radius}
            fill={d3.color(props.data.color)?.darker(0.8).formatHex() ?? "black"}
            style={{
              transform: `translate(${deltaChange.x} ${deltaChange.y})`
            }}
          />
        }
      </svg>
    </>
  );
};

export default PointPolygon;