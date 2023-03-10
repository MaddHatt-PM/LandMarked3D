import React, { ReactNode } from "react";
import { Container } from "./OutlineButton.styles";

interface OutlineButtonProps {
  text: string,
  icon: string | ReactNode,
  callback: () => void,
  hoverElement?: ReactNode | null | undefined,
}
const OutlineButton = (props: OutlineButtonProps) => {

  return (
    <Container>

    </Container>
  );
};

export default OutlineButton;