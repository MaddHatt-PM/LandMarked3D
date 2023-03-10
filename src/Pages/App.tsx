import WindowsBar from "../Components/WindowsBar/WindowsBar";
import { GlobalStyle } from "../GlobalStyles";
import { Container, Viewport } from "./App.styles";
import { HashRouter, Routes, Route } from 'react-router-dom';
import StartupPage from "./StartupPage/StartupPage";
import LocationViewerPage from "./LocationViewerPage/LocationViewerPage";
import LocationSearchPage from "./LocationSearchPage/LocationSearchPage";

function App() {
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
    </>
  );
}

export default App;
