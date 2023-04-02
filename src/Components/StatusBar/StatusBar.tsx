import React, { useEffect, useState } from "react";
import { SendViewportCoordinatesProps } from "../../WindowEvents/send-viewport-coordinates";
import windowEvents from "../../WindowEvents/window-events";
import { Container, Divider, HStack, Text } from "./StatusBar.styles";

const StatusBar = () => {
  const [pixelCoordinates, setPixelCoordinates] = useState<SendViewportCoordinatesProps>({
    pixelX: 0,
    pixelY: 0,
  })

  useEffect(() => {
    const handleSendViewportCoordinates = (event: CustomEvent<SendViewportCoordinatesProps>) => {
      setPixelCoordinates(event.detail);
    }

    window.addEventListener(
      windowEvents.SendViewportCoordinates.valueOf(),
      handleSendViewportCoordinates as EventListener
    );

    const cleanup = () => {
      window.removeEventListener(
        windowEvents.SendViewportCoordinates.valueOf(),
        handleSendViewportCoordinates as EventListener
      )
    }
    return cleanup;
  })

  return (
    <Container>
      {/* Left Aligned: Backend */}
      <HStack>
        <Text>Backend Processes</Text>
      </HStack>

      {/* Right Aligned: Frontend */}
      <HStack>
        <Text>test</Text>
        <Text>test</Text>
        <Divider />
        <Text>Lat:85.9853</Text>
        <Text>Lon:65.2349</Text>
        <Text>Ele:215.5ft</Text>
        <Divider />
        <Text style={{minWidth:"45px"}}>{`X: ${pixelCoordinates.pixelX.toFixed()}`}</Text>
        <Text style={{minWidth:"45px"}}>{`Y: ${pixelCoordinates.pixelY.toFixed()}`}</Text>
      </HStack>
    </Container>
  );
};

export default StatusBar;