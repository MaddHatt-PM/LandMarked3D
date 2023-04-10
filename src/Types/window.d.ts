import { LocationCorners } from "./LocationCorners";
import { IpcRenderer } from 'electron';

declare global {
  interface Window {
    locationCorners: LocationCorners | undefined;
    pixelSize: {width: number, height: number};
    projectPath: string;
    
    remote: any;
    api: {
      request: (eventname: string, data?: any) => void;
      response: (channel: string, func: (...args: any) => void) => void;
    };
  }
}