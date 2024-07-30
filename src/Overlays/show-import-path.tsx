import { useState } from "react"
import OverlayPrompt from "../Components/OverlayPrompt/OverlayPrompt";
import { HDivider } from "../Components/InspectorComponents/Headers/Headers.styles";
import InspectorButton from "../Components/InspectorComponents/InspectorButton/InspectorButton";
import TextField from "../Components/TextField/TextField";
import fromMainEvents from "../IPCEvents/ipc-from-main-events";
import pickDirectory from "../Utilities/file-io/pick-directory";
import { setScreenOverlayEvent } from "../WindowEvents/set-screen-overlay";



const showImportPathOverlay = () => {
  const overlay = (<CreateImportPathOverlay

  />)

  setScreenOverlayEvent({ overlay });
}

export default showImportPathOverlay;

interface NewLocationProps {
  locationName: string;
  dirPath: string;
  NW: string;
  SE: string;
}

const CreateImportPathOverlay = () => {
  const [locationProps, setLocationProps] = useState<NewLocationProps>({
    locationName: "",
    dirPath: "",
    NW: "",
    SE: "",
  })

  const validateLocationProps = (): boolean => {
    if (locationProps.locationName === "") { return false }
    if (locationProps.NW === "") { return false }
    if (locationProps.SE === "") { return false }
    if (locationProps.dirPath === "") { return false }

    return true;
  }

  const onValidationFailed = () => {

  }

  const createLocation = () => {
    console.log(locationProps)
  }

  window.api.response(fromMainEvents.pickDirectoryForNewLocation, (args: any) => {
    if (args.data) {
      setLocationProps({ ...locationProps, dirPath: args.data })
    }
  })

  return (
    <OverlayPrompt
      modalName={"Import CSV Path"}

      buttonsProps={[{
        text: "Import",
        validator: validateLocationProps,
        onValidatorFail: onValidationFailed,
        callback: createLocation,
      }]}
    >

      <TextField
        label={"Path name:"}
        initialText={locationProps.locationName}
        onChange={(o) => { setLocationProps({ ...locationProps, locationName: o }) }}
      />

      <HDivider />

      <InspectorButton
        buttonText="Select Directory"
        callback={() => {
          pickDirectory(fromMainEvents.pickDirectoryForNewLocation)
        }}
      />

      <p>{locationProps.dirPath}</p>

    </OverlayPrompt>
  )
}