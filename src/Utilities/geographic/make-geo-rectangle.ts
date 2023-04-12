import { GeoPoint } from "../../Types/GeoPoint";
import { LocationCorners } from "../../Types/LocationCorners";

interface MakeGeoRectangleProps {
  NW: GeoPoint;
  SE: GeoPoint;
}

const makeGeoRectangle = (props: MakeGeoRectangleProps): LocationCorners => {
  return {
    NW: props.NW,
    NE: { lon: props.SE.lon, lat: props.NW.lat },
    SW: { lon: props.NW.lon, lat: props.SE.lat },
    SE: props.SE,
  }
}

export default makeGeoRectangle;