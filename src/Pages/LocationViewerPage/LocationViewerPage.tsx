import React from "react";
import LayerEditor from "../../Components/LayerEditor/LayerEditor";
import LocationView from "../../Components/LocationView/LocationView";
import HoverButton from "../../Components/ToolbarButton/ToolbarButton";
import Panel from "../../Components/Panel/Panel";
import StatusBar from "../../Components/StatusBar/StatusBar";
import Toolbar from "../../Components/Toolbar/Toolbar";
import { HStack, VStack } from "./LocationViewerPage.styles";
import { AreaSVG, CloudDownloadSVG, ExportSVG, GearSVG, LayersSVG, TreeSVG } from "../../Assets/SVGAssets";


enum ToolbarModes {
  AreaEditor,
  TreeEditor,
  LayerEditor,
  Settings,
}
function LocationViewerPage() {

  return (
    <>
      <VStack>
        <HStack>
          <Toolbar
            upperElements={[
              { text: "Area Editor", icon: (<AreaSVG color="white" width={"20"} />), callback: () => { } },
              { text: "Tree Editor", icon:(<TreeSVG color="white" width={"20"} />), callback: () => { } },
            ].map((o, id) => <HoverButton key={id} width={"44px"} text={o.text} icon={o.icon} />)}

            lowerElements={[
              { text: "Layers", icon: (<LayersSVG color="white" width={"20"} />), callback: () => { } },
              { text: "Maps", icon: (<CloudDownloadSVG color="white" width={"20"} />), callback: () => { } },
              { text: "Export", icon: (<ExportSVG color="white" width={"18"} />), callback: () => { } },
              { text: "Settings", icon: (<GearSVG color="white" width={"20"} />), callback: () => { } },
            ].map((o, id) => <HoverButton key={id} width={"40px"} text={o.text} icon={o.icon} />)}
          />
          <LayerEditor />

          <Panel />

          <LocationView />
        </HStack>
        <StatusBar />
      </VStack>
    </>
  );
};

export default LocationViewerPage;