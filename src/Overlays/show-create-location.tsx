import { useState } from "react"
import OverlayPrompt from "../Components/OverlayPrompt/OverlayPrompt";
import { HDivider } from "../Components/InspectorComponents/Headers/Headers.styles";
import InspectorButton from "../Components/InspectorComponents/InspectorButton/InspectorButton";
import TextField from "../Components/TextField/TextField";
import fromMainEvents from "../IPCEvents/ipc-from-main-events";
import toMainEvents from "../IPCEvents/ipc-to-main-events";
import pickDirectory from "../Utilities/file-io/pick-directory";
import { setScreenOverlayEvent } from "../WindowEvents/set-screen-overlay";



const showCreateLocationOverlay = () => {
  const overlay = (<CreateLocationOverlay

  />)

  setScreenOverlayEvent({ overlay });
}

export default showCreateLocationOverlay;

interface NewLocationProps {
  locationName: string;
  dirPath: string;
  NW: string;
  SE: string;
}

const CreateLocationOverlay = () => {
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
    window.api.request(toMainEvents.createNewLocation, locationProps);
  }

  window.api.response(fromMainEvents.pickDirectoryForNewLocation, (args: any) => {
    if (args.data) {
      setLocationProps({ ...locationProps, dirPath: args.data })
    }
  })

  return (
    <OverlayPrompt
      modalName={"Create new location"}

      buttonsProps={[{
        text: "Create",
        validator: validateLocationProps,
        onValidatorFail: onValidationFailed,
        callback: createLocation,
      }]}
    >

      <TextField
        label={"Location name:"}
        initialText={locationProps.locationName}
        onChange={(o) => { setLocationProps({ ...locationProps, locationName: o }) }}
      />


      <TextField
        label={"NW Coordinate:"}
        initialText={locationProps.NW}
        onChange={(o) => { setLocationProps({ ...locationProps, NW: o }) }}
      />

      <TextField
        label={"SE Coordinate:"}
        initialText={locationProps.SE}
        onChange={(o) => { setLocationProps({ ...locationProps, SE: o }) }}
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