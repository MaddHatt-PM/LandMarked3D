import toMainEvents from "../../IPCEvents/ipc-to-main-events";
import { GeoPoint } from "../../Types/GeoPoint";

interface TestAPIProps {
  NW: GeoPoint
  SE: GeoPoint
  dirpath: string
}

const testAPI = (props: TestAPIProps) => {
  window.api.request(toMainEvents.testApi, {
    NW: [props.NW.lon, props.NW.lat],
    SE: [props.SE.lon, props.SE.lat],
    dirpath: props.dirpath
  })
}

export default testAPI;