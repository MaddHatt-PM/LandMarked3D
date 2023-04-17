import { writeFile, mkdirSync } from "fs";
import { resolve, join } from "path";
import getOffsetFromOrigin from "../../utilities/geographic/get-offset-from-origin";

import * as d3 from "d3";


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

export enum OriginPoints {
  TopLeft,
  TopRight,
  Center,
  BottomRight,
  BottomLeft
}

export enum DataFileType {
  NONE,
  JSON,
  CSV
}

export enum ImageFileType {
  NONE,
  PNG,
  SVG
}

export enum DistanceUnitType {
  Pixel,
  Feet,
  Meter,
}

interface ExportOptions {
  dataFileType: DataFileType;
  imageFileType: ImageFileType;
  origin: OriginPoints;
}

const flattenObject = (obj: object): object => {
  const flattened: any = {};

  const recurse = (current: any, key: string) => {
    for (const k in current) {
      const value = current[k];
      const newKey = key ? key + '.' + k : k;

      if (typeof value === 'object' && value !== null) {
        recurse(value, newKey);
      } else {
        flattened[newKey] = value;
      }
    }
  }

  recurse(obj, '');
  return flattened;
}

const toWritableData = (data: any, filetype: DataFileType) => {
  if (filetype === DataFileType.CSV) {
    return d3.csvFormat([flattenObject(data)]);
  }

  if (filetype === DataFileType.JSON) {
    return JSON.stringify(data, null, 2);
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

  const originPoint = pixelToGeo(originX, originY)

  const geoToPixel = (lon: number, lat: number): { x: number, y: number } => {
    return {
      x: geoToPixelScalers.xScale(lon) + originX,
      y: geoToPixelScalers.yScale(lat) + originY,
    }
  }
  return { pixelToGeo, geoToPixel, originPoint }
}

interface MakeFilePromiseProps {
  filepath: string;
  data: string;
  message?: string;
  onResolve?: () => void;
  onError?: () => void;
}
const makeFilePromise = (props: MakeFilePromiseProps): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    writeFile(props.filepath, props.data, (err) => {
      if (err) {
        console.error(err);
        props.onError?.();
      } else {
        // Provide export feedback
        props.onResolve?.();
        resolve();
      }
    })
  })
}

const exportProject = (args: any, exportDir: string, options: ExportOptions) => {
  const locationData: LoadedLocationPayload = args.data;
  const dirpath = join(exportDir, locationData.name)
  const corners = locationData.locationCorners;
  const { pixelToGeo, geoToPixel, originPoint } = makeGeoProjectors({
    NW: { lon: corners.NW.lon, lat: corners.NW.lat },
    SE: { lon: corners.SE.lon, lat: corners.SE.lat },
    width: locationData.pixelSize.width,
    height: locationData.pixelSize.height,
    origin: options.origin
  })


  const saveCorners = (): Promise<void> => {
    if (options.dataFileType === DataFileType.NONE) {
      console.log("Early resolve")
      resolve();
    }

    const raw = locationData.locationCorners;
    const data = toWritableData(raw, options.dataFileType)
    const extension = getDataExtension(options.dataFileType)
    const filepath = join(dirpath, `Corners.${extension}`)
    console.log(filepath)

    return new Promise((resolve, reject) => {
      writeFile(filepath, data, (err) => {
        if (err) {
          console.error(err);
        } else {
          // Provide export feedback
          console.log(filepath)
          resolve();
        }
      })
    })
  }

  const saveBookmarks = (): Promise<void> => {
    const raw = locationData.bookmarks.map(o => {
      const { lon, lat } = pixelToGeo(o.point.x, o.point.y);
      const { x, y } = geoToPixel(lon, lat);
      const offsets = getOffsetFromOrigin({ point: { lon, lat }, origin: originPoint })

      const output = {
        name: o.name,
        description: o.description,
        xPixel: x,
        yPixel: y,
        xFeet: offsets.xFeet,
        yFeet: offsets.yFeet,
        xMeter: offsets.xMeters,
        yMeter: offsets.yMeters,
        longitude: lon,
        latitude: lat,
        ...o.point.details
      }

      // if (o.point.details !== undefined) {
      //   output = { ...output, ...o.point.details }
      // }

      console.log(output)

      return output;
    })

    const data = toWritableData(raw, options.dataFileType);
    const extension = getDataExtension(options.dataFileType)
    const filepath = join(dirpath, `Bookmarks.${extension}`)

    return new Promise((resolve, reject) => {
      writeFile(filepath, data, (err) => {
        if (err) {
          console.error(err);
        } else {
          // Provide export feedback
          resolve();
        }
      })
    })
  }

  const savePolygons = (): Promise<void>[] => {
    const getPolygonGroupName = (polygon: any): string => {
      const group = locationData.groups.find(o => o.uuid === polygon.groupUUID);
      return group ? group.name : '';
    };

    return locationData.polygons.map((polygon) => {
      return new Promise<void>((resolve, reject) => {
        let points: any[] = [];
        polygon.points.forEach((o: any) => {
          console.log(o)
          const { lon, lat } = pixelToGeo(o.x, o.y);
          const { x, y } = geoToPixel(lon, lat);
          const offsets = getOffsetFromOrigin({ point: { lon, lat }, origin: originPoint })

          points.push({
            xPixel: x,
            yPixel: y,
            xFeet: offsets.xFeet,
            yFeet: offsets.yFeet,
            xMeter: offsets.xMeters,
            yMeter: offsets.yMeters,
            longitude: lon,
            latitude: lat,
            ...o.details ?? {}
          })
        });

        const raw = {
          name: polygon.name,
          group: getPolygonGroupName(polygon),
          points: points,
        }

        const data = toWritableData(raw, options.dataFileType);
        const extension = getDataExtension(options.dataFileType)
        const filename = `${raw.group ? `${raw.group}-` : ''}${raw.name}.${extension}`
        const filepath = join(dirpath, 'Polygon - Data', filename)

        return makeFilePromise({
          filepath, data,
          message: `Exported Polygon: ${filename}`,
        })
      });
    })
  }

  const saveGroups = (): Promise<void> => {
    const raw = locationData.groups.map((o, id) => {
      return {
        rank: id,
        name: o.name
      }
    });

    const data = toWritableData(raw, options.dataFileType);
    const extension = getDataExtension(options.dataFileType);
    const filename = `Polygon Group Hierarchy.${extension}`
    const filepath = join(dirpath, filename);

    return makeFilePromise({
      filepath, data,
      message: `Exported Polygon: ${filename}`,
    })
  }

  const savePaths = (): Promise<void>[] => {
    return [
      new Promise<void>((resolve, reject) => {
        resolve();

      })
    ];
  }

  const saveFields = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      resolve();

    });
  }
  // Make sure the output directories exists
  const subDirectories = [
    'Polygon - Data',
    'Polygon - Images',
    'Path - Data',
    'Field - Data - Sampled',
    'Field - Data - Interpolated'
  ]
  subDirectories.map(o => { mkdirSync(join(dirpath, o), { recursive: true }); })

  Promise.all([
    saveCorners(),
    saveGroups(),
    saveBookmarks(),
    ...savePolygons(),
    savePaths(),
    saveFields(),
  ])
    .then(() => {
      console.log("exporting completed")
    })
    .catch((err) => console.error(err))
}

export default exportProject;
