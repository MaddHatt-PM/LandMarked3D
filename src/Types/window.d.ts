import { IpcRenderer } from 'electron';
import { LocationCorners } from './LocationCorners';

declare global {
  interface Window {
    locationCorners: LocationCorners | undefined;
    pixelSize: {width: number, height: number};
    projectDirpath: string;
    projectFilepath: string;
    
    remote: any;

    projectors: {
      pixelToGeo: (x: number, y: number) => { lon: number, lat: number } 
      geoToPixel: (lat: number, lon: number) => { x: number, y: number } 
    }
    
    api: {
      request: (eventname: string, data?: any) => void;
      response: (channel: string, func: (...args: any) => void) => void;
    };
  }
}