import toMainEvents from "../../IPCEvents/ipc-to-main-events";
import { GeoPoint } from "../../Types/GeoPoint";

interface GoogleMapsImageryProps {
  NW: GeoPoint
  SE: GeoPoint
  dirpath: string
}

export const testGoogleMapsImagery = (props: GoogleMapsImageryProps) => {
  window.api.request(toMainEvents.testGoogleMapsImagery, {
    NW: [props.NW.lon, props.NW.lat],
    SE: [props.SE.lon, props.SE.lat],
    dirpath: props.dirpath
  })
}

interface GoogleMapsElevationProps {

}

export const testGoogleMapsElevation = (props: GoogleMapsElevationProps) => {
  console.log("?")
  window.api.request(toMainEvents.testGoogleMapsElevation)
}
