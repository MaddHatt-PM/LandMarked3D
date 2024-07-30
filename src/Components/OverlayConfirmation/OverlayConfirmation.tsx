import React, { ReactNode } from "react";
import OverlayPrompt, { AcceptPrompts, DismissPrompts } from "../OverlayPrompt/OverlayPrompt";
import { Container } from "./OverlayConfirmation.styles";


interface OverlayConfirmationProps {
  modalName: string;
  icon?: ReactNode;
  acceptCallback: () => void;
  description: string;
  dismissPrompt: DismissPrompts;
  acceptPrompt: AcceptPrompts;
}


/**
 * Create a confirmation-only prompt that overlays the screen that
 * disables further user input until the prompt is handled. 
 * 
 * For a general overlay with customizability, see `OverlayPrompt`
 * (the element with which this is extended from).
 * 
 * 
 * @param props {@link OverlayConfirmationProps}
 * @returns A react element.
 */
const OverlayConfirmation = (props: OverlayConfirmationProps) => {
  return (
    <OverlayPrompt
      modalName={props.modalName}
      icon={props.icon}
      description={props.description}
      dismissPrompt={props.dismissPrompt}
      buttonsProps={
        [{ text: props.acceptPrompt, callback: props.acceptCallback }]
      }
    >
    </OverlayPrompt>
  );
};
export default OverlayConfirmation;