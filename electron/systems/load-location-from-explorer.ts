import { BrowserWindow, dialog } from 'electron';
import { toRendererEvents } from '../events/ipc-to-renderer-events';
import loadLocation from './load-location';

export function loadLocationFromExplorer(window: BrowserWindow) {
  window.webContents.send(toRendererEvents.loadLocationFromFileSystemReport, {
    code: 100,
    status: "Location is loading...",
    timeout: 10000
  });

  dialog
    .showOpenDialog({ filters: [{ name: 'Project Files', extensions: ['project'] }] })
    .then((result) => {
      if (!result.canceled && result.filePaths.length > 0) {
        const selectedFilePath = result.filePaths[0];

        loadLocation(selectedFilePath)
          .then((data) => {
            window.webContents.send(toRendererEvents.loadLocation, {
              data: data
            });

            window.webContents.send(toRendererEvents.loadLocationFromFileSystemReport, {
              code: 100,
              status: "Location loaded successfully",
              timeout: 2000
            });
          });
      }
    })
    .catch((err) => {
      if (err.message === 'Timeout exceeded') {
        console.error('Timeout error loading object from file:', err);
      } else {
        console.error('Error loading object from file:', err);
      }

      window.webContents.send(toRendererEvents.loadLocation, {
        data: undefined
      });

      window.webContents.send(toRendererEvents.loadLocationFromFileSystemReport, {
        code: 500,
        status: "Error on loading location",
        timeout: 10000,
        error: err
      });
    });
}
