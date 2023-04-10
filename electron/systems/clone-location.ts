import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { toRendererEvents } from '../events/ipc-to-renderer-events';

export function cloneLocation(sourcePath: any, destinationPath: any, window: BrowserWindow) {
  fs.promises.readdir(sourcePath)
    .then(files => {
      return fs.promises.mkdir(destinationPath, { recursive: true })
        .then(() => {
          return Promise.all(files.map((f) => {
            const srcFile = path.join(sourcePath, f);
            const destFile = path.join(destinationPath, f);
            return fs.promises.copyFile(srcFile, destFile);
          }));
        });
    })
    .then(() => {
      window.webContents.send(toRendererEvents.cloneLocationReport, {
        code: 100
      });
    })
    .catch(err => {
      console.error('Error duplicating project:', err);
      window.webContents.send(toRendererEvents.cloneLocationReport, {
        code: 500,
        error: err
      });
    });
}
