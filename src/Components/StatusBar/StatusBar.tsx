import React from "react";
import { Container, Divider, HStack, Text } from "./StatusBar.styles";

const StatusBar = () => {

  return (
    <Container>
      {/* Left Aligned: Backend */}
      <HStack>
        <Text>Backend Processes</Text>
      </HStack>

      {/* Right Aligned: Frontend */}
      <HStack>
        <Text>test</Text>
        <Text>test</Text>
        <Divider></Divider>
        <Text>Lat:85.9853</Text>
        <Text>Lon:65.2349</Text>
        <Text>Ele:215.5ft</Text>
      </HStack>
    </Container>
  );
};

export default StatusBar;