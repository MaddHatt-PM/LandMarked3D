import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const fadeInKeyframes = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const scaleInChild = keyframes`
  0% { 
    transform: scale(0.8);
    pointer-events: none;
  }
  
  100% {
    transform: scale(1.0);
    pointer-events: all;
  }
`

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: ${fadeInKeyframes} 0.15s ease-out;

  & > :first-child{
    animation: ${scaleInChild} 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
`;