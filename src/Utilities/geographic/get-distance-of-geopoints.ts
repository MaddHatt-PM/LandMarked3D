import { GeoPoint } from "../../Types/GeoPoint";

const toRadians = (degrees: number): number => {
  return degrees * Math.PI / 180;
}

const getDistanceOfGeoPoints = (p1: GeoPoint, p2: GeoPoint, unit: 'km' | 'm' | 'mi' | 'ft' = 'm'): number => {
  const R = {
    km: 6371e3,
    m: 6371000,
    mi: 3959e3,
    ft: 20902231.52 / 6879 // Earth's equatorial circumference divided by the number of feet in a nautical mile
  }[unit] || 6371e3; // Earth's radius in meters for unknown unit

  const lat1 = toRadians(p1.lat);
  const lat2 = toRadians(p2.lat);
  const latDiff = toRadians(p2.lat - p1.lat);
  const lonDiff = toRadians(p2.lon - p1.lon);

  const a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  switch (unit) {
    case 'km': return distance / 1000;
    case 'm': return distance;
    case 'mi': return distance / 1609.344; // 1 mile = 1609.344 meters
    case 'ft': return distance / 0.3048; // 1 foot = 0.3048 meters
    default: return distance;
  }
}

export default getDistanceOfGeoPoints;