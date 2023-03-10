import React from "react";
import LayerEditor from "../../Components/LayerEditor/LayerEditor";
import LocationView from "../../Components/LocationView/LocationView";
import StatusBar from "../../Components/StatusBar/StatusBar";
import Toolbar from "../../Components/Toolbar/Toolbar";
import { HStack, VStack } from "./LocationViewerPage.styles";

enum ToolbarModes {
  LayerEditor,
  AreaEditor,
  TreeEditor,
  Settings,
}

function LocationViewerPage() {


  return (
    <>
      <VStack>
        <HStack>
          <Toolbar
            upperElements={[]}
            middleElements={[]}
            lowerElements={[]}
          />
          test
          <LayerEditor />

          <LocationView />
        </HStack>
        <StatusBar />
      </VStack>
    </>
  );
};

export default LocationViewerPage;