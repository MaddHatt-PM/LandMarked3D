import { PointBookmarkData } from "../PointBookmarkData";

export const getPointBookmarkInfo = (pointBookmark: PointBookmarkData) => {
  return `
    Pixel-X: ${pointBookmark.point.x}
    Pixel-Y: ${pointBookmark.point.y}
  `
}