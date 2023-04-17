interface GetOffsetFromOriginProps {
  point: { lat: number, lon: number };
  origin: { lat: number, lon: number }
}

interface Offsets {
  xFeet: number,
  yFeet: number,
  xMeters: number,
  yMeters: number
}

const getOffsetFromOrigin = (props: GetOffsetFromOriginProps): Offsets => {
  const { point, origin } = props;

  const earthRadius = 6371000; // in meters
  const latRad = point.lat * Math.PI / 180;
  const lonRad = point.lon * Math.PI / 180;
  const originLatRad = origin.lat * Math.PI / 180;
  const originLonRad = origin.lon * Math.PI / 180;

  const dx = earthRadius * Math.cos(originLatRad) * (lonRad - originLonRad);
  const dy = earthRadius * (latRad - originLatRad);

  const xFeet = dx * 3.28084;
  const yFeet = dy * 3.28084 * -1;
  const xMeters = dx;
  const yMeters = dy * -1;

  return { xFeet, yFeet, xMeters, yMeters };
}

export default getOffsetFromOrigin;