const toMainEvents = {
  systems: {
    // Window functions
    minimizeWindow: 'toggle-minimize-window',
    maximizeWindow: 'toggle-maximize-window',
    toggleAlwaysOnTop: 'toggle-always-on-top',
    closeWindow: 'close-window',

    // Electron-Specific
    windowAllClosed: 'window-all-closed',
    activate: 'activate',
    secondInstance: 'second-instance',
  },
  saveLocation: 'save-location',

  loadLocationWithKnownPath: 'load-location-with-known-path',
  setupLocationProject: 'setup-location-project',

  pickDirectory: 'pick-directory',
  pickDirectoryReport: 'pick-directory-report',
  loadLocationFromExplorer: 'load-location-from-explorer',
  checkDirectoryForProject: 'check-directory-for-project',
  requestRecentLocations: 'request-recent-locations',
  loadTestLocation: 'load-test-location',
  cloneLocation: 'clone-location',
  clearRecentProjects: 'clear-recent-projects',
};

export default toMainEvents;