import * as d3 from "d3";
import { GeoPoint } from "../../Types/GeoPoint";

interface MakeGeoProjectorsProps {
  NW: GeoPoint;
  SE: GeoPoint;
  width: number;
  height: number;
}

function makeGeoProjectors(props: MakeGeoProjectorsProps) {
  const { NW, SE, width, height } = props;

  const pixelToGeoScalers = {
    xScale: d3.scaleLinear().domain([0, width]).range([NW.lon, SE.lon]),
    yScale: d3.scaleLinear().domain([0, height]).range([NW.lat, SE.lat]),
  }

  const geoToPixelScalers = {
    xScale: d3.scaleLinear().domain([NW.lon, SE.lon]).range([0, width]),
    yScale: d3.scaleLinear().domain([SE.lat, NW.lat]).range([0, height]),

  }

  const pixelToGeo = (x: number, y: number): { lon: number, lat: number } => {
    return {
      lon: pixelToGeoScalers.xScale(x),
      lat: pixelToGeoScalers.yScale(y)
    }
  }

  const geoToPixel = (lon: number, lat: number): { x: number, y: number } => {
    return {
      x: geoToPixelScalers.xScale(lon),
      y: geoToPixelScalers.yScale(lat)
    }
  }
  return { pixelToGeo, geoToPixel }
}

export default makeGeoProjectors;