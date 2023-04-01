import React from "react";
import { MinusSVG, PlusSVG } from "../../Assets/SVGAssets";
import { ToolModes } from "../../Pages/LocationViewerPage/ToolModes";
import { PointBookmarkData } from "../../Types/PointBookmarkData";
import { getPointBookmarkInfo } from "../../Types/PointBookmarks/get-point-bookmark-info";
import showCreatePointBookmarkOverlay from "../../Types/PointBookmarks/show-create-point-bookmark-overlay";
import { setScreenOverlayEvent } from "../../WindowEvents/set-screen-overlay";
import { AcceptPrompts, DismissPrompts } from "../BaseOverlay/BaseOverlay";
import ConfirmationOverlay from "../ConfirmationOverlay/ConfirmationOverlay";
import Dropdown from "../InspectorComponents/Dropdown/Dropdown";
import { HDivider } from "../InspectorComponents/Headers/Headers.styles";
import HelpBox from "../InspectorComponents/HelpBox/HelpBox";
import InspectorButton from "../InspectorComponents/InspectorButton/InspectorButton";
import Toggle from "../InspectorComponents/Toggle/Toggle";
import Panel from "../Panel/Panel";
import { Divider } from "../StatusBar/StatusBar.styles";
import { Container, Group, Wrapper } from "./PointBookmarkInspector.styles";

interface PointBookMarkInspectorProps {
  pointBookmarks: PointBookmarkData[];
  activePointBookmarkID: number | null
  setPointBookmarkData: (id: number, modified: PointBookmarkData | undefined) => void;
  setActivePointBookmarkID: (id: number) => void;

  activeToolMode: ToolModes;
  setActiveToolMode: (modeToSet: ToolModes) => void;

  renderData: ViewportRenderData;
  setRenderData: (data: ViewportRenderData) => void;

}

const PointBookMarkInspector = (props: PointBookMarkInspectorProps) => {

  const generateHelpbox = () => {
    if (props.activePointBookmarkID === undefined) {
      return (<></>)
    }

    if (props.pointBookmarks[props.activePointBookmarkID!] === undefined) {
      return (<></>)
    }

    const point = props.pointBookmarks[props.activePointBookmarkID!].point; 

    if (point.x < -1000 || point.y < -1000) {
      return (
        <HelpBox
          text={`Click in the viewport to add a point.`}
        />
      )
    } else {
      return (
        <HelpBox
          title={`${props.pointBookmarks[props.activePointBookmarkID!].name} Info`}
          text={getPointBookmarkInfo(props.pointBookmarks[props.activePointBookmarkID!])}
          includeCopySymbol={true}
        />
      )
    }
  }

  const handleRenderToggle = () => {

  }

  return (
    <Panel width="300px">
      <div style={{ height: "14px", margin: "-10px 0 2px" }} >
        <Toggle
          initialState={true}
          label={"Point Bookmark Inspector"}
          callback={handleRenderToggle}
        />

      </div>
      <HDivider />
      <div style={props.renderData.displayPointPolygons
        ? { pointerEvents: "all", opacity: 1.0 }
        : { pointerEvents: "none", opacity: 0.5 }
      }>

        {props.activePointBookmarkID !== null &&
          <Wrapper>
            <Group>
              <Dropdown
                selectedID={props.activePointBookmarkID}
                options={props.pointBookmarks}
                optionToName={(item: PointBookmarkData, id: number) => {
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
                onSelect={(newPointPath) => { props.setActivePointBookmarkID(newPointPath) }}
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
                      setScreenOverlayEvent({
                        overlay: (<ConfirmationOverlay
                          modalName="Delete Point Bookmark"
                          acceptPrompt={AcceptPrompts.Confirm}
                          dismissPrompt={DismissPrompts.Cancel}
                          description={`Are you sure you want to delete ${props.pointBookmarks[props.activePointBookmarkID!].name}?`}
                          acceptCallback={() => {
                            props.setPointBookmarkData(props.activePointBookmarkID!, undefined);
                          }}
                        />)
                      })
                    }
                  },

                  {
                    icon: (<PlusSVG width={10} height={10} />), text: "Create new area", callback: () => {
                      showCreatePointBookmarkOverlay({
                        setPointBookmark: props.setPointBookmarkData
                      });
                    }
                  },
                ]}
              />

              <HDivider />

              {generateHelpbox()}

            </Group>
          </Wrapper>
        }

        {props.activePointBookmarkID === null &&
          <>
            <InspectorButton
              buttonText={"Create new Point Path"}
              callback={() => {
                showCreatePointBookmarkOverlay({
                  setPointBookmark: props.setPointBookmarkData
                });
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

export default PointBookMarkInspector;