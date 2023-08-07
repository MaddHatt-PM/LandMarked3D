import styled from "styled-components";
import { svgColoredProps, svgProps } from "../Utilities/svg-props";

import { ReactComponent as logoSVG } from "./logo.svg"

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
import { ReactComponent as chevronUpSVG } from "./icon-chevron-up.svg"
import { ReactComponent as chevronDownSVG } from "./icon-chevron-down.svg"

interface svgDetails {
  height?: number;
  color?: string;
}

export const LogoSVG = styled(logoSVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;

export const AreaSVG = styled(areaSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;

export const GearSVG = styled(gearSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;

export const ExportSVG = styled(exportSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;

export const LayersSVG = styled(layersSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;

export const TreeSVG = styled(treeSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;
export const PathSVG = styled(pathSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;

export const GroupSVG = styled(groupSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;

export const CloudDownloadSVG = styled(cloudDownloadSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
  `;

export const QuestionMarkSVG = styled(questionMarkSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;

export const SamplePointsSVG = styled(samplePointsSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;

export const CopySVG = styled(copySVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;

export const CheckmarkCircleSVG = styled(checkmarkCircleSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;

export const PlusSVG = styled(plusSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;

export const MinusSVG = styled(minusSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;

export const SelectSVG = styled(selectSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;

export const ChevronUpSVG = styled(chevronUpSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;

export const ChevronDownSVG = styled(chevronDownSVG) <svgDetails>`
  ${(props) => svgColoredProps(props)}
`;