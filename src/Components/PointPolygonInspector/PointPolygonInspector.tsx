import { ToolModeDetails, ToolModes } from "../../Pages/LocationViewerPage/ToolModes";
import { PointPolygonData } from "../../Types/PointPolygonData";
import { getPointPolygonInfo } from "../../Types/PointPolygonData/get-point-polygon-info";
import Dropdown from "../InspectorComponents/Dropdown/Dropdown";
import { HDivider } from "../InspectorComponents/Headers/Headers.styles";
import HelpBox from "../InspectorComponents/HelpBox/HelpBox";
import InspectorButton from "../InspectorComponents/InspectorButton/InspectorButton";
import Panel from "../Panel/Panel";
import SegmentedSwitch from "../SegmentedSwitch/SegmentedSwitch";
import { Group, Wrapper } from "./PointPolygonInspector.styles";
import Toggle from "../InspectorComponents/Toggle/Toggle";
import showResetPointPolygonOverlay from "../../Types/PointPolygonData/show-reset-point-polygon-overlay";
import showDeletePointPolygonOverlay from "../../Types/PointPolygonData/show-delete-point-polygon-overlay";
import showCreatePointPolygonOverlay from "../../Types/PointPolygonData/show-create-point-polygon-overlay";
import { MinusSVG, PlusSVG } from "../../Assets/SVGAssets";
import { Divider } from "../StatusBar/StatusBar.styles";
import showRenameOverlay from "../../Types/PointGenericFunctions/show-rename-overlay";

interface PointPolygonInspectorProps {
  pointPolygons: PointPolygonData[];
  setPointPolygonData: (id: number, modified: PointPolygonData | undefined) => void;

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

    props.setActiveToolMode(newTool);
  }

  const handleRenderToggle = (isChecked: boolean) => {
    props.setRenderData({ ...props.renderData, displayPointPolygons: isChecked });
  }

  const generateHelpbox = () => {
    if (props.activePointPolygonID === undefined) {
      return (<></>)
    }

    if (props.pointPolygons[props.activePointPolygonID!] === undefined) {
      return (<></>)
    }

    if (props.pointPolygons[props.activePointPolygonID!].points.length === 0) {
      return (
        <HelpBox
          title={`${props.pointPolygons[props.activePointPolygonID!].name} has no data points`}
          text={`Click in the viewport to add a point.`}
        />
      )
    } else {
      return (
        <HelpBox
          title={`${props.pointPolygons[props.activePointPolygonID!].name} Info`}
          text={getPointPolygonInfo(props.pointPolygons[props.activePointPolygonID!])}
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
          label={"Point Polygon Inspector"}
          callback={handleRenderToggle}
        />
      </div>

      <HDivider />
      <div style={props.renderData.displayPointPolygons
        ? { pointerEvents: "all", opacity: 1.0 }
        : { pointerEvents: "none", opacity: 0.5 }
      }>
        {props.activePointPolygonID !== null &&
          <Wrapper>
            <Group>
              <Dropdown
                selectedID={props.activePointPolygonID}
                options={props.pointPolygons}
                optionToName={(item: PointPolygonData, id: number) => {
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
                onSelect={(newAreaID) => { props.setActivePointPolygonID(newAreaID) }}
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
                      showDeletePointPolygonOverlay({
                        activePointPolygon: props.pointPolygons[props.activePointPolygonID!],
                        activePointPolygonID: props.activePointPolygonID!,
                        setPointPolygon: props.setPointPolygonData
                      })
                    }
                  },

                  {
                    icon: (<PlusSVG width={10} height={10} />), text: "Create new area", callback: () => {
                      showCreatePointPolygonOverlay({
                        setPointPolygon: props.setPointPolygonData,
                      })
                    }
                  },
                ]}
              />

              <HDivider />
              <SegmentedSwitch
                selectedOption={props.activeToolMode}
                options={availableTools}
                optionToDisplay={(o) => { return ToolModeDetails[o as ToolModes].displayNode }}
                onSelect={(o) => { handleToolModeChange(o as ToolModes) }}
              />

              <HDivider />

              {generateHelpbox()}

            </Group>

            <Group>
              <HDivider />

              <InspectorButton
                buttonText="Rename Polygon"
                callback={() => {
                  showRenameOverlay({
                    modalName: "Rename Polygon",
                    labelText: "Polygon name",
                    originalName: props.pointPolygons[props.activePointPolygonID!].name,
                    finalizeRename: (newName: string) => {
                      const newPolygon = { ...props.pointPolygons[props.activePointPolygonID!] }
                      newPolygon.name = newName;
                      
                      props.setPointPolygonData(props.activePointPolygonID!, newPolygon)
                    }
                  })
                }}
              />

              <InspectorButton
                buttonText="Reset Points"
                callback={() => {
                  showResetPointPolygonOverlay({
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
            <InspectorButton
              buttonText={"Create new Point Polygon"}
              callback={() => {
                showCreatePointPolygonOverlay({ setPointPolygon: props.setPointPolygonData })
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

export default PointPolygonInspector;