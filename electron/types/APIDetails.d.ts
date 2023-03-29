declare interface APIProps {
  name: string;
  description: string;
  requiresKey: boolean;
  getDataFromPoint: GetDataFromPoint[];
  getImageryFromRect: GetImageryFromRect[];
}

declare interface APIFunctionality {
  props: APIProps
  setKey: (key:string) => void;
  getKey: () => string | undefined;
  canGetDataFromPoint: () => boolean;
  canGetImageryFromRect: () => boolean;
}

declare interface GetDataFromPoint {
  name: string;
  description: string;
  modifiedKeys: string[];
  requestCostType: RequestCostType;

  prepareAPIUrls: (points: Point[]) => string[];
  prepareValidationTest: () => boolean;

  handleAPIPayload: (data: any[]) => void; 
}

declare interface GetImageryFromRect {
  name: string;
  description: string;
  filePrefix: string;
  requestCostType: RequestCostType;

  prepareRequests: (points: Point[]) => string[];
  validationTest: () => boolean;

  handleAPIPayload: (data: any[]) => void;
}

export enum RequestCostType {
  perPoint,
  perRequest,
  perFunctionCall
}