import React, { ReactNode } from "react";
import { dismissScreenOverlayEvent } from "../../WindowEvents/set-screen-overlay";
import { CloseButton, Container, HStack, ModalButton, ModalDivider, ModalHeader, VStack, Wrapper } from "./OverlayPrompt.styles";


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


export interface OverlayPromptProps {
  modalName: string;
  icon?: ReactNode;
  description?: string;
  children?: ReactNode;
  buttonsProps?: ButtonOption[];
  dismissPrompt?: DismissPrompts;
  hideDismissButton?: boolean;
}


/**
 * Create a prompt that overlays the screen that disables further user input until
 * the prompt is handled. While the base prompt is limited to an accept/decline,
 * additionally functionality can be applied through the `ButtonOption` interface.
 * If further customization is required, additional elements can be appended
 * through `props.children`.
 * 
 * For a confirmation specific overlay, see `OverlayConfirmation` (an extension
 * of OverlayPrompt).
 * 
 * @param props {@link OverlayPromptProps}
 * @returns A react element.
 */
const OverlayPrompt = (props: OverlayPromptProps) => {
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
              <ModalButton key={index} onClick={() => {
                // If supplied, restrict execution until validation is upheld
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
    </Container>
  );
};
export default OverlayPrompt;