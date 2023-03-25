import { PointPolygonData } from "../PointPolygonData"

export const getPointPolygonInfo = (pointPolygon: PointPolygonData) => {
  return `
      Point count: ${pointPolygon.points.length}
      Perimeter: ${"-"}m
      Area: ${"-"}m²
      Bounding box area: ${"-"}m2
      Coverage: ${"-"}%
    `
}