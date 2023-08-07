import styled, { css } from "styled-components";

interface svgPropProps {
  height?: number;
  color?: string;
}

export const svgColoredProps = (props: svgPropProps) => {
  return css`
    
    height: ${props.height|| "32px"};
    
    & path {
      fill: ${props.color || "white"}
    };

    & rect {
      fill: ${props.color || "white"}
    };
  
    & polygon {
      fill: ${props.color || "white"}
    };
  `;
};

interface svgPlainPropProps {
  height?: number;
}

export const svgProps = (props: svgPropProps) => {
  return css`
    height: ${props.height || "32px"};
  `;
};