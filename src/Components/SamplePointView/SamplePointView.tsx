import React, { useState } from "react";
import { SamplePointData } from "../../Types/SamplePointData";
import { SamplePoint, Tooltip } from "./SamplePointView.styles";

interface SamplePointViewProps {
  data: SamplePointData[];
  zoom: number;
}

const SamplePointView = (props: SamplePointViewProps) => {
  const [selectedPoint, setSelectedPoint] = useState<SamplePointData | null>(null);

  const handleMouseOver = (event: React.MouseEvent<SVGCircleElement>, id: number) => {
    setSelectedPoint(props.data[id])
  };

  const handleMouseOut = () => {
    setSelectedPoint(null);
  };

  const radius = 6;

  return (
    <>
      {props.data.map((samplePoint) => {
        return (
          <SamplePoint
            index={samplePoint.id} key={samplePoint.id}
            width={radius} height={radius}
            x={samplePoint.x} y={samplePoint.y} radius={radius}>
            <circle
              fill="#860cdd"
              cx={radius / 2}
              cy={radius / 2}
              r={radius / 2}
              onMouseOver={(event) => handleMouseOver(event, samplePoint.id)}
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
          padding: `${8 / props.zoom}px`,
          borderRadius: `${4 / props.zoom}px`
        }
      }>
        Point {selectedPoint?.id}: ({selectedPoint?.x}, {selectedPoint?.y}, {selectedPoint?.elevation})
      </Tooltip>
    </>
  );
};

export default SamplePointView;