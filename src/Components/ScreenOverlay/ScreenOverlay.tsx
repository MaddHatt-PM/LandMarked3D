import React from "react";
import { Container, Wrapper } from "./ScreenOverlay.styles";

interface ScreenOverlayProps {
  children: React.ReactNode;
}
const ScreenOverlay = (props: ScreenOverlayProps) => {

  return (
    <Container>
      <Wrapper>
      {props.children}
      </Wrapper>
    </Container>
  );
};

export default ScreenOverlay;