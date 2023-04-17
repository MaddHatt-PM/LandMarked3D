import PointPolygon from "../../Components/PointPolygon/PointPolygon";
import getDistanceOfGeoPoints from "../../Utilities/geographic/get-distance-of-geopoints";
import { GeoPoint } from "../GeoPoint";
import { PointPolygonData } from "../PointPolygonData"
import * as d3 from "d3"
import { polygonArea } from "d3";


const getPerimeter = (pointPolygon: PointPolygonData) => {
  let distance = 0;

  for (let i = 0; i < pointPolygon.points.length - 1; i++) {
    const p1: GeoPoint = window.projectors.pixelToGeo(pointPolygon.points[i].x, pointPolygon.points[i].y)
    const p2: GeoPoint = window.projectors.pixelToGeo(pointPolygon.points[i + 1].x, pointPolygon.points[i + 1].y)
    distance += getDistanceOfGeoPoints(p1, p2);
  }

  const p1: GeoPoint = window.projectors.pixelToGeo(pointPolygon.points[0].x, pointPolygon.points[0].y)
  const lastIndex = pointPolygon.points.length - 1
  const p2: GeoPoint = window.projectors.pixelToGeo(pointPolygon.points[lastIndex].x, pointPolygon.points[lastIndex].y)
  distance += getDistanceOfGeoPoints(p1, p2);

  return distance;
}

const getArea = (pointPolygon: PointPolygonData) => {
  const coordinates = pointPolygon.points.map(o => {
    const geoPoint = window.projectors.pixelToGeo(o.x, o.y)
    return [geoPoint.lon, geoPoint.lat]
  })

  const orientation = d3.polygonArea(coordinates.map(([x,y]) => [x,y]))
  if (orientation < 0) {
    coordinates.reverse();
  }

  // Define the radius of the sphere in meters (assuming the Earth's radius)
  const RADIUS = 6371000; // meters

  // Convert steradians to meters^2
  return d3.geoArea({ type: "Polygon", coordinates: [coordinates] }) * RADIUS * RADIUS
}

const getConverage = (pointPolygon: PointPolygonData) => {
  const location: PointPolygonData = {
    name: "location",
    color: "#000",
    points: [
      { id: 0, x: 0, y: 0 },
      { id: 1, x: window.pixelSize.width, y: 0 },
      { id: 2, x: window.pixelSize.width, y: window.pixelSize.height },
      { id: 3, x: 0, y: window.pixelSize.height },
    ]
  }

  const locationArea = getArea(location)
  const polygonArea = getArea(pointPolygon)

  return polygonArea / locationArea
}

export const getPointPolygonInfo = (pointPolygon: PointPolygonData) => {
  return `
      Point count: ${pointPolygon.points.length}
      Perimeter: ${getPerimeter(pointPolygon).toFixed(3)}m
      Area: ${getArea(pointPolygon).toFixed(3)}m²
      Coverage: ${(getConverage(pointPolygon) * 100).toFixed(3)}%
    `
}