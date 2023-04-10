import { contextBridge, ipcRenderer } from "electron";
import { fromRendererEvents } from "./events/ipc-from-renderer-events";
import { toRendererEvents } from "./events/ipc-to-renderer-events";

let requestEvents = Object.values(fromRendererEvents);
for (let i = 0; i < requestEvents.length; i++) {
  const item: any = requestEvents[i];

  if (typeof item === 'object') {
    const subitems: any = Object.values(item);
    requestEvents = requestEvents.concat(subitems);
    requestEvents.splice(i, 1);
    i--;
  }
}

let responseEvents: any[] = Object.values(toRendererEvents);
for (let i = 0; i < responseEvents.length; i++) {
  const item: any = responseEvents[i];

  if (typeof item === 'object') {
    const subitems = Object.values(item);
    responseEvents = responseEvents.concat(subitems);
    responseEvents.splice(i, 1);
    i--;
  }
}

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "api", {
  request: (message: any, data?: any) => {
    if (requestEvents.includes(message)) {
      ipcRenderer.send(message, data);

      if (data !== undefined && data.logMessage !== undefined && data.logMessage === true) {
        console.log(`${message} was sent with: ${data}`);
      }

    } else {
      console.log(`${message} was denied`);
    }
  },

  response: (channel: string, func: (...args: any) => void) => {
    if (responseEvents.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
      console.log("this was called")
    } else {
      console.log(`${channel} was denied.`);
    }
  }
});

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);
  // window.ipcRenderer = ipcRenderer;
});


// window.remote = require('@electron/remote')