import React from "react";
import { PointPolygonData } from "../../Types/PointPolygonData";
import Dropdown from "../InspectorComponents/Dropdown/Dropdown";
import { H1, H3, HDivider } from "../InspectorComponents/Headers/Headers.styles";
import { HStack } from "../InspectorComponents/HStack/HStack";
import InspectorButton from "../InspectorComponents/InspectorButton/InspectorButton";
import Panel from "../Panel/Panel";
import { Container } from "./AreaEditor.styles";

interface AreaEditorProps {
  pointPolygons: PointPolygonData[];
  addPointPolygonData: (toAdd: PointPolygonData) => void;
  setPointPolygonData: (id: number, modified: PointPolygonData) => void;
  removePointPolygonData: (id: number) => void;

  renderData: ViewportRenderData;
  setRenderData: (data: ViewportRenderData) => void;

  activePointPolygonID: number | null
  setActivePointPolygonID: (id: number) => void;
}

const AreaEditor = (props: AreaEditorProps) => {

  return (
    <Panel>
      <H1>Area Editor</H1>
      <HDivider />

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
        onSelect={(id) => { props.setActivePointPolygonID(id) }}
      />

    </Panel>
  );
};

export default AreaEditor;