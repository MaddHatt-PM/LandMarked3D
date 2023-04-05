import React from "react";
import { MinusSVG, PlusSVG } from "../../Assets/SVGAssets";
import { ToolModes } from "../../Pages/LocationViewerPage/ToolModes";
import showRenameOverlay from "../../Types/PointGenericFunctions/show-rename-overlay";
import { PointPathData } from "../../Types/PointPathData";
import { getPointPathInfo } from "../../Types/PointPathData/get-point-path-info";
import showCreatePointPathOverlay from "../../Types/PointPathData/show-create-point-path-overlay";
import showDeletePointPathOverlay from "../../Types/PointPathData/show-delete-point-path-overlay";
import Dropdown from "../../Components/InspectorComponents/Dropdown/Dropdown";
import { HDivider } from "../../Components/InspectorComponents/Headers/Headers.styles";
import HelpBox from "../../Components/InspectorComponents/HelpBox/HelpBox";
import InspectorButton from "../../Components/InspectorComponents/InspectorButton/InspectorButton";
import Toggle from "../../Components/InspectorComponents/Toggle/Toggle";
import Panel from "../../Components/Panel/Panel";
import { Divider } from "../../Components/StatusBar/StatusBar.styles";
import { Group, Wrapper } from "./PointPathInspector.styles";

interface PointPathInspectorProps {
  pointPaths: PointPathData[];
  activePointPathID: number | null
  setPointPathData: (id: number, modified: PointPathData | undefined) => void;
  setActivePointPathID: (id: number) => void;

  activeToolMode: ToolModes;
  setActiveToolMode: (modeToSet: ToolModes) => void;

  renderData: ViewportRenderData;
  setRenderData: (data: ViewportRenderData) => void;
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

              <HDivider/>
              
              <InspectorButton
                buttonText="Rename Polygon"
                callback={() => {
                  showRenameOverlay({
                    modalName: "Rename Polygon",
                    labelText: "Polygon name",
                    originalName: props.pointPaths[props.activePointPathID!].name,
                    finalizeRename: (newName: string) => {
                      const newPolygon = { ...props.pointPaths[props.activePointPathID!] }
                      newPolygon.name = newName;

                      props.setPointPathData(props.activePointPathID!, newPolygon)
                    }
                  })
                }}
              />

            </Group>
          </Wrapper>
        }

        {props.activePointPathID === null &&
          <>
            <InspectorButton
              buttonText={"Create new Point Path"}
              callback={() => {
                showCreatePointPathOverlay({
                  setPointPolygon: props.setPointPathData
                });
              }}
            />
          </>
        }
      </div>
    </Panel>
  );
};

export default PointPathInspector;