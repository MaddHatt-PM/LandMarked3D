import React from "react";
import { Container, Text, Title, TitleWrapper, Wrapper } from "./HelpBox.styles";

enum state {
  none,
  warning,
  error
}

interface HelpBoxProps {
  state?: state
  title?: string,
  text: string
}
const HelpBox = (props: HelpBoxProps) => {

  return (
    <Container>
      <Wrapper>

        <TitleWrapper>
          <Title>{props.title}</Title>
        </TitleWrapper>
        <Text>{props.text}</Text>
      </Wrapper>
    </Container>
  );
};

export default HelpBox;