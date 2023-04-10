import toMainEvents from "../../IPCEvents/ipc-to-main-events";

const checkDirectoryForProjectFile = (dirPath: string, recieverEvent: string) => {
  window.api.request(toMainEvents.checkDirectoryForProject, { dirPath, recieverEvent })
}

export default checkDirectoryForProjectFile;