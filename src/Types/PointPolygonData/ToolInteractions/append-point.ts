import { PointPolygonData } from "../../PointPolygonData";

interface appendPointProps {
  activePointPolygonID: number;
  activePointPolygon: PointPolygonData;
  uiTransformEvent: UITransformEvent;
  setPointPolygon: (id: number, data: PointPolygonData) => void;
}

const appendPoint = (props: appendPointProps) => {
  const newData = props.activePointPolygon;
  const cursorHeight = 32;

  const event = props.uiTransformEvent.event;
  const translateX = props.uiTransformEvent.translateX;
  const translateY = props.uiTransformEvent.translateY;
  const zoom = props.uiTransformEvent.zoom;

  newData.points = [...newData.points,
  {
    id: newData.points.length,
    x: (event.clientX - translateX) / zoom,
    y: (event.clientY - translateY - cursorHeight) / zoom,
    elevation: 0
  }];

  props.setPointPolygon(props.activePointPolygonID, newData);
}

export default appendPoint;