import { GetDataFromPoint, GetImageryFromRect, ImageryPrepAPIUrls, RequestCostType } from "../APIDetails";
import { ApiBase } from "../APIBase"

import * as fs from "fs"
import * as path from "path";
import * as https from "https";
import * as sharp from "sharp";
import { promisify } from "util";
import compositeImageTiles from "../../utilities/composite-image-tiles";

interface ElevationResult {
  elevation: number;
  uuid: string;
  latitude: number;
  longitude: number;
}

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

    const maxPointsPerRequest = 250;
    const pointBins: Point[][] = [];
    for (let i = 0; i < points.length; i += maxPointsPerRequest) {
      pointBins.push(points.slice(i, i + maxPointsPerRequest));
    }

    const urlBase = "https://maps.googleapis.com/maps/api/elevation/json?locations=";
    const urlApiKey = `&key=${process.env.GoogleMapsKey}`;
    const formatPoint = (p: Point) => `${p.latitude}%2C${p.longitude}`;
    const separator = "%7C";

    const pointMap: Record<number, string> = {};
    const requestProps = pointBins.map((bin) => {
      const urlLocation = bin.map((p, id) => {
        pointMap[id] = p.uuid;
        return formatPoint(p);
      }).join(separator);
      return { url: urlBase + urlLocation + urlApiKey, pointMap };
    });

    return requestProps;
  },


  prepareValidationTest: function (): boolean {
    throw new Error("Function not implemented.");
  },

  handleAPIRequest: function (requestProps: any[]): void {
    /*
      - Google Documentation: https://developers.google.com/maps/documentation/elevation/start#maps_http_elevation_locations-py
      - Submit a single request using https://stackoverflow.com/questions/29418423/how-to-use-an-array-of-coordinates-with-google-elevation-api

      Google Elevation Request example:
      {
        'results': [
          { 'elevation': 358.2732746783741, 'location': { 'lat': 32.1111, 'lng': -82.1111 }, 'resolution': 9.543951988220215 },
          { 'elevation': 398.2074279785156, 'location': { 'lat': 36.2222, 'lng': -85.2222 }, 'resolution': 9.543951988220215 },
          ...
              ],
          'status': 'OK'
      }  
    */
    async function fetchElevations(data: any[]) {
      const results: ElevationResult[] = [];

      for (let i = 0; i < data.length; i++) {
        const { url, pointMap } = data[i];
        const response = await fetch(url);
        const json = await response.json();

        if (json.status !== "OK") {
          console.log(`Request failed for URL: ${url}`);
          continue;
        }

        for (let j = 0; j < json.results.length; j++) {
          const result = json.results[j];
          const { elevation, location } = result;
          const { lat, lng } = location;
          const uuid: string = pointMap[j];

          results.push({ elevation, uuid, latitude: lat, longitude: lng });
        }

        return results;
      }
    }

    fetchElevations(requestProps)
      .then((results) => console.log(results))
      .catch((error) => console.error(error));
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

  prepareAPIUrls: (rect: ImageryPrepAPIUrls, props) => {
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

    const urls: TileData[] = tiles.map((tile) => {

      const center = {
        lon: widthOffset + tile.c * widthStep,
        lat: heightOffset + tile.r * heightStep
      }

      const params = {
        ...baseParams,
        center: `${rect.NW.lat + center.lat},${rect.NW.lon + center.lon}`,
        size: `${tileWidth}x${tileHeight + logoCutOff}`
      }

      const tileData: TileData = {
        url: `${baseURL}?${(new URLSearchParams(params)).toString()}`,
        rowID: tile.r,
        colID: tile.c
      }

      return tileData
    })

    console.log(urls)
    return urls;
  },

  validationTest: () => {
    throw new Error("Function not implemented.");
  },

  handleAPIRequest: (tilesRaw: any[], dirPath: string, props?: Record<string, any>) => {
    const tiles = tilesRaw as TileData[];

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    const localTiles: TileData[] = []

    const prepareTiles = tiles.map((tile, index) => {
      const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')
      const filepath = path.join(dirPath, `${tile.colID}-${tile.rowID}-temp-maptile-${zeroPad(index, 3)}.png`)
      const file = fs.createWriteStream(filepath);
      localTiles.push({
        url: filepath,
        colID: tile.colID,
        rowID: tile.rowID
      });

      return new Promise<void>((resolve, reject) => {
        console.log(tile.url)
        https.get(tile.url, response => {
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
                // console.log(metadata)
              })
              .then(() => {

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
              })

          });
        });
      });
    });



    Promise
      .all(prepareTiles)
      .then(() => { console.log("finished image downloading") })
      .then(() => {
        compositeImageTiles({
          tiles: localTiles,
          options: {
            outputDir: dirPath,
            outputFilename: `googlemaps-satellite.png`,
          }
        })
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