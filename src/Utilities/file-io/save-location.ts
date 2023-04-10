import windowEvents from "../../WindowEvents/window-events";

const saveLocation = () => {
  window.dispatchEvent(new CustomEvent(windowEvents.SaveLocationToFileSystem.valueOf()));
}

export default saveLocation;