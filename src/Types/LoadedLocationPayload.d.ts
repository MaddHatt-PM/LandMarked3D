import { LocationCorners } from "./LocationCorners";
import { PointBookmarkData } from "./PointBookmarkData";
import { PointPathData } from "./PointPathData";
import { PointPolygonData } from "./PointPolygonData";

declare interface LoadedLocationPayload {
  locationCorners: LocationCorners;

  bookmarks: PointBookmarkData[];
  polygons: PointPolygonData[];
  paths: PointPathData[];
  imageMaps: ImageMapData[];

  renderData: ViewportRenderData;
}