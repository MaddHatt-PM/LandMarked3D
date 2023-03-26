import { AcceptPrompts, DismissPrompts } from "../../Components/BaseOverlay/BaseOverlay";
import ConfirmationOverlay from "../../Components/ConfirmationOverlay/ConfirmationOverlay";
import { setScreenOverlayEvent } from "../../WindowEvents/set-screen-overlay";
import { PointPolygonData } from "../PointPolygonData";

interface ShowDeletePointPolygonOverlayProps {
  activePointPolygonID: number;
  activePointPolygon: PointPolygonData;
  setPointPolygon: (id: number, data: PointPolygonData | undefined) => void;
}

const showDeletePointPolygonOverlay = (props: ShowDeletePointPolygonOverlayProps) => {
  const overlay = (
    <ConfirmationOverlay
      modalName="Delete Point Polygon?"
      acceptPrompt={AcceptPrompts.Confirm}
      dismissPrompt={DismissPrompts.Cancel}
      description={`Are you sure you want to delete ${props.activePointPolygon.name}?`}
      acceptCallback={() => {
        props.setPointPolygon(props.activePointPolygonID, undefined);
      }}
    />
  )

  setScreenOverlayEvent({ overlay });
}

export default showDeletePointPolygonOverlay;