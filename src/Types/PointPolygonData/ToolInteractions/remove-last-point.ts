import { PointPolygonData } from "../../PointPolygonData";

interface removePointProps {
  activePointPolygonID: number;
  activePointPolygon: PointPolygonData;

  indexToRemove: number;

  setPointPolygon: (id: number, data: PointPolygonData) => void;
}

const removePoint = (props: removePointProps) => {
  if (props.activePointPolygon.points.length === 0) {
    return;
  }

  if (props.activePointPolygon.points.length <= props.indexToRemove) {
    throw new Error(`Invalid index ${props.indexToRemove} for pointPolygon of length ${props.activePointPolygon.points.length}`)
  }

  const newData = props.activePointPolygon;
  newData.points = newData.points.filter((_,i) => i!== props.indexToRemove);
  props.setPointPolygon(props.activePointPolygonID, newData)
}

export default removePoint;