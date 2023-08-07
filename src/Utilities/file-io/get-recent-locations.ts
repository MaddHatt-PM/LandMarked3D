import toMainEvents from "../../IPCEvents/ipc-to-main-events";

const getRecentLocations = () => {
  window.api.request(toMainEvents.getRecentLocations);
}

export default getRecentLocations;