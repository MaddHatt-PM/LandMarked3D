import windowEvents from "./window-events"

export interface SendViewportCoordinatesProps {
  pixelX: number,
  pixelY: number,
}

export const sendViewportCoordinatesEvent = (props: SendViewportCoordinatesProps) => {
  const event = new CustomEvent<SendViewportCoordinatesProps>(
    windowEvents.SendViewportCoordinates.valueOf(), {
    detail: {
      pixelX: props.pixelX,
      pixelY: props.pixelY
    }
  });

  window.dispatchEvent(event);
}