import { useState } from "react";
import OverlayPrompt from "../../Components/OverlayPrompt/OverlayPrompt";
import TextField from "../../Components/TextField/TextField";
import { setScreenOverlayEvent } from "../../WindowEvents/set-screen-overlay";

interface ShowRenameOverlayProps {
  modalName: string;
  labelText: string;
  originalName: string;

  validateRename?: (newName: string) => boolean;
  onValidationFailText?: string;
  onValidationPassText?: string;

  finalizeRename: (newName: string) => void;
}

const showRenameOverlay = (props: ShowRenameOverlayProps) => {
  const overlay = (<RenameOverlay
    modalName={props.modalName}
    labelText={props.labelText}
    originalName={props.originalName}

    validateRename={props.validateRename}
    onValidationFailText={props.onValidationFailText}
    onValidationPassText={props.onValidationPassText}

    finalizeRename={props.finalizeRename}
  />)

  setScreenOverlayEvent({ overlay });
}

export default showRenameOverlay;

const RenameOverlay = (props: ShowRenameOverlayProps) => {
  const [newName, setNewName] = useState(props.originalName);

  return (
    <OverlayPrompt
      modalName={props.modalName}
      buttonsProps={[{
        text: "Rename",
        validator: () => {return newName !== ""},
        onValidatorFail: () => { console.log("validator failed"); },
        callback: () => { props.finalizeRename(newName); }

      }]}

    >
      <TextField
        label={props.labelText}
        initialText={newName}
        onChange={o => setNewName(o)}
      />

    </OverlayPrompt>
  );
}