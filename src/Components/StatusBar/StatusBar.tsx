import { timeout } from "d3";
import React, { useEffect, useState } from "react";
import fromMainEvents from "../../IPCEvents/ipc-from-main-events";
import { GeoPoint } from "../../Types/GeoPoint";
import generateUUID from "../../Utilities/generate-uuid";
import { SendViewportCoordinatesProps } from "../../WindowEvents/send-viewport-coordinates";
import windowEvents from "../../WindowEvents/window-events";
import { Container, Divider, HStack, Text } from "./StatusBar.styles";

interface BackendStatus {
  text: string;
  event: string;
  uuid: string;
}

const StatusBar = () => {
  const [pixelCoordinates, setPixelCoordinates] = useState<SendViewportCoordinatesProps>({
    pixelX: 0,
    pixelY: 0,
  });

  const [geoCoordinate, setGeoCoordinate] = useState<GeoPoint>({ lon: 0, lat: 0 });

  useEffect(() => {
    const handleSendViewportCoordinates = (event: CustomEvent<SendViewportCoordinatesProps>) => {
      setPixelCoordinates(event.detail);
      if (window.projectors !== undefined) {
        setGeoCoordinate(window.projectors.pixelToGeo(event.detail.pixelX, event.detail.pixelY))
      } else {
        setGeoCoordinate({ lon: NaN, lat: NaN });
      }
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
  });

  const [backendStatuses, setAllBackendStatuses] = useState<BackendStatus[]>([]);
  const addBackendStatus = (status: BackendStatus) => {
    const modifiedStatuses = backendStatuses.filter(o => o.event !== status.event)
    setAllBackendStatuses([...modifiedStatuses, status])
  }

  const removeBackendStatus = (status: BackendStatus) => {
    setAllBackendStatuses([...backendStatuses].filter(o => o.uuid === status.uuid));
  }

  window.api.response(fromMainEvents.saveLocationReport, (args: any) => {
    const newStatus: BackendStatus = {
      text: args.status,
      event: fromMainEvents.saveLocationReport,
      uuid: generateUUID()
    }
    addBackendStatus(newStatus);
    timeout(() => { removeBackendStatus(newStatus) }, args.timeout ?? 2_500)
  });

  window.api.response(fromMainEvents.loadLocationFromFileSystemReport, (args: any) => {
    const newStatus: BackendStatus = {
      text: args.status,
      event: fromMainEvents.loadLocationFromFileSystemReport,
      uuid: generateUUID()
    }
    addBackendStatus(newStatus);
    timeout(() => { removeBackendStatus(newStatus) }, args.timeout ?? 2_500)
  });

  return (
    <Container>
      {/* Left Aligned: Backend */}
      <HStack>
        {backendStatuses.length !== 0 &&
          <>
            <Text>
              {backendStatuses.map(o => o.text).join(", ")}
            </Text>
          </>
        }
      </HStack>

      {/* Right Aligned: Frontend */}
      <HStack>
        <Text style={{ minWidth: "45px" }}>{`Lon: ${geoCoordinate.lat.toPrecision(8)}`}</Text>
        <Text style={{ minWidth: "45px" }}>{`Lat: ${geoCoordinate.lon.toPrecision(8)}`}</Text>
        {/* <Text>Ele:215.5ft</Text> */}
        <Divider />
        <Text style={{ minWidth: "45px" }}>{`X: ${pixelCoordinates.pixelX.toFixed()}`}</Text>
        <Text style={{ minWidth: "45px" }}>{`Y: ${pixelCoordinates.pixelY.toFixed()}`}</Text>
      </HStack>
    </Container>
  );
};

export default StatusBar;