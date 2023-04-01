import React from "react";
import { MinusSVG, PlusSVG } from "../../Assets/SVGAssets";
import { ToolModes } from "../../Pages/LocationViewerPage/ToolModes";
import { PointPathData } from "../../Types/PointPathData";
import { getPointPathInfo } from "../../Types/PointPathData/get-point-path-info";
import showCreatePointPathOverlay from "../../Types/PointPathData/show-create-point-path-overlay";
import showDeletePointPathOverlay from "../../Types/PointPathData/show-delete-point-path-overlay";
import Dropdown from "../InspectorComponents/Dropdown/Dropdown";
import { HDivider } from "../InspectorComponents/Headers/Headers.styles";
import HelpBox from "../InspectorComponents/HelpBox/HelpBox";
import InspectorButton from "../InspectorComponents/InspectorButton/InspectorButton";
import Toggle from "../InspectorComponents/Toggle/Toggle";
import Panel from "../Panel/Panel";
import { Divider } from "../StatusBar/StatusBar.styles";
import { Group, Wrapper } from "./PointPathInspector.styles";

interface PointPathInspectorProps {
  pointPaths: PointPathData[];
  setPointPathData: (id: number, modified: PointPathData | undefined) => void;

  activeToolMode: ToolModes;
  setActiveToolMode: (modeToSet: ToolModes) => void;

  renderData: ViewportRenderData;
  setRenderData: (data: ViewportRenderData) => void;

  activePointPathID: number | null
  setActivePointPathID: (id: number) => void;
}
const PointPathInspector = (props: PointPathInspectorProps) => {

  const handleRenderToggle = () => {

  }

  const generateHelpbox = () => {
    if (props.activePointPathID === undefined) {
      return (<></>)
    }

    if (props.pointPaths[props.activePointPathID!] === undefined) {
      return (<></>)
    }

    if (props.pointPaths[props.activePointPathID!].points.length === 0) {
      return (
        <HelpBox
          title={`${props.pointPaths[props.activePointPathID!].name} has no data points`}
          text={`Click in the viewport to add a point.`}
        />
      )
    } else {
      return (
        <HelpBox
          title={`${props.pointPaths[props.activePointPathID!].name} Info`}
          text={getPointPathInfo(props.pointPaths[props.activePointPathID!])}
          includeCopySymbol={true}
        />
      )
    }
  }

  return (
    <Panel width="300px">
      <div style={{ height: "14px", margin: "-10px 0 2px" }} >
        <Toggle
          initialState={true}
          label={"Point Path Inspector"}
          callback={handleRenderToggle}
        />

      </div>
      <HDivider />
      <div style={props.renderData.displayPointPolygons
        ? { pointerEvents: "all", opacity: 1.0 }
        : { pointerEvents: "none", opacity: 0.5 }
      }>

        {props.activePointPathID !== null &&
          <Wrapper>
            <Group>
              <Dropdown
                selectedID={props.activePointPathID}
                options={props.pointPaths}
                optionToName={(item: PointPathData, id: number) => {
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
                onSelect={(newPointPath) => { props.setActivePointPathID(newPointPath) }}
                leadingButtons={[
                  // {
                  //   icon: (<SelectSVG width={12} height={12} />), text: "Select area from viewport", callback: () => {
                  //     console.log("TODO")
                  //   }
                  // }
                ]}
                trailingButtons={[
                  {
                    icon: (<MinusSVG width={10} height={10} />), text: "Create new area", callback: () => {
                      showDeletePointPathOverlay({
                        activePointPath: props.pointPaths[props.activePointPathID!],
                        activePointPathID: props.activePointPathID!,
                        setPointPath: props.setPointPathData
                      });
                    }
                  },

                  {
                    icon: (<PlusSVG width={10} height={10} />), text: "Create new area", callback: () => {
                      showCreatePointPathOverlay({
                        setPointPolygon: props.setPointPathData
                      });
                    }
                  },
                ]}
              />

            </Group>
          </Wrapper>
        }

        {props.activePointPathID === null &&
          <>
            <InspectorButton
              buttonText={"Create new Point Polygon"}
              callback={() => {
                // showCreatePointPolygonOverlay({ setPointPolygon: props.setPointPolygonData })
              }}
            />
            <HelpBox
              text={"Create a new area to get started"}
            />
          </>
        }
      </div>
    </Panel>
  );
};

export default PointPathInspector;