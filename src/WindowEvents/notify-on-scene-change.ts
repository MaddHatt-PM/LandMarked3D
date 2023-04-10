import windowEvents from "./window-events"

const notifyOnSceneChange = () => {
  window.dispatchEvent(new CustomEvent(windowEvents.NotifyOnLocationIsDirty.valueOf()))
}