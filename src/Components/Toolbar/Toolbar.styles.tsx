import styled from "styled-components";

export const Container = styled.div`
  /* position: relative; */
  background-color: #33363a;
  width: 38px;
  height: 100%;
  padding: 0 6px;
  border-left: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2px;
  padding: 6px
`;