import React, { ReactNode } from "react";
import { Container, Group } from "./Toolbar.styles";

interface ToolbarProps {
  upperElements?: ReactNode[] | null | undefined,
  middleElements?: ReactNode[] | null | undefined,
  lowerElements?: ReactNode[] | null | undefined,
}

const Toolbar = (props: ToolbarProps) => {

  return (
    <Container>
      <Group>{props.upperElements}</Group>
      <Group>{props.middleElements}</Group>
      <Group>{props.lowerElements}</Group>
    </Container>
  );
};

export default Toolbar;