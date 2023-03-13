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
    /* flex: 1; */
    /* flex-shrink: 0; */
  }

  & > :last-child {
    position: absolute;
    bottom: 0;
    flex: 1;
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% - 24px);
  bottom: 24px;
`;


export const HStack = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-start;

  position: absolute;
  width: 100%;
  height: 100%;

  &:last-child {
    flex: 1;
  }
`;