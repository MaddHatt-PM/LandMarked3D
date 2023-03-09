import React, { useEffect, useState } from "react";
import { AppName, Container, Logo, WinButton, WinPin, WinClose } from "./WindowsBar.styles";

// -- Assets --
import LogoImg from "./window-logo.png"
import PinOff from "./window-pin-off.png"
import PinOn from "./window-pin-on.png"
import Minimize from "./window-min.png"
import Maximize from "./window-max.png"
import Close from "./window-close.png"
import toMainEvents from "../../Events/ipc-to-main-events";

// TODO: Account for mac os UI

/**
 * "The WindowsBar function returns a Container component that contains two span components, one with a
 * logo and app name, and the other with four buttons that control the window."
 * 
 * @returns A JSX component.
 */
const WindowsBar = () => {
  const [isPinned, setPinned] = useState(false);
  const [isOnline, setOnline] = useState(true);

  function TogglePinned() {
    window.api.request(toMainEvents.systems.toggleAlwaysOnTop);
    setPinned(current => !current);
  }

  useEffect(() => {
    setOnline(navigator.onLine);
    window.addEventListener("online", (event) => { setOnline(true) });
    window.addEventListener("offline", (event) => { setOnline(false) });
  }, [])

  return (
    <Container>
      <span id="left-aligned">
        <Logo src={LogoImg} isOnline={isOnline} />
        <AppName>{isOnline ? "2 Minute Tabletop" : "2 Minute Tabletop - Offline"}</AppName>
      </span>

      <span id="right-aligned">
        <WinPin tabIndex={-1} onClick={TogglePinned} isPinned={isPinned}>
          <img src={isPinned ? PinOn : PinOff} alt="PinOff" />
        </WinPin>

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