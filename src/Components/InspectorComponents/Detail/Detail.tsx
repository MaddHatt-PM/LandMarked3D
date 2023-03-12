import React from "react";
import { Container, Label, Text, Wrapper } from "./Detail.styles";

interface DetailProps {
  label?: string;
  detail: string;
}

const Detail = (props: DetailProps) => {

  return (
    <Container>
      <Wrapper>
        {props.label && <Label>{props.label}</Label>}
        <Text>{props.detail}</Text>
      </Wrapper>
    </Container>
  );
};

export default Detail;