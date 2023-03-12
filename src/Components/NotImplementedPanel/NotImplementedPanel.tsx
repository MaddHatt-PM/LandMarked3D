import React from "react";
import { H3 } from "../InspectorComponents/Headers/Headers.styles";
import Panel from "../Panel/Panel";
import { Container } from "./NotImplementedPanel.styles";

interface NotImplentedPanelProps {
  name:string
}

const NotImplementedPanel = (props: NotImplentedPanelProps) => {

  return (
    <Panel children={(
      <>
        <H3>{`${props.name} is not implemented`}</H3>
      </>
    )}
    />
  );
};

export default NotImplementedPanel;