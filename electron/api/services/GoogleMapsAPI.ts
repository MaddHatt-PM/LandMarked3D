import { GetDataFromPoint, GetImageryFromRect, ImageryPrepAPIUrls, RequestCostType } from "../APIDetails";
import { ApiBase } from "../APIBase"

import * as fs from "fs"
import * as path from "path";
import * as https from "https";
import * as sharp from "sharp";
import { promisify } from "util";

const getElevationData: GetDataFromPoint = {
  name: "Elevation from Points",
  description: "Projection method: Mercator",
  modifiedKeys: ["elevation"],
  requestCostType: RequestCostType.perRequest,

  prepareAPIUrls: (points: Point[]) => {
    if (points === undefined || points.length === 0) {
      console.log("getElevationData was called with 0 points");
      return [];
    }

    const urlBase = "https://maps.googleapis.com/maps/api/elevation/json?locations=";
    const urlApiKey = `&key=${"Seperate out store stuff"}`;
    const formatPoint = (p: Point) => `${p.x}%2C${p.y}`;
    const seperator = "%7C";

    const maxPointsPerRequest = 250;
    const pointBins: Point[][] = [];
    for (let i = 0; i < points.length; i + maxPointsPerRequest) {
      pointBins.push(points.slice(i, i + maxPointsPerRequest));
    }

    const urls: string[] = pointBins
      .map((bin) => bin.map((p) => formatPoint(p)).join(seperator))
      .map((urlLocation) => urlBase + urlLocation + urlApiKey);

    return urls;
  },

  prepareValidationTest: function (): boolean {
    throw new Error("Function not implemented.");
  },

  handleAPIPayload: function (data: any[]): void {
    throw new Error("Function not implemented.");
  }
}


const tau = 2 * Math.PI
const degree = Math.PI / 180;

const maxSize = 640;
const zoomOffset = 8;
const logoCutOff = 32;
const writeFile = promisify(fs.writeFile);

const geoToPixel = (lon: number, lat: number, zoom: number) => {
  const mx = lon
  const my = Math.log(Math.tan((lat + Math.PI / 2) / 2))
  const res = Math.pow(2, zoom + zoomOffset) / tau
  const px = mx * res
  const py = my * res
  return [px, py]
}

const pixelToGeo = (px: number, py: number, zoom: number) => {
  const mx = px / (Math.pow(2, zoom + zoomOffset) / tau)
  const my = py / (Math.pow(2, zoom + zoomOffset) / tau)
  const lat = (2 * Math.atan(Math.exp(my)) - Math.PI / 2) / degree
  const lon = mx * degree
  return [lon, lat]
}

const getSatelliteImagery: GetImageryFromRect = {

  name: "Satellite Imagery",
  description: "TODO",
  filePrefix: "goolemaps-",
  requestCostType: RequestCostType.perRequest,

  prepareAPIUrls: (rect: ImageryPrepAPIUrls, props): string[] => {
    const zoom = 19

    // Calculate image dimensions
    const [xNW, yNW] = geoToPixel(rect.NW.lon * degree, rect.NW.lat * degree, zoom);
    const [xSE, ySE] = geoToPixel(rect.SE.lon * degree, rect.SE.lat * degree, zoom);

    const totalWidth = Math.abs(xNW - xSE);
    const totalHeight = Math.abs(yNW - ySE);

    // Calculate image regions
    const cols = Math.ceil(totalWidth / maxSize);
    const rows = Math.ceil(totalHeight / maxSize);
    const imageCount = cols * rows;


    // Prepare tile regions
    const tileWidth = Math.ceil(totalWidth / cols);
    const tileHeight = Math.ceil(totalHeight / rows);

    const tiles: { r: number, c: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        tiles.push({ r, c })
        console.log({ r, c })
      }
    }

    const baseURL = "https://maps.google.com/maps/api/staticmap"
    const baseParams = {
      key: `${process.env.GoogleMapsKey}`,
      zoom: `${zoom}`,
      maptype: "satellite",
      sensor: "false",
      scale: "1",
    }

    const widthStep = (rect.SE.lon - rect.NW.lon) / cols
    const widthOffset = widthStep / 2;
    const heightStep = (rect.SE.lat - rect.NW.lat) / rows
    const heightOffset = heightStep / 2;

    const urls = tiles.map((tile) => {

      const center = {
        lon: widthOffset + tile.c * widthStep,
        lat: heightOffset + tile.r * heightStep
      }

      const params = {
        ...baseParams,
        center: `${rect.NW.lat + center.lat},${rect.NW.lon +center.lon}`,
        // center: `${rect.NW.lat - geoCenterY},${rect.NW.lon + geoCenterX}`,
        size: `${tileWidth}x${tileHeight + logoCutOff}`
      }

      return `${baseURL}?${(new URLSearchParams(params)).toString()}`
    })

    console.log(urls)
    return urls;
  },

  validationTest: () => {
    throw new Error("Function not implemented.");
  },

  handleAPIRequest: (urls: string[], dirPath: string, props?: Record<string, any>) => {

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    const imageFilepaths: string[] = []

    const promises = urls.map((url, index) => {
      const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')
      const filepath = path.join(dirPath, `temp-maptile-${zeroPad(index, 4)}.png`)
      const file = fs.createWriteStream(filepath);
      imageFilepaths.push(filepath);

      return new Promise<void>((resolve, reject) => {
        https.get(url, response => {
          response.pipe(file);
          file.on('finish', () => {
            file.close();

            // Delay between downloads
            setTimeout(() => { }, 100);

            let width = 0;
            let height = 0;
            sharp(filepath).metadata()
              .then((metadata) => {
                width = metadata.width ?? 0
                height = metadata.height ?? 0
              }).then(() => {

                // Crop image
                sharp(filepath)
                  .extract({ left: 0, top: 0, width: width, height: height - logoCutOff })
                  .toBuffer()
                  .then((data: string | NodeJS.ArrayBufferView) => writeFile(filepath, data))
                  .then(() => {
                    resolve();
                  })
                  .catch((err: any) => {
                    console.error(err);
                    reject(err);
                  });
              });
          });
        });
      });
    });

    Promise.all(promises)
      .then(() => {
        console.log("finished!")
      })
      .catch((err) => {
        console.error(err);
      })
  }
}


export const GoogleMapsAPI = new ApiBase({
  name: "Google Maps",
  description: "TODO",

  requiresKey: true,
  getDataFromPoint: [
    getElevationData
  ],
  getImageryFromRect: [
    getSatelliteImagery
  ],
})