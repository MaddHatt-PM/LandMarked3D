import { SamplePointData } from "../../Types/SamplePointData";
import generateUUID from "../generate-uuid";
import getDistanceOfGeoPoints from "./get-distance-of-geopoints";

interface MakeGeoGridProps {
  distanceMeters: number;
  extend?: number;
}

const makeGeoGrid = (props: MakeGeoGridProps) => {
  const { distanceMeters, extend = 0 } = props;
  const { width, height } = window.pixelSize;

  const bounds = {
    NW: window.locationCorners!.NW,
    SE: window.locationCorners!.SE
  };

  const { pixelToGeo, geoToPixel } = window.projectors

  // const stepsX = Math.ceil(geoToPixel(bounds.SE.lon, bounds.NW.lat).x / distanceMeters);
  // const stepsY = Math.ceil(geoToPixel(bounds.NW.lon, bounds.SE.lat).y / distanceMeters);

  let stepsX =  Math.ceil(getDistanceOfGeoPoints(window.locationCorners!.NW, window.locationCorners!.NE, 'm') / distanceMeters) 
  let stepsY =  Math.ceil(getDistanceOfGeoPoints(window.locationCorners!.NW, window.locationCorners!.SW, 'm') / distanceMeters) 

  console.log(window.pixelSize);
  console.log({ stepsX, stepsY })

  const gridPoints = [];

  for (let i = 0 - extend; i <= stepsX + extend; i++) {
    for (let j = 0 - extend; j <= stepsY + extend; j++) {
      const x = i * (window.pixelSize.width / stepsX);
      const y = j * (window.pixelSize.width / stepsX);

      // const { lon, lat } = pixelToGeo(x, y);
      // const { x: px, y: py } = geoToPixel(lat, lon);

      gridPoints.push({ x: x - extend, y: y - extend });
    }
  }


  const samplePoints: SamplePointData[] = gridPoints.map((o, id) => {
    return {
      x: o.x,
      y: o.y,
      uuid: generateUUID(),
      id: id,
      details: {
        placementMode: true,
      }
    }
  })

  return samplePoints;
}

export default makeGeoGrid;