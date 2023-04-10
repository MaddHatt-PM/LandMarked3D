import toMainEvents from "../../IPCEvents/ipc-to-main-events";

const loadLocation = (filepath?: string) => {
  if (filepath !== undefined) {
    window.api.request(toMainEvents.loadLocationWithKnownPath, { filepath: filepath! });
  } else {
    window.api.request(toMainEvents.loadLocationFromExplorer);
  }
}

export default loadLocation