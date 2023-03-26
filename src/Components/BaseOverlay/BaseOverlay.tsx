import React, { ReactNode } from "react";
import { dismissScreenOverlayEvent } from "../../WindowEvents/set-screen-overlay";
import { CloseButton, Container, HStack, ModalButton, ModalDivider, ModalHeader, VStack, Wrapper } from "./BaseOverlay.styles";

interface OverlayModalProps {
  modalName: string;
  icon?: ReactNode;
  primaryDescription?: string;
  children: ReactNode;
}

const BaseOverlay = (props: OverlayModalProps) => {

  return (
    <Container>
      <Wrapper>
        <HStack>
          <ModalHeader>{props.modalName}</ModalHeader>
          <CloseButton onClick={dismissScreenOverlayEvent}>X</CloseButton>
        </HStack>

        <ModalDivider />

        <VStack>
            {"-"}
          <HStack>
            <div />
            {props.children}
          </HStack>
        </VStack>

      </Wrapper>
    </Container>
  );
};

export default BaseOverlay;