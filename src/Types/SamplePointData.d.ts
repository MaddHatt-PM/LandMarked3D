export interface SamplePointData {
  id: number;
  x: number;
  y: number;
  elevation: number;
  details?: Record<string, any>
}