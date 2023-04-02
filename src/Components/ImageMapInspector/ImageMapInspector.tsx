import { useState } from "react";
import { ChevronDownSVG, ChevronUpSVG } from "../../Assets/SVGAssets";
import showRenameOverlay from "../../Types/PointGenericFunctions/show-rename-overlay";
import { H3, HDivider } from "../InspectorComponents/Headers/Headers.styles";
import HelpBox from "../InspectorComponents/HelpBox/HelpBox";
import InspectorButton from "../InspectorComponents/InspectorButton/InspectorButton";
import NumberField from "../InspectorComponents/NumberField/NumberField";
import Toggle from "../InspectorComponents/Toggle/Toggle";
import Panel from "../Panel/Panel";
import { SideButton } from "./ImageMapInspector.styles";

interface ImageMapInspectorProps {
  allImageMaps: ImageMapData[];
  setImageMapData: (id: number, modified: ImageMapData | undefined) => void;
  swapImageMapPosition: (indexA: number, indexB: number) => void;

  renderData: ViewportRenderData;
  setRenderData: (data: ViewportRenderData) => void;
}
const ImageMapInspector = (props: ImageMapInspectorProps) => {
  const handleRenderToggle = (enabled: boolean) => {
    props.setRenderData({ ...props.renderData, displayImageMaps: enabled });
  }

  const setVisibility = (imageData: ImageMapData, id: number, enabled: boolean) => {
    props.setImageMapData(id, { ...imageData, isViewable: enabled });
  }

  const setOpacity = (imageData: ImageMapData, id: number, value: number) => {
    props.setImageMapData(id, { ...imageData, opacity: value });
  }

  return (
    <Panel width="250px">
      <div style={{ height: "14px", margin: "-10px 0 2px" }}>
        <Toggle
          initialState={true}
          label={"Image Map Inspector"}
          callback={handleRenderToggle}
        />
      </div>

      <HDivider />
      <HelpBox text="Image order (Ascending)" />
      {props.allImageMaps.map((imageData, id) => (
        <div key={id}>
          <Toggle
            label={(
              <span style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                <SideButton
                  className="left"
                  onClick={() => { props.swapImageMapPosition(id, id - 1) }}
                  style={id === 0
                    ? { pointerEvents: "none", opacity: 0.5 }
                    : { pointerEvents: "all", opacity: 1.0 }
                  }>
                  <ChevronUpSVG width={8} height={10} />

                </SideButton>
                <SideButton
                  className="right"
                  onClick={() => { props.swapImageMapPosition(id, id + 1) }}
                  style={id === props.allImageMaps.length - 1
                    ? { pointerEvents: "none", opacity: 0.5 }
                    : { pointerEvents: "all", opacity: 1.0 }
                  }>
                  <ChevronDownSVG width={8} height={8} />
                </SideButton>
                <span style={{ paddingLeft: "8px" }}>{imageData.name}</span>
              </span>
            )}
            initialState={imageData.isViewable}
            callback={(enabled) => { setVisibility(imageData, id, enabled) }}
          />

          <div style={
            {
              opacity: imageData.isViewable ? 1.0 : 0.5,
              pointerEvents: imageData.isViewable ? 'all' : 'none',
              filter: `grayscale(${imageData.isViewable ? 0 : 1})`,
            }
          }>

            <NumberField
              label="Opacity"
              initialValue={imageData.opacity}
              min={0} trueMin={0}
              max={1} trueMax={1}
              step={0.01}
              hasSlider={true}
              onChange={(value) => { setOpacity(imageData, id, value) }}
            />

            <InspectorButton
              buttonText="Rename"
              callback={() => {
                showRenameOverlay({
                  modalName: "Rename Image",
                  labelText: "Image name:",
                  originalName: props.allImageMaps[id].name,
                  finalizeRename: (newName: string) => {
                    const modified = { ...props.allImageMaps[id] }
                    modified.name = newName;

                    props.setImageMapData(id, modified)
                  }
                })
              }}
            />

            <HelpBox
              title="Image Stats"
              text={"TODO"}
            />

            {id !== props.allImageMaps.length - 1 &&
              <HDivider />
            }
          </div>
        </div>
      ))}

    </Panel>
  );
};

export default ImageMapInspector;