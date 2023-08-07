import React, { useEffect, useState } from "react";
import { LogoSVG } from "../../Assets/SVGAssets";
import { GridLines } from "../../Components/ViewportRenderer/ViewportRenderer.styles";
import { useNavigateTo } from "../../Hooks/useNavigateTo";
import fromMainEvents from "../../IPCEvents/ipc-from-main-events";
import toMainEvents from "../../IPCEvents/ipc-to-main-events";
import showCreateLocationOverlay from "../../Overlays/show-create-location";
import loadLocation from "../../Utilities/file-io/load-location";
import windowEvents from "../../WindowEvents/window-events";
import { BottomBar, Box, Container, Divider, HStack, RecentButton, RecentHeader as Header, SubPanel, TextButton, Wrapper } from "./StartupPage.styles";

interface RecentLocation {
  name: string,
  filepath: string
}

function StartupPage() {

  const [recentLocations, setRecentLocations] = useState<RecentLocation[]>([]);
  window.api.response(fromMainEvents.getRecentLocations, (args: any) => {
    setRecentLocations(args.data);
  });
  useEffect(() => {
    window.api.request(toMainEvents.getRecentLocations);
  }, []);

  const navigateTo = useNavigateTo();
  const switchSceneAndLoad = (filepath: string) => {
    loadLocation(filepath);
    navigateTo({ page: "location-viewer" });
  }

  const renderRecentsLocations = () => {
    return (
      recentLocations.length === 0
        ? 'No recent locations'
        : recentLocations.map(o => {
          return (
            <RecentButton key={o.filepath} onClick={() => { switchSceneAndLoad(o.filepath) }} >
              <p style={{ lineHeight: 0, margin: 0, marginTop: '0.75em' }}>{o.name ?? 'Name unavailable'}</p>
              <p style={{ opacity: '0.6', fontSize: 'smaller', marginBottom: '0.5em' }}>{o.filepath}</p>
            </RecentButton>
          )
        })
    )
  }

  return (
    <>
      <Container>
        <GridLines
          spacing={32}
          zoom={1}
          translateX={0}
          translateY={0}
          style={{ opacity: 0.2 }}
        />

        <Wrapper>

          <Box>
            <HStack>
              <SubPanel>
                <Header style={{ fontSize: '3em' }}><strong>LandMarked3D</strong></Header>

                <div style={{ display: 'flex', height: 36 }}>

                  <RecentButton onClick={showCreateLocationOverlay}>
                    {"New Location"}
                  </RecentButton>
                  <RecentButton onClick={() => {
                    loadLocation();
                    navigateTo({ page: "location-viewer" });
                  }}>
                    {"Open Location"}
                  </RecentButton>
                  <RecentButton>
                    {"Settings"}
                  </RecentButton>
                </div>

                <Divider style={{ margin: '8px 0' }} />
                <div />
                <Header style={{ fontSize: '1.8em' }}>Recent Locations</Header>
                {renderRecentsLocations()}
              </SubPanel>

              <SubPanel style={{ maxWidth: '33%' }}>
                <LogoSVG
                  height={600 * 0.55}
                  style={{
                    position: "relative",
                    left: -32,
                    top: -60
                  }}
                />
              </SubPanel>
            </HStack>

            <BottomBar>
              {/* Left Aligned */}
              <div>
                <span style={{ opacity: 0.3 }}><i>v0.1</i></span>
              </div>

              {/* Right Aligned */}
              <div>
                <TextButton
                  onClick={() => { window.api.request(toMainEvents.openInBrowser, { url: 'https://github.com/MaddHatt-PM/LandMarked3D' }) }}
                >
                  {/* Github icon */}
                  View Project on Github
                </TextButton>
              </div>
            </BottomBar>
          </Box>
        </Wrapper>

      </Container>
    </>
  );
};

export default StartupPage;