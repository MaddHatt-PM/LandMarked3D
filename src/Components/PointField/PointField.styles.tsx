import styled from "styled-components";

interface SamplePointProps {
  index: number;
  x: number;
  y: number;
  radius: number;
}

export const SamplePoint = styled.svg.attrs<SamplePointProps>(({ x, y, radius }) => ({
  style: {
  top: `${y - (radius * 0.5)}`,
  left: `${x - (radius * 0.5)}`
  }
}))<SamplePointProps>`
  cursor: pointer;
  position: absolute;
  pointer-events: all;

  rect:hover + div {
    position: absolute;
    display: block;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  background-color: #1d1d1d;
  border-radius: 2px;
  align-items: center;

  transform: translate(-50%, -150%);

  &::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%) translateY(-5%);
  border-width: 4px 4px 0 4px;
  border-style: solid;
  border-color: #1d1d1d transparent transparent transparent;
  
}
`;
