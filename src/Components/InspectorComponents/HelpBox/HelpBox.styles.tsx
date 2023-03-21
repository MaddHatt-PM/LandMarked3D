import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  min-width: 100%;
  margin: 4px 0;
`;

export const Wrapper = styled.div`
  border: 1px solid black;
  background-color: #0000002b;
  padding: 8px;
  border-radius: 8px;
`;

export const TitleWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  /* align-items: center; */
  flex-direction: row;
  gap: 8px;
  font-size: small;
  margin: 2px 0 -4px 0;
`;


export const Title = styled.span`
  color: #ffffffdf;
  margin-top: 0px;
  margin-bottom: 8px;
`;

export const Text = styled.p`
  font-size: small;
  color: #ffffff6b;
  margin: 0;
`;

export const CopyButton = styled.button`
  height: 24px;
  width: 24px;
  margin: -4px -2px;
  padding: 2px;
  background-color: transparent;
  pointer-events: all;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  opacity: 0.4;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #0000006b;
    border: 1px solid black;
    opacity: 1.0;
  }
  /* position: absolute; */
`;

export const Divider = styled.div`
  width: calc(100% + 16px);
  height: 1px;
  border: none;
  border-bottom: 1px solid #000000;
  margin: 4px -8px;
`;