import React from "react";
import { Container, Wrapper } from "./Panel.styles";

interface PanelProps {
  width?: string;
  children: React.ReactNode;
}

const Panel = (props:PanelProps) => {

  return (
    <Container>
      <Wrapper>
        {props.children}
      </Wrapper>
    </Container>
  );
};

export default Panel;