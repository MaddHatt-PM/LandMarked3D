import styled from "styled-components";

export const Container = styled.div`
  /* position: relative; */
  background-color: var(--title-background);
  width: 64px;
  height: 100%;
  padding: 0 8px;
  border-left: 1px solid black;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;