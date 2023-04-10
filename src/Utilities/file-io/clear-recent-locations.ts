import toMainEvents from "../../IPCEvents/ipc-to-main-events"

const clearRecentLocations = () => {
  window.api.request(toMainEvents.clearRecentProjects);
}

export default clearRecentLocations;