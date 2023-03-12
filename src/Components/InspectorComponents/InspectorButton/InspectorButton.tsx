import React from "react";
import { Button, Container, Wrapper } from "./InspectorButton.styles";

interface InspectorButtonProps {
  label?: string;
  buttonText: string;
  callback: () => void;
}

const InspectorButton = (props: InspectorButtonProps) => {

  return (
    <Container>
      <Wrapper>
        {props.label}
        <Button className={!props.label ? "full-width" : ""} onClick={props.callback}>
          {props.buttonText}
        </Button>
      </Wrapper>
    </Container>
  );
};

export default InspectorButton;