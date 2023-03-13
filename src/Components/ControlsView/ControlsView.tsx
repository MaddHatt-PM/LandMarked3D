import React, { ReactNode, useState } from "react";
import { QuestionMarkSVG } from "../../Assets/SVGAssets";
import { Container, Icon, EnabledContentWrapper } from "./ControlsView.styles";

interface ControlsViewProps {
  enabledContent: ReactNode;
  onToggle?: (newState: boolean) => void;
}

const ControlsView = (props: ControlsViewProps) => {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    if (props.onToggle) {
      props.onToggle(newState)
    }
  };

  return (
    <Container className={enabled ? "enabled" : ""} onClick={handleToggle}>

      {enabled
        ? <EnabledContentWrapper className={enabled ? "enabled" : ""}>
          {props.enabledContent}
        </EnabledContentWrapper>
        : <QuestionMarkSVG color="#ffffff80" height={14} />
      }
      


    </Container>
  );
};

export default ControlsView;