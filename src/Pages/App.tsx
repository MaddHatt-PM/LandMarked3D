import WindowsBar from "../Components/WindowsBar/WindowsBar";
import { GlobalStyle } from "../GlobalStyles";
import { Container, Viewport } from "./App.styles";
import { HashRouter, Routes, Route } from 'react-router-dom';
import StartupPage from "./StartupPage/StartupPage";
import LocationViewerPage from "./LocationViewerPage/LocationViewerPage";
import LocationSearchPage from "./LocationSearchPage/LocationSearchPage";
import React, { ReactNode, useEffect, useState } from "react";
import windowEvents from "../WindowEvents/window-events";
import ScreenOverlay from "../Components/ScreenOverlay/ScreenOverlay";
import { SetScreenOverlayEventDetail } from "../WindowEvents/set-screen-overlay";

function App() {
  const [screenOverlayNode, setScreenOverlayNode] = useState<ReactNode | null>(null);

  useEffect(() => {
    const handleSetEvent = (event: CustomEvent<SetScreenOverlayEventDetail>) => {
      console.log(event.detail.overlay);
      setScreenOverlayNode(event.detail.overlay);
    };

    window.addEventListener(windowEvents.SetScreenOverlay.valueOf(), handleSetEvent as EventListener);


    const handleDismissEvent = () => { setScreenOverlayNode(null); }
    window.addEventListener(windowEvents.DismissScreenOverlay.valueOf(), handleDismissEvent);


    const cleanup = () => {
      window.removeEventListener(windowEvents.SetScreenOverlay.valueOf(), handleSetEvent as EventListener);
      window.removeEventListener(windowEvents.DismissScreenOverlay.valueOf(), handleDismissEvent);
    }

    return cleanup;
  }, []);


  return (
    <>
      <GlobalStyle />
      <WindowsBar />

      <Container>
        <Viewport>
          <HashRouter>
            <Routes>
              <Route path="/" element={<LocationViewerPage />} />
              {/* <Route path="/" element={<StartupPage/>} /> */}
              <Route path="/LocationSearcher" element={<LocationSearchPage />} />
              <Route path="/LocationViewer" element={<LocationViewerPage />} />
            </Routes>
          </HashRouter>
        </Viewport>
      </Container>
      
      {screenOverlayNode &&
        <ScreenOverlay>
          {screenOverlayNode}
        </ScreenOverlay>
      }
    </>
  );
}

export default App;
