import React, { useState } from "react";
import { PointFieldData } from "../../Types/PointFieldData";
import { SamplePointData } from "../../Types/SamplePointData";
import { SamplePoint, Tooltip } from "./PointField.styles";

interface SamplePointViewProps {
  data: PointFieldData;
  zoom: number;
  renderData: ViewportRenderData;
}

const PointField = (props: SamplePointViewProps) => {
  const [selectedPoint, setSelectedPoint] = useState<SamplePointData | null>(null);

  const handleMouseOver = (event: React.MouseEvent<SVGCircleElement>, id: number) => {
    setSelectedPoint(props.data.points[id])
  };

  const handleMouseOut = () => {
    setSelectedPoint(null);
  };

  return (
    <>
      {props.data.points.map((point, id) => {
        return (
          <SamplePoint
            index={point.id} key={id}
            width={props.renderData.pointFieldRadius} height={props.renderData.pointFieldRadius}
            x={point.x} y={point.y} radius={props.renderData.pointFieldRadius}>
            <circle
              fill={props.data.color}
              cx={props.renderData.pointFieldRadius / 2}
              cy={props.renderData.pointFieldRadius / 2}
              r={props.renderData.pointFieldRadius / 2}
              onMouseOver={(event) => handleMouseOver(event, point.id)}
              onMouseOut={handleMouseOut}
            />
          </SamplePoint>
        );
      })}
      <Tooltip style={
        {
          top: selectedPoint?.y,
          left: selectedPoint?.x,
          display: selectedPoint ? "block" : "none",
          fontSize: `${12 / props.zoom}px`,
          padding: `${6 / props.zoom}px`,
          borderRadius: `${4 / props.zoom}px`
        }
      }>
        Point {selectedPoint?.id}: ({selectedPoint?.x}, {selectedPoint?.y}, {selectedPoint?.elevation})
      </Tooltip>
    </>
  );
};

export default PointField;