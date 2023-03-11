import styled from "styled-components";

interface ContainerProps {
  width?: string,
  height?: string
}

export const Container = styled.button <ContainerProps>`
position: relative;
  width: ${(props) => (props.width ? props.width : "auto")};
  height: ${(props) => (props.height ? props.height : "auto")};
  aspect-ratio: 1.0;
  
  border: 0px solid white;
  border-radius: 8px;
  
  cursor: pointer;

  align-items: center;
  /* overflow: hidden; */
  text-overflow: clip;
  white-space: nowrap;
  
  background-color: rgba(255,255,255,0);
  transition: background-color 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:hover .tooltip {
    opacity: 1;
  }
`;

interface IconProps {
  fill?: string;
}

export const Icon = styled.img<IconProps>`
  width: 100%;
  height: auto;

  & path {
    fill: white;
    /* fill: ${({ color }) => color || "white"} */
  };
`;

export const Text = styled.span`
  color: white;
  
`;

export const Tooltip = styled.div`
  z-index: 10;
  position: absolute;
  top: 25%;
  right: 110%;
  
  border: 1px solid #7d7d7d92;
  border-radius: 2px;
  padding: 2px 6px 2px 4px;
  
  color: white;
  background-color: #151313;
  opacity: 0;
  transition: opacity 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);

  font-size: smaller;
  text-align: right;

  user-select: none;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 4px 0 4px 4px;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  &::before {
    border-color: transparent transparent transparent #7d7d7d92;
    transform: translate(33%, -50%);
  }

  &::after {
    border-color: transparent transparent transparent #151313;
  }
`;