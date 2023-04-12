import { app, BrowserWindow, dialog, ipcMain, ipcRenderer, protocol, session } from 'electron';
import * as path from 'path';
import os = require('os');
import isDev = require('electron-is-dev');
import { fromRendererEvents as fromRenderer } from './events/ipc-from-renderer-events';
import saveLocationToFileSystem from './systems/save-location-to-file-system';
import { loadLocationFromExplorer } from './systems/load-location-from-explorer';
import { loadLocationWithKnownPath } from './systems/load-location-with-known-path';
import { pickDirectory } from './systems/pick-directory';

import { checkDirectoryForProjectFile } from './systems/check-directory-for-project-file';
import getPreferencesStore from './stores/get-preferences-store';
import { requestRecentLocations } from './requestRecentLocations';
import { fstat } from 'fs';
import { clearRecentProjects } from './stores/get-recent-locations-store';
import { cloneLocation } from './systems/clone-location';
import { GoogleMapsAPI } from './api/services/GoogleMapsAPI';

require('dotenv').config();

const preferencesPath = {
  'darwin': 'mac', // Figure out best place to put it
  'win32': path.join('C:\\', 'users', os.userInfo().username, 'Documents', '2MinuteTabletop')
}

const store = getPreferencesStore();

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 400,
    titleBarStyle: "hidden",
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      preload: path.join(__dirname, "preload.js")
    },
  })

  // Load homepage
  window.loadURL(
    isDev ?
      "http://localhost:3000" :
      `file://${path.join(__dirname, "../build/index.html")}`
  );

  // if (app.isPackaged) {
  //   // 'build/index.html'
  //   window.loadURL(`file://${__dirname}/../index.html`);
  // } else {
  //   window.loadURL('http://localhost:3000/index.html');
  // }

  if (isDev) {
    window.webContents.openDevTools();
  }

  // Remote
  const remoteMain = require("@electron/remote/main");
  remoteMain.initialize();
  remoteMain.enable(window.webContents);

  // Hot Reloading on 'node_modules/.bin/electronPath'
  // require('electron-reload')(__dirname, {
  //   electron: path.join(__dirname,
  //     '..',
  //     '..',
  //     'node_modules',
  //     '.bin',
  //     'electron' + (process.platform === "win32" ? ".cmd" : "")),
  //   forceHardReset: true,
  //   hardResetMethod: 'exit'
  // });

  window.once('ready-to-show', () => {
    window.setBounds(store.get('windowBounds') as Electron.Rectangle);
    if (store.get('wasMaximized'))
      window.maximize();

    window.show();
  })

  // ------------------------------
  // ----Window-Events-------------
  ipcMain.on(fromRenderer.systems.minimizeWindow, function (event) {
    window.minimize();
  });

  ipcMain.on(fromRenderer.systems.maximizeWindow, function (event) {
    console.log('recieved')
    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }
  });

  ipcMain.on(fromRenderer.systems.toggleAlwaysOnTop, function (event) {
    window.setAlwaysOnTop(!window.isAlwaysOnTop())
  })

  ipcMain.on(fromRenderer.systems.closeWindow, function (event) {
    if (window.id === 1) {
      store.set('windowBounds', window.getBounds());
      store.set('wasMaximized', window.isMaximized());
    }
    console.log('saved info')
    window.close();
  });

  // ------------------------------
  // ----File-System-Events--------
  ipcMain.on(fromRenderer.saveLocation, function (_, args) {
    saveLocationToFileSystem(window, args)
  })

  ipcMain.on(fromRenderer.loadLocationWithKnownPath, (_, args) => {
    loadLocationWithKnownPath(window, args.filepath);
  })

  ipcMain.on(fromRenderer.loadLocationFromExplorer, (_) => {
    loadLocationFromExplorer(window);
  })

  ipcMain.on(fromRenderer.pickDirectory, (_, args) => {
    pickDirectory(window, args.recieverEvent);
  })

  ipcMain.on(fromRenderer.checkDirectoryForProject, (_, args) => {
    checkDirectoryForProjectFile(window, args.dirPath, args.recieverEvent);
  })

  ipcMain.on(fromRenderer.requestRecentLocations, (_) => {
    requestRecentLocations(window);
  })

  ipcMain.on(fromRenderer.clearRecentProjects, (_) => {
    clearRecentProjects();
    requestRecentLocations(window);
  })

  ipcMain.on(fromRenderer.cloneLocation, (_, args) => {
    cloneLocation(args.sourcePath, args.destinationPath, window);
  })

  ipcMain.on(fromRenderer.testApi, (_, args) => {
    const urls = GoogleMapsAPI.props.getImageryFromRect[0].prepareAPIUrls({
      NW: { lon: args.NW[0], lat: args.NW[1], },
      SE: { lon: args.SE[0], lat: args.SE[1], },
    });

    console.log("got here")
    console.log(args)

    GoogleMapsAPI.props.getImageryFromRect[0].handleAPIRequest(
      urls,
      args.dirpath
    )
  })
}


app.whenReady()
  // WARNING: ReactDevTools will not load due to change in extensions
  // .then(async () => {
  //   if (isDev) {
  //     if (process.env.ReactDevTools !== undefined) {
  //       if (fs.existsSync(process.env.ReactDevTools)) {
  //         await session.defaultSession.loadExtension(process.env.ReactDevTools, { allowFileAccess: true });
  //         console.log('completed')
  //       } else {
  //         console.log(process.env.ReactDevTools)
  //         console.log('ReactDevTools is not located at the given path. Check path in .env file');
  //       }
  //     } else {
  //       console.log('ReactDevTools is not configured for this environment. Check path in .env file.');
  //       console.log('For installation, see https://www.electronjs.org/docs/latest/tutorial/devtools-extension');
  //     }
  //   }
  // })
  .then(() => {
    const protocolName = 'terrain-viewer';
    protocol.registerFileProtocol(protocolName, (request, callback) => {
      try {
        const url = request.url.replace(`${protocolName}://`, '');
        return callback(decodeURIComponent(url))
      } catch (error) {
        console.log(error);
      }
    })
  })
  .then(createWindow)
  .catch(() => { console.log("An error occured during start up...") });


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const hasInstanceLock = app.requestSingleInstanceLock();
if (!hasInstanceLock) {
  app.quit();
} else {
  app.on(fromRenderer.systems.secondInstance as any, (event: any, commandLine: any, workingDirectory: any) => {
    if (window) {
      if ((window as any).isMinimized())
        (window as any).restore();
      window.focus();
    }
  })
}