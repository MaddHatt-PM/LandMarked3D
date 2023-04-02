import { GeoPoint } from "./GeoPoint";

/**
 * ```
 * NW --- NE
 *  |     |
 * SW --- SE
 * ```
 */
export declare interface LocationCorners {
  NW: GeoPoint;
  NE: GeoPoint;
  SE: GeoPoint;
  SW: GeoPoint;
}