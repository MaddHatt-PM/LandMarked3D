import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  color: white;
  overflow: hidden;
`;

interface GridLinesProps {
  spacing: number;
  zoom: number;
  translateX: number;
  translateY: number;
}

export const GridLines = styled.div.attrs<GridLinesProps>(({ translateX, translateY, zoom, spacing }) => ({
  style: {
    backgroundPosition: `${translateX}px ${translateY}px`,
    backgroundSize: `${spacing * zoom}px ${spacing * zoom}px`
  }
}))<GridLinesProps>`
  position: absolute;
  background: linear-gradient(to right, #000000 1px, transparent 1px),
              linear-gradient(to bottom, #000000 1px, transparent 1px);
  opacity: 0.3;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
`;


export const EventCatcher = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface TransformableDivProps {
  zoom: number;
  translateX: number;
  translateY: number;
}

export const TransformableDiv = styled.div.attrs<TransformableDivProps>(({ translateX, translateY, zoom }) => ({
  style: {
    transform: `translate(${translateX || '0'}px, ${translateY || '0'}px) scale(${zoom || '1'})`,
  },
})) <TransformableDivProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;
  background-color: transparent;
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  flex-shrink: 0;
  flex-grow: 0;
`