import { PointPathData } from "../PointPathData";
import { PointPolygonData } from "../PointPolygonData";

interface removePointProps {
  activePointGenericID: number;
  activePointGeneric: PointPolygonData;
  indexToRemove: number;

  setPointPolygon: (id: number, data: any) => void;
}

const removePoint = (props: removePointProps) => {
  if (props.activePointGeneric.points.length === 0) {
    return;
  }

  if (props.activePointGeneric.points.length <= props.indexToRemove) {
    throw new Error(`Invalid index ${props.indexToRemove} for pointPolygon of length ${props.activePointGeneric.points.length}`)
  }

  const newData = props.activePointGeneric;
  newData.points = newData.points.filter((_,i) => i!== props.indexToRemove);
  props.setPointPolygon(props.activePointGenericID, newData)
}

export default removePoint;