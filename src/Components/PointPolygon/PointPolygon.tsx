import React, { useEffect, useRef, useState } from "react";
import { PointPolygonData } from "../../Types/PointPolygonData";
import * as d3 from 'd3';
import { SamplePointData } from "../../Types/SamplePointData";

interface PointPolygonProps {
  data: PointPolygonData;
  position: { x: number, y: number };
  zoom: number;
  isAlreadyDragging: boolean;

  id: number;
  isActive: boolean;
  renderData: ViewportRenderData
  setPointPolygon: (id: number, pointPolygon: PointPolygonData) => void;
}

const PointPolygon = (props: PointPolygonProps) => {
  const [activePointID, setActivePoint] = useState<number | null>(null);
  const [deltaChange, setDeltaChange] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const [deltaPoints, setDeltaPoints] = useState<SamplePointData[] | null>(null)
  const placementPointRef = useRef<SVGCircleElement | null>(null);

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

      const lastIndex = props.data.points.length - 1;
      const prevIndex = (activePointID === 0) ? lastIndex : activePointID - 1;
      const nextIndex = (activePointID === lastIndex) ? 0 : activePointID + 1;

      const activePoint = { ...props.data.points[activePointID] };
      activePoint.x += newDelta.x;
      activePoint.y += newDelta.y;

      setDeltaPoints([props.data.points[prevIndex], activePoint, props.data.points[nextIndex]]);
    }
  }

  const handleMouseUp = (index: number, event: React.MouseEvent<SVGCircleElement>) => {
    if (activePointID === index) {
      const newPoints = [...props.data.points];
      newPoints[index].x += deltaChange.x;
      newPoints[index].y += deltaChange.y;

      const updatedPolygon = {
        ...props.data,
        points: newPoints,
      }

      props.setPointPolygon(props.id, updatedPolygon)
      setActivePoint(null);
      setDeltaChange({ x: 0, y: 0 })
      event.currentTarget.setAttribute("transform", `translate(${0} ${0})`);
    }
  }

  const canAcceptPointerEvents = () => {
    // if (props.is)
  }

  return (
    <>
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", overflow: "visible", top: "0", left: "0", pointerEvents: "none" }}
      >
        {/* Polygon lines for dragged lines */}
        <polyline
          stroke={d3.color(props.data.color)?.darker(0.5).formatHex() ?? "white"}
          strokeWidth={props.renderData.strokeWidth / props.zoom}
          strokeLinejoin="round"
          strokeLinecap="round"
          fillOpacity={0.0}
          points={deltaPoints?.map((p) => `${p.x},${p.y}`).join(' ') ?? "0,0 0,0 0,0"}
          strokeDasharray={`${props.renderData.strokeWidth},${props.renderData.strokeWidth * 2}`}
          strokeDashoffset={100}
          strokeOpacity={activePointID !== null ? 1 : 0}
          style={{ animation: "dash 2000s linear forwards" }}
        />

        {/* Polygon fill */}
        <polygon
          fill={props.data.color}
          fillOpacity={0.25}
          points={props.data.points.map((p) => `${p.x},${p.y}`).join(' ')}
        />

        {/* Polygon stroke */}
        <polyline
          stroke={d3.color(props.data.color)?.brighter(0.5).formatHex() ?? "white"}
          strokeWidth={props.renderData.strokeWidth / props.zoom}
          strokeLinejoin='round'
          strokeLinecap='round'
          fill="transparent"
          points={props.data.points.map((p) => `${p.x},${p.y}`).join(' ')}
        />

        {/* Polygon stroke to last and first vertex */}
        {props.data.points.length > 2 &&
          <polyline
            stroke={d3.color(props.data.color)?.brighter(0.5).formatHex() ?? "white"}
            strokeWidth={props.renderData.strokeWidth / props.zoom}
            strokeLinejoin='round'
            strokeLinecap='round'
            fill="transparent"
            strokeDasharray={props.renderData.lastLineAsSolid || props.isActive === false
              ? ''
              : `${props.renderData.strokeWidth},${props.renderData.strokeWidth * 2}`}
            points={`${props.data.points[props.data.points.length - 1].x},${props.data.points[props.data.points.length - 1].y} ${props.data.points[0].x},${props.data.points[0].y}`}
          />
        }

        {/* Event catcher for point interaction */}
        {props.isActive &&
          props.data.points.map((p, index) => (
            <circle
              key={index}
              cx={p.x}
              cy={p.y}
              r={props.renderData.vertexRadius / props.zoom * (activePointID === index ? 40 : 1.0)}
              fill={"transparent"}
              cursor={"pointer"}
              style={{ pointerEvents: props.isAlreadyDragging && activePointID !== index ? "none" : "all" }}
              onMouseMove={(event) => handleMouseMove(index, event)}
              onMouseDown={(event) => handleMouseDown(index, event)}
              onMouseUp={(event) => handleMouseUp(index, event)}
              onMouseLeave={(event) => handleMouseUp(index, event)}
            />
          ))
        }

        {/* Point Vertices (Visual Only) */}
        {props.isActive &&
          props.data.points.map((p, index) => (
            <circle
              key={index + " visual"}
              cx={p.x}
              cy={p.y}
              r={props.renderData.vertexRadius / props.zoom * (activePointID === index ? 1.0 : 1.0)}
              stroke={props.data.color}
              fill={activePointID === index
                ? props.data.color
                : d3.color(props.data.color)?.darker(1.0).formatHex() ?? "black"}
              strokeWidth={4 / props.zoom}
            />
          ))}

        {/* Visual for dragging the active Point Vertex */}
        {activePointID !== null &&
          <circle
            ref={placementPointRef}
            cx={props.data.points[activePointID].x}
            cy={props.data.points[activePointID].y}
            r={props.renderData.vertexRadius}
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