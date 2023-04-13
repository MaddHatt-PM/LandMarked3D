export interface APIProps {
  name: string;
  description: string;
  requiresKey: boolean;
  getDataFromPoint: GetDataFromPoint[];
  getImageryFromRect: GetImageryFromRect[];
}

export interface APIFunctionality {
  props: APIProps
  setKey: (key: string) => void;
  getKey: () => string | undefined;
  canGetDataFromPoint: () => boolean;
  canGetImageryFromRect: () => boolean;
}

export interface GetDataFromPoint {
  name: string;
  description: string;
  modifiedKeys: string[];
  requestCostType: RequestCostType;

  prepareAPIUrls: (points: Point[]) => string[];
  prepareValidationTest: () => boolean;

  handleAPIPayload: (urls: string[]) => void;
}

export interface ImageryPrepAPIUrls {
  NW: { lon: number, lat: number },
  SE: { lon: number, lat: number },
}

export interface GetImageryFromRect {
  name: string;
  description: string;
  filePrefix: string;
  requestCostType: RequestCostType;

  prepareAPIUrls: (rect: ImageryPrepAPIUrls, props?: Record<string, any>) => any[];
  validationTest: () => boolean;

  handleAPIRequest: (data: any[], dirPath: string, props?: Record<string, any>) => void;
}

export enum RequestCostType {
  perPoint,
  perRequest,
  perFunctionCall
}