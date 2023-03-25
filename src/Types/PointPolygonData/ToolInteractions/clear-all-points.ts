import { PointPolygonData } from "../../PointPolygonData";

interface clearAllPointsProps {
  activePointPolygonID: number;
  activePointPolygon: PointPolygonData;
  setPointPolygon: (id: number, data: PointPolygonData) => void;
}

const clearAllPoints = (props: clearAllPointsProps) => {
  const newData = props.activePointPolygon;
  newData.points = [];
  props.setPointPolygon(props.activePointPolygonID, newData);
}

export default clearAllPoints;