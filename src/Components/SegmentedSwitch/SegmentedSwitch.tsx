import React, { ReactNode, useEffect } from "react";
import { ButtonToggle, Container } from "./SegmentedSwitch.styles";

interface SegmentedSwitchProps {
  options: any[];
  selectedOption: any;
  optionToDisplay: (option: any) => ReactNode
  onSelect: (option: any) => void;
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
          {props.optionToDisplay(option)}
        </ButtonToggle>
      ))}
    </Container>
  );
};

export default SegmentedSwitch;