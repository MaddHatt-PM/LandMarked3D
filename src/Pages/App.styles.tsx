import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

export const Viewport = styled.div`
  display: block;
  width: 100%;
  
  border-left: 1px solid var(--section-divider);
  border-top: 1px solid var(--section-divider);
`;
