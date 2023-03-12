import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 1em;
  bottom: 1em;
  flex: 0;

  min-height: 24px;
  min-width: 24px;

  border: 1px solid #00000044;
  border-radius: 4px;
  background-color: #2925251f;
  
  transition: border 0.3s ease;
  cursor: pointer;

  &:hover {
    border: 1px solid #0f0d11df;
    &:not(.enabled) {
      background-color: #25222266;
    }
  }
`;

export const Icon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export const EnabledContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: left;
  transition: opacity 0.5s ease-in-out;
  width: 0;
  height: 0;
  margin: 0 auto;

  color: #ffffff9d;

  &.enabled {
    width: 200px;
    height: 100px;
  }
`;