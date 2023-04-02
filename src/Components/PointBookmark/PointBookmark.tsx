import React, { useRef, useState } from "react";
import * as d3 from 'd3';
import { MouseButtons } from "../../Utilities/mouse-buttons";
import { isBookmarkTool, ToolModes } from "../../Pages/LocationViewerPage/ToolModes";
import { PointBookmarkData } from "../../Types/PointBookmarkData";

interface PointBookmarkProps {
  data: PointBookmarkData;
  position: { x: number, y: number };
  zoom: number;
  isAlreadyDragging: boolean;

  activeToolMode: ToolModes;

  id: number;
  isActive: boolean;
  renderData: ViewportRenderData
  setPointBookmark: (id: number, pointBookmark: PointBookmarkData) => void;
}

const PointBookmark = (props: PointBookmarkProps) => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [deltaChange, setDeltaChange] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
  const placementPointRef = useRef<SVGCircleElement | null>(null);

  const handleMouseDown = (event: React.MouseEvent<SVGCircleElement>) => {
    if (event.button === MouseButtons.Left) {
      setIsInteracting(true);
    }
  }

  const handleMouseMove = (event: React.MouseEvent<SVGCircleElement>) => {
    if (event.button === MouseButtons.Left && isInteracting) {
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
    }
  }

  const handleMouseUp = (event: React.MouseEvent<SVGCircleElement>) => {
    if (event.button === MouseButtons.Left && isInteracting) {
      const modified = { ...props.data };
      modified.point.x += deltaChange.x;
      modified.point.y += deltaChange.y;

      props.setPointBookmark(props.id, modified)
      // setActivePoint(null);
      setIsInteracting(false);
      setDeltaChange({ x: 0, y: 0 })
      event.currentTarget.setAttribute("transform", `translate(${0} ${0})`);
    }
  }

  return (
    <svg
      width="100%"
      height="100%"
      style={{ position: "absolute", overflow: "visible", top: "0", left: "0", pointerEvents: "none" }}
    >

      {/* Event catcher for point interaction */}
      {isBookmarkTool(props.activeToolMode) && props.isActive &&
        <circle
          cx={props.data.point.x}
          cy={props.data.point.y}
          r={props.renderData.pointPolygonVertexRadius / props.zoom * (isInteracting ? 40 : 1.0)}
          fill={"transparent"}
          cursor={"pointer"}
          style={{ pointerEvents: props.isAlreadyDragging && !isInteracting ? "none" : "all" }}
          onMouseMove={(event) => handleMouseMove(event)}
          onMouseDown={(event) => handleMouseDown(event)}
          onMouseUp={(event) => handleMouseUp(event)}
          onMouseLeave={(event) => handleMouseUp(event)}
        />
      }

      {/* Base visual */}
      {
        <circle
          cx={props.data.point.x}
          cy={props.data.point.y}
          r={props.renderData.pointPolygonVertexRadius / props.zoom * (isInteracting ? 1.0 : 1.0)}
          stroke={props.data.color}
          fill={isInteracting
            ? props.data.color
            : d3.color(props.data.color)?.darker(1.0).formatHex() ?? "black"}
          strokeWidth={props.isActive && isBookmarkTool(props.activeToolMode) ? 4 / props.zoom : 0}
        />
      }

      {/* Visual for dragging the active Point Vertex */}
      {isBookmarkTool(props.activeToolMode) && isInteracting &&
        <circle
          ref={placementPointRef}
          cx={props.data.point.x}
          cy={props.data.point.y}
          r={props.renderData.pointPolygonVertexRadius}
          fill={d3.color(props.data.color)?.darker(0.8).formatHex() ?? "black"}
          style={{
            transform: `translate(${deltaChange.x} ${deltaChange.y})`
          }}
        />
      }
    </svg>
  );
};

export default PointBookmark;