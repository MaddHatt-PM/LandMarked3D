import styled from "styled-components";

interface ContainerProps {
  children: React.ReactNode;
}

export const VStack = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  
  width: 100%;
  height: 100%;

  & > :first-child {
    flex: 1;
  }
`;

interface ViewportProps {
  children: React.ReactNode;
}

export const HStack = styled.div<ViewportProps>`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-start;

  position: relative;
  width: 100%;
  height: 100%;

  & > :last-child {
    flex: 1;
  }
`;