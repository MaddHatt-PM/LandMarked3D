import { LocationCorners } from "./LocationCorners";

declare global {
  interface Window {
    locationCorners: LocationCorners | undefined;
    api: {
      request: (params: any) => void;
    };
  }
}