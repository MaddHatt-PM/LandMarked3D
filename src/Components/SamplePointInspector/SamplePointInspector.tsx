import React from "react";
import { HDivider } from "../InspectorComponents/Headers/Headers.styles";
import Toggle from "../InspectorComponents/Toggle/Toggle";
import Panel from "../Panel/Panel";
import { Container } from "./SamplePointInspector.styles";

interface SamplePointInspectorProps {



  renderData: ViewportRenderData;
  setRenderData: (data: ViewportRenderData) => void;
}

const SamplePointInspector = (props: SamplePointInspectorProps) => {

  const handleRenderToggle = (isChecked: boolean) => {
    props.setRenderData({...props.renderData, displayPointFields: isChecked});
  }

  return (
    <Panel width="250px">
      <div style={{ height: "14px", margin: "-10px 0 2px" }}>
        <Toggle
          initialState={true}
          label={"Point Field Inspector"}
          callback={handleRenderToggle}
        />
      </div>

      <HDivider/>

    </Panel>
  );
};

export default SamplePointInspector;