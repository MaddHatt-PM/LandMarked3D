import React, { ReactNode, useState } from "react";
import LayerEditor from "../../Components/LayerEditor/LayerEditor";
import LocationViewport from "../../Components/LocationView/LocationViewport";
import HoverButton from "../../Components/ToolbarButton/ToolbarButton";
import Panel from "../../Components/Panel/Panel";
import StatusBar from "../../Components/StatusBar/StatusBar";
import Toolbar from "../../Components/Toolbar/Toolbar";
import { HStack, VStack, Wrapper } from "./LocationViewerPage.styles";
import { AreaSVG, CloudDownloadSVG, ExportSVG, GearSVG, LayersSVG, QuestionMarkSVG, TreeSVG } from "../../Assets/SVGAssets";
import ControlsView from "../../Components/ControlsView/ControlsView";
import UITestPanel from "../../Components/UITestPanel/UITestPanel";
import NotImplementedPanel from "../../Components/NotImplementedPanel/NotImplementedPanel";


enum ToolbarModes {
  AreaEditor,
  TreeEditor,
  LayerEditor,
  Download,
  Export,
  Settings,

  // DEV
  UITest,
}

const inspectors: Record<ToolbarModes, ReactNode> = {
  [ToolbarModes.AreaEditor]: (<NotImplementedPanel name={"AreaEditor"} />),
  [ToolbarModes.TreeEditor]: (<NotImplementedPanel name={"TreeEditor"} />),
  [ToolbarModes.LayerEditor]: (<NotImplementedPanel name={"LayerEditor"} />),
  [ToolbarModes.Download]: (<NotImplementedPanel name={"Download"} />),
  [ToolbarModes.Export]: (<NotImplementedPanel name={"Export"} />),
  [ToolbarModes.Settings]: (<NotImplementedPanel name={"Settings"} />),
  [ToolbarModes.UITest]: (<UITestPanel />)
}

function LocationViewerPage() {
  const [inspector, setInspector] = useState(ToolbarModes.AreaEditor);
  const [showInspector, setShowInspector] = useState(true)

  const handleToolbarCallback = (newInspector: ToolbarModes) => {
    if (inspector === newInspector) {
      setShowInspector(!showInspector);
      return;
    }

    setInspector(newInspector);
    setShowInspector(true);
  };

  return (
    <>
      <VStack>
        <Wrapper>
          <HStack>
            <Toolbar
              upperElements={[
                { text: "Area Editor", icon: (<AreaSVG color="white" width={"20"} />), mode: ToolbarModes.AreaEditor },
                { text: "Tree Editor", icon: (<TreeSVG color="white" width={"20"} />), mode: ToolbarModes.TreeEditor },
              ].map((o, id) => <HoverButton
                key={id}
                width={"44px"}
                text={o.text}
                icon={o.icon}
                callback={() => { handleToolbarCallback(o.mode) }}
              />)}

              lowerElements={[
                { text: "DEV: UI Test", icon: (<QuestionMarkSVG color="white" width={"12"} />), mode: ToolbarModes.UITest },

                { text: "Layers", icon: (<LayersSVG color="white" width={"20"} />), mode: ToolbarModes.LayerEditor },
                { text: "Download Data", icon: (<CloudDownloadSVG color="white" width={"20"} />), mode: ToolbarModes.Download },
                { text: "Export", icon: (<ExportSVG color="white" width={"18"} />), mode: ToolbarModes.Export },
                { text: "Settings", icon: (<GearSVG color="white" width={"20"} />), mode: ToolbarModes.Settings },
              ].map((o, id) => <HoverButton
                key={id}
                width={"40px"}
                text={o.text}
                icon={o.icon}
                callback={() => { handleToolbarCallback(o.mode) }}
              />)}
            />

            {
              Object.values(inspectors).map((view, index) => (
                <div
                  key={index}
                  style={{ height: "100%", display: index === inspector && showInspector ? "block" : "none" }}>
                  {view}
                </div>
              ))
            }
            <LocationViewport />

            <ControlsView enabledContent={
              <p>testing controls</p>
            } />
          </HStack>
        </Wrapper>
        <StatusBar />
      </VStack>
    </>
  );
};

export default LocationViewerPage;