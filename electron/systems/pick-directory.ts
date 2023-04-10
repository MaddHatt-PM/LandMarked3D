import { BrowserWindow, dialog } from 'electron';
import fs = require('fs');

export function pickDirectory(window: BrowserWindow, recieverName: any) {
  console.log(recieverName)
  dialog.showOpenDialog({ properties: ['openDirectory'] })
    .then((result) => {
      if (!result.canceled && result.filePaths.length > 0) {
        const selectedPath = result.filePaths[0];

        fs.access(selectedPath, fs.constants.W_OK, (err) => {
          if (!err) {
            window.webContents.send(recieverName, {
              data: selectedPath
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(`Error selecting directory: ${err}`);
      window.webContents.send(recieverName, {
        data: undefined
      });
    });
}
