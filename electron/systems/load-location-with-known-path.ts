import { BrowserWindow } from 'electron';
import { toRendererEvents } from '../events/ipc-to-renderer-events';
import { requestRecentLocations } from '../requestRecentLocations';
import { getAll, push as pushNewLocationToRecent, remove as removeLocation } from '../stores/get-recent-locations-store';
import loadLocation from './load-location';

export function loadLocationWithKnownPath(window: BrowserWindow, filepath: any) {
  window.webContents.send(toRendererEvents.loadLocationFromFileSystemReport, {
    code: 100,
    status: "Location is loading...",
    timeout: 10000
  });

  loadLocation(filepath)
    .then((data) => {
      window.webContents.send(toRendererEvents.loadLocationFromFileSystemReport, {
        code: 100,
        status: "Location loaded successfully",
        timeout: 2000
      });


      window.webContents.send(toRendererEvents.loadLocation, {
        data: data
      });

      console.log('NEW RECENT')
      pushNewLocationToRecent({ name: data.name, filepath: filepath })
    })
    .catch((err) => {
      if (err.message === 'Timeout exceeded') {
        console.error('Timeout error loading object from file:', err);
      } else {
        console.error('Error loading object from file:', err);
        window.webContents.send(toRendererEvents.loadLocationFromFileSystemReport,
          {message: 'File does not exist'});
        removeLocation(filepath);
        requestRecentLocations(window);
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
