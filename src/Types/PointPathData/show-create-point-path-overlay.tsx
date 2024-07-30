import { useState } from "react"
import OverlayPrompt from "../../Components/OverlayPrompt/OverlayPrompt";
import { HDivider } from "../../Components/InspectorComponents/Headers/Headers.styles";
import SegmentedSwitch from "../../Components/SegmentedSwitch/SegmentedSwitch";
import TextField from "../../Components/TextField/TextField";
import { setScreenOverlayEvent } from "../../WindowEvents/set-screen-overlay";
import { PointPathData } from "../PointPathData";

interface ShowCreatePointPathOverlayProps {
  setPointPolygon: (id: number, data: PointPathData | undefined) => void;
}

const showCreatePointPathOverlay = (props: ShowCreatePointPathOverlayProps) => {
  const overlay = (<CreatePointPolygonOverlay
    setPointPath={props.setPointPolygon}
  />)
  setScreenOverlayEvent({ overlay });
}

interface CreatePointPathOverlayProps {
  setPointPath: (id: number, modified: PointPathData | undefined) => void;
}


const CreatePointPolygonOverlay = (props: CreatePointPathOverlayProps) => {
  const [name, setName] = useState("name");
  const [importedCSV, setImportedCSV] = useState<any | undefined>(null);

  return (
    <OverlayPrompt
      modalName={"Create new Point Path"}
      // hideDismissButton={true}
      buttonsProps={[{
        text: "Create", callback: () => {
          const newPointPolygon: PointPathData = {
            name: name,
            color: "red",
            points: [],
            wasImported: false,
          }
          props.setPointPath(-1, newPointPolygon);
        }
      }]}
    >



      <TextField
        label="Point Path Name:"
        initialText={name}
        onChange={(o) => { setName(o) }}
      />

    </OverlayPrompt>
  )
}



export default showCreatePointPathOverlay;