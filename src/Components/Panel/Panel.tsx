import React from "react";
import InspectorButton from "../InspectorComponents/InspectorButton/InspectorButton";
import Dropdown from "../InspectorComponents/Dropdown/Dropdown";
import { H1, H2, H3, HDivider, Text } from "../InspectorComponents/Headers/Headers.styles";
import { Container, Wrapper } from "./Panel.styles";
import NumberField from "../InspectorComponents/NumberField/NumberField";
import Detail from "../InspectorComponents/Detail/Detail";
import TextField from "../TextField/TextField";
import HelpBox from "../InspectorComponents/HelpBox/HelpBox";

interface PanelProps {
  width?: string;
  children: React.ReactNode;
}

const Panel = (props:PanelProps) => {

  return (
    <Container>
      <Wrapper>

        {props.children}

      </Wrapper>
    </Container>
  );
};

export default Panel;