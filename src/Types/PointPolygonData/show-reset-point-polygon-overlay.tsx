import { AcceptPrompts, DismissPrompts } from "../../Components/OverlayPrompt/OverlayPrompt";
import OverlayConfirmation from "../../Components/OverlayConfirmation/OverlayConfirmation";
import { setScreenOverlayEvent } from "../../WindowEvents/set-screen-overlay";
import { PointPolygonData } from "../PointPolygonData";
import clearAllPoints from "./ToolInteractions/clear-all-points";

interface ShowResetPointPolygonOverlayProps {
  activePointPolygonID: number;
  activePointPolygon: PointPolygonData;
  setPointPolygon: (id: number, data: PointPolygonData) => void;
}

const showResetPointPolygonOverlay = (props: ShowResetPointPolygonOverlayProps) => {
  const overlay = (
    <OverlayConfirmation
      acceptPrompt={AcceptPrompts.Confirm}
      dismissPrompt={DismissPrompts.Cancel}
      modalName="Clear all points?"
      description={`Are you sure you want to clear all ${props.activePointPolygon.points.length} points from ${props.activePointPolygon.name}?`}
      acceptCallback={() => {
        clearAllPoints({
          activePointPolygonID: props.activePointPolygonID!,
          activePointPolygon: props.activePointPolygon,
          setPointPolygon: props.setPointPolygon
        })
      }}
    />
  )

  setScreenOverlayEvent({ overlay });
}

export default showResetPointPolygonOverlay;