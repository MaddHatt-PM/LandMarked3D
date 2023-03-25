import { GetDataFromPoint, RequestCostType } from "../../types/APIDetails"
import { ApiBase } from "../APIBase"

const getElevationData: GetDataFromPoint = {
  name: "Elevation from Points",
  description: "",
  modifiedKeys: ["elevation"],
  requestCostType: RequestCostType.perRequest,

  prepareRequests: (points: Point[]) => {
    if (points === undefined || points.length === 0) {
      console.log("getElevationData was called with 0 points")
      return [];
    }

    const urlPrefix = "https://maps.googleapis.com/maps/api/elevation/json?locations="
    const urlApiKey = `&key=${"Seperate out store stuff"}`
    const formatPoint = (p: Point) => `${p.x}%2C${p.y}`
    const seperator = "%7C"

    const maxPointsPerRequest = 250;
    const pointBins: Point[][] = [];
    for (let i = 0; i < points.length; i + maxPointsPerRequest) {
      pointBins.push(points.slice(i, i + maxPointsPerRequest));
    }

    const urls: string[] = pointBins
      .map((bin) => bin.map((p) => formatPoint(p)).join(seperator))
      .map((urlLocation) => urlPrefix + urlLocation + urlApiKey)

    return urls;
  },

  prepareValidationTest: function (): boolean {
    throw new Error("Function not implemented.")
  }
}

// = (points: Point[]) => {
// }

export const GoogleMapsAPI = new ApiBase({
  name: "Google Maps",
  description: "TODO",

  requiresKey: true,
  getDataFromPoint: [
    getElevationData
  ],
  getImageryFromRect: [],
})