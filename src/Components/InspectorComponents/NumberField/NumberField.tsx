import React, { ChangeEvent, useState } from "react";
import { clamp } from "../../../Utilities/math";
import { Container, Label, SliderInput, SliderValue, Wrapper } from "./NumberField.styles";

interface NumberFieldProps {
  label: string,
  min?: number,
  max?: number,
  trueMin?: number;
  trueMax?: number
  step?: number,
  initialValue?: number,
  hasSlider?: boolean,
  onChange: (value: number) => void;
}

const NumberField = ({ label, min = 0, max = 1, trueMin = 0, trueMax = 1, step = 0.01, initialValue = 0.8, hasSlider = true, onChange }: NumberFieldProps) => {
  const [value, setValue] = useState(initialValue);
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = clamp(
      Math.min(min, trueMin),
      Math.max(max, trueMax),
      parseFloat(event.target.value)
    );
    setValue(newValue);
    onChange(newValue);
  }

  return (
    <Container>
      <Wrapper>
        <Label>{label}</Label>
        {hasSlider &&
          <SliderInput
            type={"range"}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            percentage={percentage}
          />
        }
        <SliderValue
          type="number"
          value={value}
          step={step}
          onChange={handleChange}
        />
      </Wrapper>
    </Container>
  );
};

export default NumberField;