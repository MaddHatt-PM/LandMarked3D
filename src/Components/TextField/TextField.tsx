import {ChangeEvent, useState} from "react";
import { Container, Input, Wrapper } from "./TextField.styles";

interface TextFieldProps {
  label: string;
  initialText: string;
  placeholder?: string;
  onChange: (text: string) => void;
}

const TextField = (props: TextFieldProps) => {
  const [value, setValue] = useState(props.initialText)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    props.onChange(newValue);
  }

  return (
    <Container>
      <Wrapper>
        {props.label}
        <Input
          type={"text"}
          value={value}
          placeholder={props.placeholder}
          onChange={handleChange}
        />
      </Wrapper>
    </Container>
  );
};

export default TextField;