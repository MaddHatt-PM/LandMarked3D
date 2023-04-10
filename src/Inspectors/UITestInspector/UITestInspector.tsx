import React, { useEffect, useState } from "react";
import Panel from "../../Components/Panel/Panel";
import InspectorButton from "../../Components/InspectorComponents/InspectorButton/InspectorButton";
import Dropdown from "../../Components/InspectorComponents/Dropdown/Dropdown";
import { H1, H2, H3, HDivider, Text } from "../../Components/InspectorComponents/Headers/Headers.styles";
import NumberField from "../../Components/InspectorComponents/NumberField/NumberField";
import Detail from "../../Components/InspectorComponents/Detail/Detail";
import TextField from "../../Components/TextField/TextField";
import HelpBox from "../../Components/InspectorComponents/HelpBox/HelpBox";
import Toggle from "../../Components/InspectorComponents/Toggle/Toggle";
import toMainEvents from "../../IPCEvents/ipc-to-main-events";
import windowEvents from "../../WindowEvents/window-events";
import saveLocation from "../../Utilities/file-io/save-location";
import loadLocation from "../../Utilities/file-io/load-location";
import checkDirectoryForProjectFile from "../../Utilities/file-io/check-directory-for-project-file";
import fromMainEvents from "../../IPCEvents/ipc-from-main-events";
import pickDirectory from "../../Utilities/file-io/pick-directory";
import cloneProject from "../../Utilities/file-io/clone-project";

interface UITestPanelProps { }
const UITestPanel = () => {

  const [selectedDirPath, setSelectedDirPath] = useState<string | undefined>("");

  window.api.response(fromMainEvents.pickDirectoryReport, (args: any) => {
    if (args.data) {
      console.log(args.data);
      setSelectedDirPath(args.data);
    }
  })

  window.api.response(fromMainEvents.checkDirectoryForProjectReport, (args: any) => {
    console.log(args)
  })

  return (
    <Panel>
      {/* <Dropdown
        options={["Example01", "Example02", "Example03"]}
        defaultOption={"Example01"}
        onSelect={(o) => { console.log(o) }} /> */}

      <H1>H1 Title</H1>
      <H2>H2 Subtitle</H2>
      <H3>H3 Secondary Subtitle</H3>
      <InspectorButton
        buttonText="Click me"
        callback={() => { console.log("Button was clicked") }}
      />
      <InspectorButton
        label="Label"
        buttonText="Click me"
        callback={() => { console.log("Button was clicked") }}
      />

      <HDivider />

      <NumberField
        label="Example Slider"
        onChange={(o) => { }}
      />
      <NumberField
        label="Example Slider"
        min={-90}
        max={90}
        hasSlider={false}
        onChange={(o) => { }}
      />

      <Detail label="Detail 1" detail="Hello World" />
      <Detail label="Detail 2" detail="Hello World x2" />
      <Detail label="Detail 3" detail="Hello World but longer" />

      <TextField
        label="TextField"
        initialText="Example"
        onChange={(o) => { }}
      />

      <Toggle
        label="Toggle"
        initialState={true}
        callback={(o) => { console.log(`Toggle: ${o}`) }}
      />

      <HelpBox
        title="Helpbox"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed odio magna, imperdiet eu tincidunt ut, volutpat. "
      />

      <HDivider />
      <HDivider />

      <InspectorButton
        buttonText="Save Location to File System"
        callback={saveLocation}
      />

      <InspectorButton
        buttonText="Load Location from known filepath"
        callback={() => { loadLocation("D:/terrain-viewer/save-tests/location.project") }}
      />

      <InspectorButton
        buttonText="Load Location from dialog"
        callback={() => { loadLocation() }}
      />

      <InspectorButton
        buttonText="Pick directory"
        callback={() => {
          pickDirectory(fromMainEvents.pickDirectoryReport);
        }}
      />

      <Detail
        label="Selected Directory:"
        detail={`${selectedDirPath}`}
      />

      <InspectorButton
        buttonText="Check selected directory for project"
        callback={() => {
          if (selectedDirPath) {
            checkDirectoryForProjectFile(selectedDirPath, fromMainEvents.checkDirectoryForProjectReport);
          }
        }}
      />

      <InspectorButton
      buttonText="Clone project to selected directory"
        callback={()=> {
          if (selectedDirPath) {
            cloneProject({sourcePath: window.projectPath, destinationPath: selectedDirPath })
          }
        }}
      />
    </Panel>
  );
};

export default UITestPanel;