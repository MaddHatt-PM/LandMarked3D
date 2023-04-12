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
  const centerLon = (NW.lon + SE.lon) / 2;
  const centerLat = (NW.lat + SE.lat) / 2;

  console.log({ centerLon })
  console.log({ centerLat })

  // Currently bugged, values approach 0 at the center
  // const projection = geoMercator()
  //   .fitSize([width, height], {
  //     type: "Feature",
  //     geometry: {
  //       type: "Polygon",
  //       coordinates: [[
  //         [NW.lon, SE.lat],
  //         [SE.lon, SE.lat],
  //         [SE.lon, NW.lat],
  //         [NW.lon, NW.lat],
  //         [NW.lon, SE.lat]
  //       ]]
  //     },
  //     properties: {}
  //   })
  //   .translate([0,0]);



  // if (!projection) {
  //   throw new Error("Failed to create projection");
  // }

  const pixelToGeoScalers = {
    xScale: d3.scaleLinear().domain([0, width]).range([NW.lon, SE.lon]),
    yScale: d3.scaleLinear().domain([0, height]).range([NW.lat, SE.lat]),
  }

  const geoToPixelScalers = {
    xScale: d3.scaleLinear().domain([NW.lon, SE.lon]).range([0, width]),
    yScale: d3.scaleLinear().domain([SE.lat, NW.lat]).range([0, height]),

  }

  // const pixelToGeo = (x: number, y: number): { lon: number, lat: number } => {
  //   if (projection !== undefined && projection.invert !== undefined) {
  //     const output = projection.invert([x, y]) ?? [0, 0];
  //     return { lon: output[0], lat: output[1] };
  //   }

  //   throw new Error("Projection failed to initialize properly");
  // };

  const pixelToGeo = (x: number, y: number): { lon: number, lat: number } => {
    return {
      lon: pixelToGeoScalers.xScale(x),
      lat: pixelToGeoScalers.yScale(y)
    }
  }

  // const geoToPixel = (lon: number, lat: number): { x: number, y: number } => {
  //   if (projection !== undefined) {
  //     const output = projection([lon, lat]) ?? [0, 0]
  //     return { x: output[0], y: output[1] };
  //   }

  //   throw new Error("Projection failed to initialize properly");
  // };

  const geoToPixel = (lon: number, lat: number): { x: number, y: number } => {
    return {
      x: geoToPixelScalers.xScale(lon),
      y: geoToPixelScalers.yScale(lat)
    }
  }
  return { pixelToGeo, geoToPixel }
}

export default makeGeoProjectors;