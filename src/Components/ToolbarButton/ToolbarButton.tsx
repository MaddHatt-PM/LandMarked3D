import React, { ReactNode } from "react";
import { Container, Icon, Text, Tooltip } from "./ToolbarButton.styles";

interface HoverButtonProps {
  text: string,
  icon?: ReactNode,
  callback?: () => void | null | undefined,
  hoverElement?: ReactNode | null | undefined,
  width?: string;
  height?: string;
}
const HoverButton = (props: HoverButtonProps) => {

  return (
    <Container onClick={props.callback} width={props.width} height={props.height}>
      {props.icon
        ? props.icon
        : <Text>{props.text}</Text>
      }
      <Tooltip className="tooltip">{props.text}</Tooltip>
    </Container>
  );
};

export default HoverButton;