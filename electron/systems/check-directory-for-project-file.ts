import { BrowserWindow } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

export function checkDirectoryForProjectFile(window: BrowserWindow, dirPath: any, recieverEvent: any) {
  Promise.race([
    fs.promises.readdir(dirPath)
      .then((files) => {
        const projectFiles = files.filter(f => path.extname(f) === ".project");
        window.webContents.send(recieverEvent, {
          code: 100,
          data: { state: projectFiles.length > 0 }
        });
      }),

    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Timeout exceeded"));
      }, 5000);
    })
  ])
    .catch((err) => {
      console.error(err);
      window.webContents.send(recieverEvent, {
        code: 500,
        data: { state: false },
        error: err
      });
    });
}
