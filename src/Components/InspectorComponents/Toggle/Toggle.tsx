import React, { useState, ReactNode } from "react";
import { Container, ToggleContainer, ToggleSlider, Wrapper } from "./Toggle.styles";

interface ToggleProps {
  label: ReactNode;
  initialState: boolean;
  callback: (isChecked: boolean) => void;
}

const Toggle = (props: ToggleProps) => {
  const [isChecked, setIsChecked] = useState(props.initialState);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    props.callback(!isChecked);
  };

  return (
    <Container>
      <Wrapper>
        {props.label}
        <ToggleContainer>
          <ToggleSlider className={isChecked ? "is-checked" : ""} onClick={handleToggle} />
        </ToggleContainer>
      </Wrapper>
    </Container>
  );
};

export default Toggle;