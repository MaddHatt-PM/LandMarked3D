import React, { ReactNode, useState } from "react";
import { QuestionMarkSVG } from "../../Assets/SVGAssets";
import { Container, Icon, EnabledContentWrapper } from "./ToggleExpandedView.styles";


interface ToggleExpandedViewProps {
  enabledContent: ReactNode;
  onToggle?: (newState: boolean) => void;
}

/**
 * @param props {@link ToggleExpandedViewProps}
 * @returns A react element.
 */
const ToggleExpandedView = (props: ToggleExpandedViewProps) => {
  const [enabled, setEnabled] = useState(false);

  // Create a callback function to handle toggling of the control
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
        ? <EnabledContentWrapper className={enabled ? "enabled" : ""}> {props.enabledContent} </EnabledContentWrapper>
        : <QuestionMarkSVG color="#ffffff80" height={14} />
      }

    </Container>
  );
};
export default ToggleExpandedView;