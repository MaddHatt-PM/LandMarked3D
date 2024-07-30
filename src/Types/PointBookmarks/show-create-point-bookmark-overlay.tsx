import { useState } from "react"
import OverlayPrompt from "../../Components/OverlayPrompt/OverlayPrompt";
import TextField from "../../Components/TextField/TextField";
import { setScreenOverlayEvent } from "../../WindowEvents/set-screen-overlay";
import { PointBookmarkData } from "../../Types/PointBookmarkData";
import { PointPolygonData } from "../PointPolygonData";
import { invalidBookmarkPosition } from "./is-point-bookmark-in-invalid-position";

interface ShowCreatePointBookmarkOverlayProps {
  setPointBookmark: (id: number, data: PointBookmarkData | undefined) => void;
}

const showCreatePointBookmarkOverlay = (props: ShowCreatePointBookmarkOverlayProps) => {
  const overlay = (<CreatePointPolygonOverlay
    setPointBookmark={props.setPointBookmark}
  />)
  setScreenOverlayEvent({ overlay });
}

interface CreatePointBookmarkOverlayProps {
  setPointBookmark: (id: number, modified: PointBookmarkData | undefined) => void;
}

const CreatePointPolygonOverlay = (props: CreatePointBookmarkOverlayProps) => {
  const [name, setName] = useState("name");

  return (
    <OverlayPrompt
      modalName={"Create new Point Polygon"}
      // hideDismissButton={true}
      buttonsProps={[{
        text: "Create", callback: () => {
          const newPointBookmark: PointBookmarkData = {
            name: name,
            color: "red",
            description: "",
            iconName: "",
            point: {
              id: 0,
              x: invalidBookmarkPosition.x,
              y: invalidBookmarkPosition.y,
              elevation: 0,
            }
          }
          props.setPointBookmark(-1, newPointBookmark);
        }
      }]}
    >
      <TextField
        label="Point Bookmark Name:"
        initialText={name}
        onChange={(o) => { setName(o) }}
      />

    </OverlayPrompt>
  )
}



export default showCreatePointBookmarkOverlay;