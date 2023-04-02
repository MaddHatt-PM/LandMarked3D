import { LocationCorners } from "../LocationCorners";

export const isLocationCornersLoaded = (): boolean => {
  return window.locationCorners !== undefined;
}

const getLocationCorners = (): LocationCorners => {
  const locationCorners = window.locationCorners;
  if (locationCorners === undefined) {
    throw new Error("Location Corners was not loaded into the window");
  }

  return locationCorners;
}

export default getLocationCorners;