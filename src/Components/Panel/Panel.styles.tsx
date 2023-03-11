import styled from "styled-components";

interface ContainerProps {
  width?: string;
  children: React.ReactNode;
}

export const Container = styled.div<ContainerProps>`
  width: ${(props) => props.width ?? "250px"};
  height: 100%;
  background-color: var(--title-background);
  border-left: 1px solid black;
  `;

export const Wrapper = styled.div`
  padding: 8px;
  color: white;
`;