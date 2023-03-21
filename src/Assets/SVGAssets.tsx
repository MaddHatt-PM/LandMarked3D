import styled from "styled-components";
import { svgProps } from "../Utilities/svg-props";

import { ReactComponent as areaSVG } from "../Assets/toolbar-polygon.svg"
import { ReactComponent as gearSVG } from "../Assets/toolbar-gear.svg"
import { ReactComponent as exportSVG } from "../Assets/toolbar-export.svg"
import { ReactComponent as layersSVG } from "../Assets/toolbar-layers.svg"
import { ReactComponent as cloudDownloadSVG } from "../Assets/toolbar-cloud-download.svg"
import { ReactComponent as treeSVG } from "../Assets/toolbar-tree.svg"

import { ReactComponent as questionMarkSVG } from "../Assets/icon-question.svg"
import { ReactComponent as copySVG } from "../Assets/icon-copy.svg"
import { ReactComponent as checkmarkCircleSVG } from "../Assets/icon-checkmark-circle.svg"

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

export const CloudDownloadSVG = styled(cloudDownloadSVG) <svgDetails>`
  ${(props) => svgProps(props)}
  `;

export const QuestionMarkSVG = styled(questionMarkSVG)<svgDetails>`
  ${(props) => svgProps(props)}
`;

export const CopySVG = styled(copySVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;

export const CheckmarkCircleSVG = styled(checkmarkCircleSVG) <svgDetails>`
  ${(props) => svgProps(props)}
`;