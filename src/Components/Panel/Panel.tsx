import React from "react";
import { Container, Wrapper } from "./Panel.styles";


interface PanelProps {
  width?: string;
  children: React.ReactNode;
}


/**
 * Create a container element of a specified width.
 * 
 * @param props {@link PanelProps} 
 * @returns A react element.
 */
const Panel = (props:PanelProps) => {
  return (
    <Container width={props.width}>
      <Wrapper>
        {props.children}
      </Wrapper>
    </Container>
  );
};

export default Panel;