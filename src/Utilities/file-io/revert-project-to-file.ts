import toMainEvents from "../../IPCEvents/ipc-to-main-events";


const revertProjectToFile = () => {
  if (window.projectFilepath) {
    console.log(window.projectFilepath)
    window.api.request(toMainEvents.loadLocationWithKnownPath, {filepath: window.projectFilepath})
  } else {
    console.error("revertProjectToFile was called while a project was not actively loaded.")
  }
}

export default revertProjectToFile;