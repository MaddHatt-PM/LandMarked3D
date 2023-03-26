import { ReactNode } from "react";
import windowEvents from "./window-events";

export interface SetScreenOverlayEventDetail {
  overlay: React.ReactNode;
}

export const setScreenOverlayEvent = ({ overlay }: SetScreenOverlayEventDetail) => {
  const event = new CustomEvent<SetScreenOverlayEventDetail>(
    windowEvents.SetScreenOverlay.valueOf(), {
    detail: { overlay },
  });

  window.dispatchEvent(event);
}

export const dismissScreenOverlayEvent = () => {
  window.dispatchEvent(new CustomEvent(windowEvents.DismissScreenOverlay.valueOf()))
}