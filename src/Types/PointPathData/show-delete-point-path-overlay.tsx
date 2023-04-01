import { AcceptPrompts, DismissPrompts } from "../../Components/BaseOverlay/BaseOverlay";
import ConfirmationOverlay from "../../Components/ConfirmationOverlay/ConfirmationOverlay";
import { setScreenOverlayEvent } from "../../WindowEvents/set-screen-overlay";
import { PointPathData } from "../PointPathData";

interface ShowDeletePointPathOverlayProps {
  activePointPath: PointPathData;
  activePointPathID: number;
  setPointPath: (id: number, data: PointPathData | undefined) => void;
}

const showDeletePointPathOverlay = (props: ShowDeletePointPathOverlayProps) => {
  const overlay = (
    <ConfirmationOverlay
      modalName="Delete Point Path?"
      acceptPrompt={AcceptPrompts.Confirm}
      dismissPrompt={DismissPrompts.Cancel}
      description={`Are you sure you want to delete ${props.activePointPath.name}?`}
      acceptCallback={() => {
        props.setPointPath(props.activePointPathID, undefined);
      }}
    />
  )

  setScreenOverlayEvent({ overlay });
}

export default showDeletePointPathOverlay;