import React from "react";
import { ButtonToggle, Container } from "./SegmentedSwitch.styles";

interface SegmentedSwitchProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}
const SegmentedSwitch = (props: SegmentedSwitchProps) => {

  return (
    <Container>
      {props.options.map((option) => (
        <ButtonToggle
          key={option}
          selected={props.selectedOption === option}
          onClick={() => props.onSelect(option)}
        >
          {option}
        </ButtonToggle>
      ))}
    </Container>
  );
};

export default SegmentedSwitch;