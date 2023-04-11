import React, { ReactNode } from "react";
import { dismissScreenOverlayEvent } from "../../WindowEvents/set-screen-overlay";
import { CloseButton, Container, HStack, ModalButton, ModalDivider, ModalHeader, VStack, Wrapper } from "./BaseOverlay.styles";

export enum AcceptPrompts {
  Ok = "Ok",
  Confirm = "Confirm",
  Yes = "Yes",
  Accept = "Accept"
}

export enum DismissPrompts {
  Ok = "Ok",
  Cancel = "Cancel",
  No = "No",
  Decline = "Decline"
}

interface ButtonOption {
  text: string,
  validator?: () => boolean;
  onValidatorFail?: () => void;
  callback: () => void;
}

export interface BaseOverlayProps {
  modalName: string;
  icon?: ReactNode;
  description?: string;
  children?: ReactNode;
  buttonsProps?: ButtonOption[];
  dismissPrompt?: DismissPrompts;
  hideDismissButton?: boolean;
}

const BaseOverlay = (props: BaseOverlayProps) => {

  return (
    <Container>
      <Wrapper>
        <HStack style={{ marginTop: "-2px" }}>
          <ModalHeader>{props.modalName}</ModalHeader>
          <CloseButton onClick={dismissScreenOverlayEvent}>X</CloseButton>
        </HStack>

        <ModalDivider />

        <VStack>

          <div style={{ fontSize: "medium", margin: "auto" }}>
            {(!props.icon || !props.description) &&
              <p></p>
            }
            {props.icon}
            {props.description}
            {props.children}
          </div>

          <HStack style={{
            flexDirection: "row",
            justifyContent: "flex-end"
          }} >

            {props.buttonsProps?.map((value, index) => (
              < ModalButton key={index} onClick={() => {
                if (value.validator !== undefined && value.validator() === false) {
                  console.log("validator failed")
                  if (value.onValidatorFail !== undefined) {
                    value.onValidatorFail();
                  }
                  return;
                }
                value.callback();
                dismissScreenOverlayEvent();
              }}>
                {value.text}
              </ModalButton>
            ))
            }

            {!props.hideDismissButton &&
              <ModalButton onClick={dismissScreenOverlayEvent}>
                {props.dismissPrompt ?? DismissPrompts.Cancel}
              </ModalButton>
            }
          </HStack>
        </VStack>

      </Wrapper>
    </Container >
  );
};

export default BaseOverlay;