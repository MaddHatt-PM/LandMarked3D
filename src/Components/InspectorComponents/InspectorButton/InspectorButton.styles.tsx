import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  min-width: 100%;
  margin: 6px 0;
`;

export const Wrapper = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  font-size: small;
`;

export const Button = styled.button`
  color: white;
  background-color: #282323;
  flex: 1;
  max-width: 50%;
  border: 1px solid black;
  border-radius: 4px;
  padding: 2px;
  cursor: pointer;

  &.full-width {
    max-width: 100%;
  }

  &:hover {
    background-color: #302b2b;
  }

  &:active {
    background-color: #3f3939;
    border: 1px solid #777777;
  }
`;
