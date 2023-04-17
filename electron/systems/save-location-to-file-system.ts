import { BrowserWindow } from 'electron';
import * as fs from 'fs'
import { join } from 'path';
import { toRendererEvents } from '../events/ipc-to-renderer-events';

interface saveLocationToFileSystemProps {
  data: any
}

const saveLocationToFileSystem = (window: BrowserWindow, props: saveLocationToFileSystemProps, timeoutMS = 5_000): void => {
  window.webContents.send(toRendererEvents.saveLocationReport, {
    code: 100,
    status: "Location is saving...",
    timeout: 10_000
  });

  const { filepath, ...rawData } = props.data;


  Promise.race([
    new Promise<void>((resolve, reject) => {
      const data = JSON.stringify(rawData, null, 2);

      fs.writeFile(filepath, data, (err) => {
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
      console.error(err)
      window.webContents.send(toRendererEvents.saveLocationReport, {
        code: 500,
        status: "Error on saving location",
        timeout: 10_000,
        error: err
      });
    })
}

export default saveLocationToFileSystem;