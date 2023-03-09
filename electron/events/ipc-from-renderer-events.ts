export const fromRendererEvents = {
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
};

// module.exports.fromRendererEvents = fromRendererEvents;