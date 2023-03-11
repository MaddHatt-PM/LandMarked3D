import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import { Container, Wrapper } from "./Panel.styles";

interface PanelProps {
  width?: string;
  children: React.ReactNode;
}

const Panel = () => {

  return (
    <Container>
      <Wrapper>
        
      
        <Dropdown
        options={["Example01", "Example02", "Example03"]} 
        defaultOption={"Example01"}
        onSelect={(o)=> {console.log(o)}}/>

        <p>Test</p>
      </Wrapper>
    </Container>
  );
};

export default Panel;