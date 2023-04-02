import { LoadedLocationPayload } from "../Types/LoadedLocationPayload";
import windowEvents from "./window-events";

export const saveLocationToFileSystem = () => {
  window.dispatchEvent(new CustomEvent(windowEvents.SaveLocationToFileSystem.valueOf()));
}