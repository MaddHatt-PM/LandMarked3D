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

export const Input = styled.input`
  color: #ffffffa0;
  background-color: #282323;
  flex: 1;
  text-align: right;
  max-width: 50%;
  border: 1px solid black;
  border-radius: 4px;
  padding: 4px;
  outline: none;

  &.full-width {
    max-width: 100%;
  }

  &:hover {
    background-color: #302b2b;
  }

  &:active {
    background-color: #3f3939;
  }
`;