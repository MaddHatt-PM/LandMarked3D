import { PointPathData } from "../PointPathData";

export const getPointPathInfo = (pointPath: PointPathData) => {
  return `
    Point count: ${pointPath.points.length}
    Distance: ${"-"}m
  `;
}