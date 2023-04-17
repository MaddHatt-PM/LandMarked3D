import windowEvents from "../../WindowEvents/window-events"

const exportProject = () => {
  console.log("ahppened")
  window.dispatchEvent(new CustomEvent(windowEvents.ExportProject.valueOf()))
}

export default exportProject;