import { BrowserWindow } from 'electron';
import * as fs from 'fs'
import { toRendererEvents } from '../events/ipc-to-renderer-events';

interface saveLocationToFileSystemProps {
  data: any,
  filepath: string
}

const saveLocationToFileSystem = (window: BrowserWindow, props: saveLocationToFileSystemProps, timeoutMS = 5_000): void => {
  window.webContents.send(toRendererEvents.saveLocationReport, {
    code: 100,
    status: "Location is saving...",
    timeout: 10_000
  });

  Promise.race([
    new Promise<void>((resolve, reject) => {
      const data = JSON.stringify(props.data, null, 2);
      
      fs.writeFile(props.filepath + "/location.project", data, (err) => {
        if (err) {
          reject({ type: "file-system", error: err });
        } else {
          resolve();
        }
      })
    }),

    new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        reject({ type: "timeout", err: new Error("Timeout exceeded") });
      }, timeoutMS)
    })
  ])
    .then(() => {
      window.webContents.send(toRendererEvents.saveLocationReport, {
        code: 100,
        status: "Location was saved successfully",
        timeout: 2_000
      });
    })
    .catch((err) => {
      window.webContents.send(toRendererEvents.saveLocationReport, {
        code: 500,
        status: "Error on saving location",
        timeout: 10_000,
        error: err
      });
    })
}

export default saveLocationToFileSystem;