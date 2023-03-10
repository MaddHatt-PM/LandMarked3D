import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  `;

export const Viewport = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: calc(100vh - 30px);
`;
