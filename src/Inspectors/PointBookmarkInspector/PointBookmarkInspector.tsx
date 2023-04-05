import React from "react";
import { MinusSVG, PlusSVG } from "../../Assets/SVGAssets";
import { ToolModes } from "../../Pages/LocationViewerPage/ToolModes";
import { PointBookmarkData } from "../../Types/PointBookmarkData";
import { getPointBookmarkInfo } from "../../Types/PointBookmarks/get-point-bookmark-info";
import showCreatePointBookmarkOverlay from "../../Types/PointBookmarks/show-create-point-bookmark-overlay";
import showRenameOverlay from "../../Types/PointGenericFunctions/show-rename-overlay";
import { setScreenOverlayEvent } from "../../WindowEvents/set-screen-overlay";
import { AcceptPrompts, DismissPrompts } from "../../Components/BaseOverlay/BaseOverlay";
import ConfirmationOverlay from "../../Components/ConfirmationOverlay/ConfirmationOverlay";
import Dropdown from "../../Components/InspectorComponents/Dropdown/Dropdown";
import { HDivider } from "../../Components/InspectorComponents/Headers/Headers.styles";
import HelpBox from "../../Components/InspectorComponents/HelpBox/HelpBox";
import InspectorButton from "../../Components/InspectorComponents/InspectorButton/InspectorButton";
import Toggle from "../../Components/InspectorComponents/Toggle/Toggle";
import Panel from "../../Components/Panel/Panel";
import { Divider } from "../../Components/StatusBar/StatusBar.styles";
import { Group, Wrapper } from "./PointBookmarkInspector.styles";

interface PointBookMarkInspectorProps {
  pointBookmarks: PointBookmarkData[];
  setPointBookmarkData: (id: number, modified: PointBookmarkData | undefined) => void;
  
  activePointBookmarkID: number | null
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
                onSelect={(newBookmark) => { props.setActivePointBookmarkID(newBookmark) }}
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
              <InspectorButton
                buttonText="Rename Bookmark"
                callback={() => {
                  showRenameOverlay({
                    modalName: "Rename Polygon",
                    labelText: "Polygon name",
                    originalName: props.pointBookmarks[props.activePointBookmarkID!].name,
                    finalizeRename: (newName: string) => {
                      const modified = { ...props.pointBookmarks[props.activePointBookmarkID!] }
                      modified.name = newName;
                      console.log(modified)
                      props.setPointBookmarkData(props.activePointBookmarkID!, modified)
                    }
                  })
                }}
              />

              <HDivider />
              {generateHelpbox()}

            </Group>
          </Wrapper>
        }

        {props.activePointBookmarkID === null &&
          <>
            <InspectorButton
              buttonText={"Create new Point Bookmark"}
              callback={() => {
                showCreatePointBookmarkOverlay({
                  setPointBookmark: props.setPointBookmarkData
                });
              }}
            />
          </>
        }
      </div>
    </Panel>
  );
};

export default PointBookMarkInspector;