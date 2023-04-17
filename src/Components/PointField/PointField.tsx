import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import { PointFieldData } from "../../Types/PointFieldData";
import { SamplePointData } from "../../Types/SamplePointData";
import { SamplePoint, Tooltip } from "./PointField.styles";

interface PointFieldViewProps {
  data: PointFieldData;
  zoom: number;
  renderData: ViewportRenderData;
}

const PointField = (props: PointFieldViewProps) => {
  const [selectedPoint, setSelectedPoint] = useState<SamplePointData | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const circleGroupRef = useRef<SVGGElement | null>(null);

  const handleMouseOver = (id: number) => {
    setSelectedPoint(props.data.points[id]);
  };

  const handleMouseOut = () => {
    setSelectedPoint(null);
  };

  useEffect(() => {
    const circleGroup = d3.select(circleGroupRef.current);

    const circles = circleGroup
      .selectAll("circle")
      .data(props.data.points, (d: any) => d.id);

    circles
      .attr("fill", props.data.color)
      .attr("r", props.renderData.pointFieldRadius / 2)
      .attr("cx", (d: any) => d.x + (props.renderData.pointFieldRadius * 0.25))
      .attr("cy", (d: any) => d.y + (props.renderData.pointFieldRadius * 0.25))

    circles
      .enter()
      .append("circle")
      .attr("fill", props.data.color)
      .attr("r", props.renderData.pointFieldRadius / 2)
      .attr("cx", (d: any) => d.x + (props.renderData.pointFieldRadius * 0.25))
      .attr("cy", (d: any) => d.y + (props.renderData.pointFieldRadius * 0.25))
      .attr("position", "absolute")

    circles
      .exit()
      .remove();

  }, [svgRef, circleGroupRef, props,]);

  return (
    <>
      <svg ref={svgRef} width="100%" height="100%" overflow={"visible"} >
        <g ref={circleGroupRef} />
      </svg>

      <Tooltip
        style={{
          top: selectedPoint?.y,
          left: selectedPoint?.x,
          display: selectedPoint ? "block" : "none",
          fontSize: `${12 / props.zoom}px`,
          padding: `${6 / props.zoom}px`,
          borderRadius: `${4 / props.zoom}px`,
        }}
      >
        <p>{`Point ID: ${selectedPoint?.id}`}</p>
        <p>{`Point X: ${selectedPoint?.x}`}</p>
        <p>{`Point Y: ${selectedPoint?.y}`}</p>
        <p>{`Point Details: ${selectedPoint?.details}`}</p>
      </Tooltip>
    </>
  );
};

export default PointField;