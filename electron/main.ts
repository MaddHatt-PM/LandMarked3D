import { app, BrowserWindow, dialog, ipcMain, ipcRenderer, protocol, session, shell } from 'electron';
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
import { fstat, mkdir, writeFile } from 'fs';
import { clear } from './stores/get-recent-locations-store';
import { cloneLocation } from './systems/clone-location';
import { GoogleMapsAPI } from './api/services/GoogleMapsAPI';
import exportProject, { DataFileType, ImageFileType, OriginPoints } from './systems/exporting/export-project';
import { join } from 'path';

require('dotenv').config();

const preferencesPath = {
  'darwin': 'mac', // Figure out best place to put it
  'win32': path.join('C:\\', 'users', os.userInfo().username, 'Documents', '2MinuteTabletop')
}

const localURLBase = `terrain-viewer://`

const store = getPreferencesStore();

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 400,
    titleBarStyle: "hidden",
    autoHideMenuBar: true,
    frame: false,
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

  ipcMain.on(fromRenderer.openInBrowser, (_, args) => {
    console.log(args.url)
    shell.openExternal(args.url);
  })

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
    clear();
    requestRecentLocations(window);
  })

  ipcMain.on(fromRenderer.cloneLocation, (_, args) => {
    cloneLocation(args.sourcePath, args.destinationPath, window);
  })

  ipcMain.on(fromRenderer.testGoogleMapsImagery, (_, args) => {
    const urls = GoogleMapsAPI.props.getImageryFromRect[0].prepareAPIUrls({
      NW: { lon: args.NW[0], lat: args.NW[1], },
      SE: { lon: args.SE[0], lat: args.SE[1], },
    });

    GoogleMapsAPI.props.getImageryFromRect[0].handleAPIRequest(urls, args.dirpath)
  })

  ipcMain.on(fromRenderer.testGoogleMapsElevation, (_, args) => {
    const { points: pointsRaw } = args;

    const points: Point[] = (pointsRaw as any[]).map((o) => {
      return {
        latitude: o.latitude,
        longitude: o.longitude,
        uuid: o.uuid
      }
    })

    //   { latitude: 32.1111, longitude: -82.1111, uuid: "1111" },
    //   { latitude: 32.2222, longitude: -82.2222, uuid: "2222" },
    //   { latitude: 32.3333, longitude: -82.3333, uuid: "3333" },
    //   { latitude: 32.4444, longitude: -82.4444, uuid: "4444" },
    //   { latitude: 32.5555, longitude: -82.5555, uuid: "5555" },
    //   { latitude: 36.6666, longitude: -85.6666, uuid: "6666" }
    // ]

    const requestProps = GoogleMapsAPI.props.getDataFromPoint[0].prepareAPIUrls(points);
    // console.log(requestProps)

    const result = GoogleMapsAPI.props.getDataFromPoint[0].handleAPIRequest(requestProps);
    console.log(result)
  })

  ipcMain.on(fromRenderer.exportProject, (_, args) => {
    pickDirectory(window, undefined)
      .then((dir) => {

        exportProject(args, dir!, {
          dataFileType: DataFileType.JSON,
          imageFileType: ImageFileType.PNG,
          origin: OriginPoints.TopLeft
        });
      })
      .catch((err) => {
        if (err) { console.error(err); }
      })
  })

  ipcMain.on(fromRenderer.createNewLocation, (_, args) => {
    console.log(args)
    const NW = args.NW.split(",").map(parseFloat)
    const SE = args.SE.split(",").map(parseFloat)
    const dirPath = join(args.dirPath, args.locationName)

    const urls = GoogleMapsAPI.props.getImageryFromRect[0].prepareAPIUrls({ NW, SE });

    const createDirectory = (dirpath: string) => {
      return new Promise<void>((resolve, reject) => {
        mkdir(dirpath, { recursive: true }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        })
      })
    }

    const createLocationFile = async (imageSize: any, _dirpath: string) => {
      console.log(dirPath)

      const defaultData = {
        name: args.locationName,

        pixelSize: { width: imageSize[0], height: imageSize[1] },
        saveTime: "",
        locationCorners: {
          NW: { lon: NW[1], lat: NW[0] },
          NE: { lon: SE[1], lat: NW[0] },
          SW: { lon: NW[1], lat: SE[0] },
          SE: { lon: SE[1], lat: SE[0] },
        },
        imageMaps: [{
          name: "Background",
          url: `${localURLBase}${join(dirPath, "googlemaps-satellite.png")}`,
          isViewable: true,
          opacity: 1,
          uuid: "BASE-IMAGE",

          imageType: "base-image",
          properties: {
            sharpness: 0,
            brightness: 0,
            contrast: 0,
            saturation: 0,
          },
        }],
      }

      return new Promise<string>((resolve, reject) => {
        const data = JSON.stringify(defaultData, null, 2);
        const locationPath = join(dirPath, "location.project")

        writeFile(locationPath, data, (err) => {
          if (err) {
            reject({ type: "file-system", error: err });
          } else {
            resolve(locationPath);
          }
        })
      })
    }

    createDirectory(dirPath)
      .then(() => {
        const urls = GoogleMapsAPI.props.getImageryFromRect[0].prepareAPIUrls({
          NW: { lon: NW[1], lat: NW[0] },
          SE: { lon: SE[1], lat: SE[0] },
        })
        return GoogleMapsAPI.props.getImageryFromRect[0].handleAPIRequest(urls, dirPath);
      })
      .then((imageSize) => {
        return createLocationFile(imageSize, dirPath)
      })
      .then((locationPath) => {
        loadLocationWithKnownPath(window, locationPath)
      })
      .then(() => { console.log("Completed new location") })
      .catch((err) => { console.error(err) })
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


