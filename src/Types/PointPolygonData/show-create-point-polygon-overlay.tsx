import { useState } from "react"
import OverlayPrompt from "../../Components/OverlayPrompt/OverlayPrompt";
import TextField from "../../Components/TextField/TextField";
import { setScreenOverlayEvent } from "../../WindowEvents/set-screen-overlay";
import { PointPolygonData } from "../PointPolygonData";

interface ShowCreatePointPolygonOverlayProps {
  setPointPolygon: (id: number, data: PointPolygonData | undefined) => void;
}

const showCreatePointPolygonOverlay = (props: ShowCreatePointPolygonOverlayProps) => {
  const overlay = (<CreatePointPolygonOverlay
    setPointPolygon={props.setPointPolygon}
  />)
  setScreenOverlayEvent({ overlay });
}

export default showCreatePointPolygonOverlay;

interface CreatePointPolygonOverlayProps {
  setPointPolygon: (id: number, modified: PointPolygonData | undefined) => void;
}

const CreatePointPolygonOverlay = (props: CreatePointPolygonOverlayProps) => {
  const [name, setName] = useState("name");
  const [group, setGroup] = useState("");

  return (
    <OverlayPrompt
      modalName={"Create new Point Polygon"}
      // hideDismissButton={true}
      buttonsProps={[{
        text: "Create", callback: () => {
          const newPointPolygon: PointPolygonData = {
            name: name,
            color: "red",
            points: []
          }
          props.setPointPolygon(-1, newPointPolygon);
        }
      }]}
    >
      <TextField
        label="Point Polygon Name:"
        initialText={name}
        onChange={o => setName(o)}
      />

      <TextField
        label="Group:"
        initialText={group}
        onChange={o => setGroup(o)}
      />

    </OverlayPrompt>
  )
}


