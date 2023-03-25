import React, { useEffect, useState } from "react";
import { ToolModeDetails, ToolModes } from "../../Pages/LocationViewerPage/ToolModes";
import { PointPolygonData } from "../../Types/PointPolygonData";
import { getPointPolygonInfo } from "../../Types/PointPolygonData/get-point-polygon-info";
import Dropdown from "../InspectorComponents/Dropdown/Dropdown";
import { H1, H3, HDivider } from "../InspectorComponents/Headers/Headers.styles";
import HelpBox from "../InspectorComponents/HelpBox/HelpBox";
import { HStack } from "../InspectorComponents/HStack/HStack";
import InspectorButton from "../InspectorComponents/InspectorButton/InspectorButton";
import clearAllPoints from "../../Types/PointPolygonData/ToolInteractions/clear-all-points";
import Panel from "../Panel/Panel";
import PointPolygon from "../PointPolygon/PointPolygon";
import SegmentedSwitch from "../SegmentedSwitch/SegmentedSwitch";
import { Container, Group, Wrapper } from "./PointPolygonInspector.styles";
import Toggle from "../InspectorComponents/Toggle/Toggle";

interface PointPolygonInspectorProps {
  pointPolygons: PointPolygonData[];
  addPointPolygonData: (toAdd: PointPolygonData) => void;
  setPointPolygonData: (id: number, modified: PointPolygonData) => void;
  removePointPolygonData: (id: number) => void;

  activeToolMode: ToolModes;
  setActiveToolMode: (modeToSet: ToolModes) => void;

  renderData: ViewportRenderData;
  setRenderData: (data: ViewportRenderData) => void;

  activePointPolygonID: number | null
  setActivePointPolygonID: (id: number) => void;
}

const PointPolygonInspector = (props: PointPolygonInspectorProps) => {

  const availableTools: ToolModes[] = [
    ToolModes.PointPolygonAppend,
    ToolModes.PointPolygonInsert,
    ToolModes.PointPolygonTransform,
  ]

  const handleToolModeChange = (newTool: ToolModes) => {
    const lastLineAsSolid = newTool !== ToolModes.PointPolygonAppend;

    props.setRenderData({ ...props.renderData, lastLineAsSolid: lastLineAsSolid });
    props.setActiveToolMode(newTool);
  }
  
  const handleRenderPointPolygonsToggle = (isChecked: boolean) => {
    props.setRenderData({...props.renderData, displayPointPolygons: isChecked});
  }


  return (
    <Panel>
      <div
        style={{ height: "14px", margin: "-10px 0 2px" }}
      >

        <Toggle
          initialState={true}
          label={"Point Polygon Inspector"}
          callback={handleRenderPointPolygonsToggle}
        />
      </div>

      <HDivider />
      <div style={props.renderData.displayPointPolygons
        ? { pointerEvents: "all", opacity: 1.0}
        : { pointerEvents: "none", opacity: 0.5 }
      }>

        {props.activePointPolygonID !== null &&
          <Wrapper>
            <Group>
              <Dropdown
                selectedID={props.activePointPolygonID}
                options={props.pointPolygons}
                optionToName={(item: PointPolygonData) => {
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
                      {item.name}
                    </span>)
                }}
                onSelect={(newAreaID) => { props.setActivePointPolygonID(newAreaID) }}
              />

              <HDivider />
              <SegmentedSwitch
                selectedOption={props.activeToolMode}
                options={availableTools}
                optionToDisplay={(o) => { return ToolModeDetails[o as ToolModes].displayNode }}
                onSelect={(o) => { handleToolModeChange(o as ToolModes) }}
              />

              <HDivider />

              <HelpBox
                title={`${props.pointPolygons[props.activePointPolygonID].name} Info`}
                text={getPointPolygonInfo(props.pointPolygons[props.activePointPolygonID])}
                includeCopySymbol={true}
              />
            </Group>

            <Group />

            <Group>

              <HDivider />

              <InspectorButton
                buttonText="Reset Points"
                callback={() => {
                  clearAllPoints({
                    activePointPolygonID: props.activePointPolygonID!,
                    activePointPolygon: props.pointPolygons[props.activePointPolygonID!],
                    setPointPolygon: props.setPointPolygonData
                  })
                }}
              />
            </Group>
          </Wrapper>
        }

        {props.activePointPolygonID === null &&
          <>
            <HelpBox
              text={"Create a new area to get started"}
            />
          </>
        }
      </div>

    </Panel>
  );
};

export default PointPolygonInspector;