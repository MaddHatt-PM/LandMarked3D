import React, { ReactNode } from "react";
import { Container } from "./Toolbar.styles";

interface ToolbarProps {
  upperElements?: ReactNode[] | null | undefined,
  middleElements?: ReactNode[] | null | undefined,
  lowerElements?: ReactNode[] | null | undefined,
}

const Toolbar = (props: ToolbarProps) => {

  return (
    <Container>
      
    </Container>
  );
};

export default Toolbar;