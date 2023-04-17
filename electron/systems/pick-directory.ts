import { rejects } from 'assert';
import { BrowserWindow, dialog } from 'electron';
import fs = require('fs');
import { resolve } from 'path';

export function pickDirectory(window: BrowserWindow, recieverName: any | undefined): Promise<string | undefined> {
  return dialog.showOpenDialog({ properties: ['openDirectory'] })
    .then((result) => {
      if (!result.canceled && result.filePaths.length > 0) {
        const selectedPath = result.filePaths[0];

        return new Promise<string | undefined>((resolve, reject) => {
          fs.access(selectedPath, fs.constants.W_OK, (err) => {
            if (!err) {
              if (recieverName !== undefined) {
                window.webContents.send(recieverName, { data: selectedPath });
              }

              resolve(selectedPath);
            } else {
              reject(err);
            }
            return undefined;
          });

        });
      }
    })
    .catch((err) => {
      console.log(`Error selecting directory: ${err}`);
      window.webContents.send(recieverName, { data: undefined });
      return undefined;
    });
}
