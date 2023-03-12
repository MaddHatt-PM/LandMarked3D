import React from "react";
import Panel from "../Panel/Panel";
import InspectorButton from "../InspectorComponents/InspectorButton/InspectorButton";
import Dropdown from "../InspectorComponents/Dropdown/Dropdown";
import { H1, H2, H3, HDivider, Text } from "../InspectorComponents/Headers/Headers.styles";
import NumberField from "../InspectorComponents/NumberField/NumberField";
import Detail from "../InspectorComponents/Detail/Detail";
import TextField from "../TextField/TextField";
import HelpBox from "../InspectorComponents/HelpBox/HelpBox";
import Toggle from "../InspectorComponents/Toggle/Toggle";

interface UITestPanelProps { }
const UITestPanel = () => {

  return (
    <Panel children={(
      <>
        <Dropdown
          options={["Example01", "Example02", "Example03"]}
          defaultOption={"Example01"}
          onSelect={(o) => { console.log(o) }} />

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
      </>
    )} />
  );
};

export default UITestPanel;