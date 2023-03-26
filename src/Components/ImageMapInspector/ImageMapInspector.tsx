import React from "react";
import { HDivider } from "../InspectorComponents/Headers/Headers.styles";
import Toggle from "../InspectorComponents/Toggle/Toggle";
import Panel from "../Panel/Panel";
import { Container } from "./ImageMapInspector.styles";

interface ImageMapInspectorProps {
  renderData: ViewportRenderData;
  setRenderData: (data: ViewportRenderData) => void;

}
const ImageMapInspector = (props: ImageMapInspectorProps) => {

  const handleRenderToggle = (isChecked: boolean) => {
    props.setRenderData({ ...props.renderData, displayImageMaps: isChecked });
  }

  return (
    <Panel width="250px">
      <div style={{ height: "14px", margin: "-10px 0 2px" }}>
        <Toggle
          initialState={true}
          label={"Image Map Inspector"}
          callback={handleRenderToggle}
        />
      </div>

      <HDivider />

    </Panel>
  );
};

export default ImageMapInspector;