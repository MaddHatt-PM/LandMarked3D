import { LocationCorners } from "./LocationCorners";

declare global {
  interface Window {
    locationCorners: LocationCorners | undefined;
    api: {
      request: (eventname: string, data?:any) => void;
      // request: (eventname: string, data: any) => void;
    };
  }
}