import React from "react";
import { MinusSVG, PlusSVG } from "../../Assets/SVGAssets";
import { PointFieldData } from "../../Types/PointFieldData";
import Dropdown from "../InspectorComponents/Dropdown/Dropdown";
import { HDivider } from "../InspectorComponents/Headers/Headers.styles";
import Toggle from "../InspectorComponents/Toggle/Toggle";
import Panel from "../Panel/Panel";
import { Divider } from "../StatusBar/StatusBar.styles";
import { Container, Group, Wrapper } from "./PointFieldInspector.styles";

interface SamplePointInspectorProps {
  pointFields: PointFieldData[];
  setPointFieldData: (id: number, modified: PointFieldData | undefined) => void;

  activePointFieldID: number | null;
  setActivePointFieldID: (id: number) => void;

  renderData: ViewportRenderData;
  setRenderData: (data: ViewportRenderData) => void;
}

const SamplePointInspector = (props: SamplePointInspectorProps) => {

  const handleRenderToggle = (isChecked: boolean) => {
    props.setRenderData({ ...props.renderData, displayPointFields: isChecked });
  }

  return (
    <Panel width="250px">
      <div style={{ height: "14px", margin: "-10px 0 2px" }}>
        <Toggle
          initialState={true}
          label={"Point Field Inspector"}
          callback={handleRenderToggle}
        />
      </div>

      {props.activePointFieldID !== null &&
        <Wrapper>
          <Group>
            <Dropdown
              selectedID={props.activePointFieldID}
              options={props.pointFields}
              optionToName={(item: PointFieldData, id: number) => {
                return (
                  <span>
                    <svg width={"16px"} height={"10px"}>
                      <circle
                        cx={6}
                        cy={6}
                        r={3}
                        fill={item.color}
                      />
                    </svg>
                    {id}  <Divider style={{ margin: "0 4px", opacity: 0.3 }} />  {item.name}
                  </span>)
              }}
              onSelect={(newPointPath) => { props.setActivePointFieldID(newPointPath) }}
              leadingButtons={[]}
              trailingButtons={[]}
            />
          </Group>
        </Wrapper>
      }

      <HDivider />

    </Panel>
  );
};

export default SamplePointInspector;