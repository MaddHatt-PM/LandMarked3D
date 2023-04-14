import d3 from "d3";
import { writeFile } from "fs";
import path, { resolve } from "path";
import getOffsetFromOrigin from "../utilities/geographic/get-offset-from-origin";

declare interface LoadedLocationPayload {
  name: string;
  projectPath: string;
  projectFilepath: string;
  pixelSize: { width: number, height: number };
  saveTime: string;
  locationCorners: any;

  bookmarks: any[];
  polygons: any[];
  groups: any[];
  paths: any[];
  fields: any[];
  imageMaps: any[];

  renderData: any;
}

enum OriginPoints {
  TopLeft,
  TopRight,
  Center,
  BottomRight,
  BottomLeft
}

enum DataFileType {
  NONE,
  JSON,
  CSV
}

enum ImageFileType {
  NONE,
  PNG,
  SVG
}

enum DistanceUnitType {
  Pixel,
  Feet,
  Meter,
}

interface ExportOptions {
  dataFileType: DataFileType;
  ImageFileType
  origin: OriginPoints;
  dirpath: string;
}

const toWritableData = (data: any, filetype: DataFileType) => {
  if (filetype === DataFileType.CSV) {
    const header = Object.keys(data[0]);
    const rows = data.map((d) => Object.values(d));
    return d3.csvFormat([header, ...rows]);
  }

  if (filetype === DataFileType.JSON) {
    return JSON.stringify(data);
  }

  throw new Error(`Unsupported filetype (${[filetype]}) was passed during export`);
}

const getDataExtension = (filetype: DataFileType) => {
  if (filetype === DataFileType.NONE) {
    throw new Error("getDataExtension of NONE was not supposed to be called")
  }

  if (filetype === DataFileType.CSV) {
    return 'csv'
  }

  if (filetype === DataFileType.JSON) {
    return 'json'
  }
}

interface MakeGeoProjectorsProps {
  NW: { lon: number, lat: number };
  SE: { lon: number, lat: number };
  width: number;
  height: number;
  origin: OriginPoints;
}

function makeGeoProjectors(props: MakeGeoProjectorsProps) {
  const { NW, SE, width, height, origin } = props;

  const originX = origin === OriginPoints.TopRight || origin === OriginPoints.Center || origin === OriginPoints.BottomRight ? width : 0;
  const originY = origin === OriginPoints.BottomLeft || origin === OriginPoints.BottomRight || origin === OriginPoints.Center ? height : 0;

  const pixelToGeoScalers = {
    xScale: d3.scaleLinear().domain([0, width]).range([NW.lon, SE.lon]),
    yScale: d3.scaleLinear().domain([0, height]).range([NW.lat, SE.lat]),
  }

  const geoToPixelScalers = {
    xScale: d3.scaleLinear().domain([NW.lon, SE.lon]).range([-originX, width - originX]),
    yScale: d3.scaleLinear().domain([SE.lat, NW.lat]).range([-originY, height - originY]),
  }

  const pixelToGeo = (x: number, y: number): { lon: number, lat: number } => {
    return {
      lon: pixelToGeoScalers.xScale(x),
      lat: pixelToGeoScalers.yScale(y)
    }
  }

  const geoToPixel = (lon: number, lat: number): { x: number, y: number } => {
    return {
      x: geoToPixelScalers.xScale(lon) + originX,
      y: geoToPixelScalers.yScale(lat) + originY,
    }
  }
  return { pixelToGeo, geoToPixel }
}

const exportProject = (args: any) => {
  const locationData: LoadedLocationPayload = args.loadedLocationPayload;
  const options: ExportOptions = args.exportOptions

  const corners = locationData.locationCorners;
  const { pixelToGeo, geoToPixel } = makeGeoProjectors({
    NW: { lon: corners.NW.lon, lat: corners.NW.lat },
    SE: { lon: corners.SE.lon, lat: corners.SE.lat },
    width: locationData.pixelSize.width,
    height: locationData.pixelSize.height,
    origin: options.origin
  })

  const savePolygons = new Promise<void>((resolve, reject) => {

  });

  const saveCorners = async (): Promise<void> => {
    if (options.dataFileType === DataFileType.NONE) {
      resolve();
    }

    const raw = locationData.locationCorners;
    const data = toWritableData(raw, options.dataFileType);
    const extension = getDataExtension(options.dataFileType)
    const filepath = path.join(options.dirpath, `Corners.${extension}`)

    return new Promise((resolve, reject) => {
      writeFile(filepath, data, (err) => {
        if (err) {
          reject(err);
        } else {
          // Provide export feedback
          resolve();
        }
      })
    })
  }

  const saveBookmarks = async (): Promise<void> => {
    const raw = locationData.bookmarks.map(o=> {
      const {lon, lat} = pixelToGeo(o.x, o.y);
      const {x,y} = geoToPixel(lon, lat);
      const offsets = getOffsetFromOrigin({point: o, origin: o})

      const output = {
        xPixel: x,
        yPixel: y,
        xFeet: offsets.xFeet,
        yFeet: offsets.yFeet,
        
        longitude: lon,
        latitude: lat
      }

      return output;
    })
  }


}

export default exportProject;
