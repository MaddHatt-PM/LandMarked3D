import styled from "styled-components";
import { svgProps } from "../Utilities/svg-props";

import { ReactComponent as areaSVG } from "./toolbar-polygon.svg"
import { ReactComponent as gearSVG } from "./toolbar-gear.svg"
import { ReactComponent as exportSVG } from "./toolbar-export.svg"
import { ReactComponent as layersSVG } from "./toolbar-layers.svg"
import { ReactComponent as cloudDownloadSVG } from "./toolbar-cloud-download.svg"
import { ReactComponent as treeSVG } from "./toolbar-tree.svg"
import { ReactComponent as pathSVG } from "./toolbar-path.svg"
import { ReactComponent as groupSVG } from "./toolbar-group.svg"
import { ReactComponent as samplePointsSVG } from "./toolbar-sample-points.svg"

import { ReactComponent as questionMarkSVG } from "./icon-question.svg"
import { ReactComponent as copySVG } from "./icon-copy.svg"
import { ReactComponent as checkmarkCircleSVG } from "./icon-checkmark-circle.svg"
import { ReactComponent as selectSVG } from "./icon-select.svg"
import { ReactComponent as plusSVG } from "./icon-plus.svg"
import { ReactComponent as minusSVG } from "./icon-minus.svg"

interface svgDetails {
  height?: number;
  color?: string;
}

export const AreaSVG = styled(areaSVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;

export const GearSVG = styled(gearSVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;

export const ExportSVG = styled(exportSVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;

export const LayersSVG = styled(layersSVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;

export const TreeSVG = styled(treeSVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;
export const PathSVG = styled(pathSVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;

export const GroupSVG = styled(groupSVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;

export const CloudDownloadSVG = styled(cloudDownloadSVG) <svgDetails>`
  ${(props) => svgProps(props)}
  `;

export const QuestionMarkSVG = styled(questionMarkSVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;

export const SamplePointsSVG = styled(samplePointsSVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;

export const CopySVG = styled(copySVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;

export const CheckmarkCircleSVG = styled(checkmarkCircleSVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;

export const PlusSVG = styled(plusSVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;

export const MinusSVG = styled(minusSVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;

export const SelectSVG = styled(selectSVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;