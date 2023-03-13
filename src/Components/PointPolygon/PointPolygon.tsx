import React, { useEffect, useRef, useState } from "react";
import { PointPolygonData } from "../../Types/PointPolygonData";
import { Container } from "./PointPolygon.styles";
import * as d3 from 'd3';
import { SamplePointData } from "../../Types/SamplePointData";

interface PointPolygonProps { 
  data: PointPolygonData;
  zoom: number;
}

const PointPolygon = (props: PointPolygonProps) => {
  const [points, setPoints] = useState(props.data.points);
  const svgRef = useRef<SVGSVGElement | null>(null);

  
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const makeLine = d3
      .line<SamplePointData>()
      .x((d: { x: number; }) => d.x)
      .y((d: { y: number; }) => d.y);

    const path = svg
      .append('path')
      // .attr('fill', props.data.color)
      .attr('stroke', d3.color(props.data.color)?.brighter(0.5).formatHex() ?? "white")
      .attr('stroke-width', 4 / props.zoom);

    const polygon = svg
      .append('polygon')
      .attr('fill', props.data.color);
      // .attr('stroke', strokeColor)
      // .attr('stroke-width', strokeWidth);

    const updatePolygon = () => {
      path.attr('d', makeLine(points) + 'Z');
      polygon.attr('points', points.map((p) => `${p.x},${p.y}`).join(' '));
    };

    updatePolygon();

    return () => {
      path.remove();
      polygon.remove();
    };
  }, [points, props.data.color, props.zoom]);


  const handlePointMove = (index: number, newX: number, newY: number) => {
    const newPoints = [...points];
    newPoints[index] = {...newPoints[index], x: newX, y: newY };
    setPoints(newPoints);
  };

  const handleMouseDown = (event: React.MouseEvent<SVGCircleElement>, index: number) => {
    event.preventDefault();
    const handleMouseMove = (event: MouseEvent) => {
      handlePointMove(index, event.clientX, event.clientY);
    };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <Container>
      <svg width="100%" height="100%" ref={svgRef}>
        {points.map((p, index) => (
          <circle
            key={index}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="#FFFFFF"
            // stroke="#000000"
            // strokeWidth={1}
            onMouseDown={(event) => handleMouseDown(event, index)}
          />
        ))}
      </svg>
    </Container>
  );
};

export default PointPolygon;