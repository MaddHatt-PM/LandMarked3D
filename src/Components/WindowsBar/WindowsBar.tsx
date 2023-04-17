import React, { useEffect, useState } from "react";
import { AppName, Container, Logo, WinButton, WinPin, WinClose, WindowsName } from "./WindowsBar.styles";

// -- Assets --
import LogoImg from "./window-logo.png"
import PinOff from "./window-pin-off.png"
import PinOn from "./window-pin-on.png"
import Minimize from "./window-min.png"
import Maximize from "./window-max.png"
import Close from "./window-close.png"
import toMainEvents from "../../IPCEvents/ipc-to-main-events";
import windowEvents from "../../WindowEvents/window-events";
import { SetLocationNameProps } from "../../WindowEvents/set-location-name";
import MenuDropdown from "../MenuDropdown/MenuDropdown";
import loadLocation from "../../Utilities/file-io/load-location";
import revertProjectToFile from "../../Utilities/file-io/revert-project-to-file";
import saveLocation from "../../Utilities/file-io/save-location";
import showCreateLocationOverlay from "../../Overlays/show-create-location";

// TODO: Account for mac os UI

/**
 * "The WindowsBar function returns a Container component that contains two span components, one with a
 * logo and app name, and the other with four buttons that control the window."
 * 
 * @returns A JSX component.
 */
const WindowsBar = () => {
  const [locationName, setLocationName] = useState("");
  const [isPinned, setPinned] = useState(false);
  const [isOnline, setOnline] = useState(true);
  const [locationNeedsSave, setLocationNeedsSave] = useState(false);

  // const [isAnyMenuOpen, setIsAnyMenuOpen] = useState(false);

  function TogglePinned() {
    window.api.request(toMainEvents.systems.toggleAlwaysOnTop);
    setPinned(current => !current);
  }

  useEffect(() => {
    setOnline(navigator.onLine);
    setLocationName("location-name")
    window.addEventListener("online", (event) => { setOnline(true) });
    window.addEventListener("offline", (event) => { setOnline(false) });

    window.addEventListener(windowEvents.NotifyOnLocationIsDirty, (_: any) => { setLocationNeedsSave(true) });
    window.addEventListener(windowEvents.NotifyOnLocationIsClean, (_: any) => { setLocationNeedsSave(false) });

    const handleSetLocationName = (event: CustomEvent<SetLocationNameProps>) => {
      setLocationName(event.detail.name)
    }
    window.addEventListener(windowEvents.SetLocationName, handleSetLocationName as EventListener);
  }, [])


  return (
    <Container>
      <span id="left-aligned" style={{ display: "flex" }}>
        <Logo src={LogoImg} isOnline={isOnline} />
        {/* <AppName>{isOnline ? "LandMarked3D" : "LandMarked3D - Offline"}</AppName> */}

        <MenuDropdown
          name="File"
          options={[
            [
              { name: "New Location", callback: showCreateLocationOverlay },
              { name: "Open Location", callback: loadLocation },
              // { name: "Clone Location", callback: () => { console.log("Pressed") } },
            ],
            [
              { name: "Save", callback: saveLocation},
              { name: "Revert", callback: revertProjectToFile},
            ],
            [
              { name: "Export Data", callback: () => { console.log("Export") } },
            ],
            [
              { name: "Exit", callback: () => {window.api.request(toMainEvents.systems.closeWindow)}},
            ]
          ]}
        />
        <MenuDropdown
          name="Help"
          options={[
            [
              { name: "Open", callback: () => { console.log("Pressed") } }
            ]
          ]}
        />

      </span>

      <span id="middle-aligned" >
        <WindowsName>
          {`${locationName}${locationNeedsSave ? '*' : ''}`}
        </WindowsName>
      </span>

      <span id="right-aligned">
        {/* <WinPin tabIndex={-1} onClick={TogglePinned} isPinned={isPinned}>
          <img src={isPinned ? PinOn : PinOff} alt="PinOff" />
        </WinPin> */}

        <WinButton tabIndex={-1} onClick={() => { window.api.request(toMainEvents.systems.minimizeWindow) }}>
          <img src={Minimize} alt="Minimize" />
        </WinButton>

        <WinButton tabIndex={-1} onClick={() => { window.api.request(toMainEvents.systems.maximizeWindow) }}>
          <img src={Maximize} alt="Maximize" />
        </WinButton>

        <WinClose tabIndex={-1} onClick={() => { window.api.request(toMainEvents.systems.closeWindow) }}>
          <img src={Close} alt="Close" />
        </WinClose>
      </span>

    </Container>
  );
};

export default WindowsBar;