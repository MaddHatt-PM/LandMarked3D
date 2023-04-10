import { BrowserWindow } from 'electron';
import { toRendererEvents } from './events/ipc-to-renderer-events';
import { getRecentLocations } from './stores/get-recent-locations-store';

export function requestRecentLocations(window: BrowserWindow) {
  window.webContents.send(toRendererEvents.requestRecentLocations, {
    data: getRecentLocations()
  });
}
