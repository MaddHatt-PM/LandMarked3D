import React, { ReactNode } from "react";
import BaseOverlay, { AcceptPrompts, DismissPrompts } from "../BaseOverlay/BaseOverlay";
import { Container } from "./ConfirmationOverlay.styles";

interface ConfirmationOverlayProps {

  modalName: string;
  icon?: ReactNode;
  acceptCallback: () => void;
  description: string;
  dismissPrompt: DismissPrompts;
  acceptPrompt: AcceptPrompts;
}

const ConfirmationOverlay = (props: ConfirmationOverlayProps) => {

  return (
    <BaseOverlay
      modalName={props.modalName}
      icon={props.icon}
      description={props.description}
      dismissPrompt={props.dismissPrompt}
      buttonsProps={
        [{ text: props.acceptPrompt, callback: props.acceptCallback }]
      }
    >
    </BaseOverlay>
  );
};

export default ConfirmationOverlay;