import { SamplePointData } from "./SamplePointData";

declare interface PointFieldData {
  name: string;
  points: SamplePointData[];
  color: string;
  isViewable: boolean;
}