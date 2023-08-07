enum windowEvents {
  NotifyOnLocationIsDirty = "notify-on-location-is-dirty",
  NotifyOnLocationIsClean = "notify-on-location-is-clean",
  RevertProjectToFile = "revert-project-to-file",
  SetScreenOverlay = "set-screen-overlay",
  DismissScreenOverlay = "dismiss-screen-overlay",
  SendViewportCoordinates = "send-viewport-coordinates",
  SaveLocationToFileSystem = "save-location-to-file-system",
  SetLocationName = "set-location-name",
  ExportProject = "export-project",
  onPreNavigate = "onPreNavigate",
}

export default windowEvents;