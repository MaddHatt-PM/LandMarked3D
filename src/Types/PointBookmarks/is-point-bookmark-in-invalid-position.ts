import { PointBookmarkData } from "../../Types//PointBookmarkData";

export const invalidBookmarkPosition = {
  x: -10000,
  y: -10000
}

const isPointBookmarkInInvalidPosition = (bookmarkData: PointBookmarkData) => {
  return bookmarkData.point.x < invalidBookmarkPosition.x + 100 || bookmarkData.point.y < invalidBookmarkPosition.y + 100;
}

export default isPointBookmarkInInvalidPosition;