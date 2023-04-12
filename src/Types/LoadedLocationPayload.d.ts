import { LocationCorners } from "./LocationCorners";
import { PointBookmarkData } from "./PointBookmarkData";
import { PointFieldData } from "./PointFieldData";
import { PointPathData } from "./PointPathData";
import { PointPolygonData } from "./PointPolygonData";

declare interface LoadedLocationPayload {
  name: string;
  projectPath: string;
  projectFilepath: string;
  saveTime: string;
  locationCorners: LocationCorners;

  bookmarks: PointBookmarkData[];
  polygons: PointPolygonData[];
  groups: PolygonGroupData[];
  paths: PointPathData[];
  fields: PointFieldData[];
  imageMaps: ImageMapData[];

  renderData: ViewportRenderData;
}