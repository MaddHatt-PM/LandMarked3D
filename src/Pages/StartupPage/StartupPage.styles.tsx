import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  color: white;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  background-color: #282b30;
  border: 1px solid black;
  border-radius: 2px 40px 2px 2px;
  width: 650px;
  height: 450px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const HStack = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 4px;
`;

export const SubPanel = styled.div`
  height: 100%;
  width: 100%;
  padding: 0;
  /* background-color: red; */
`;

export const BottomBar = styled.div`
  width: 100%;
  height: 24px;
  font-size: small;

  display: flex;
  /* align-items: flex-end; */
  justify-content: space-between;
  
  /* background-color: red; */
`;


export const RecentHeader = styled.p`
  line-height: 0;
  margin: 0.75em;
  margin-left: 0;
`;

export const RecentButton = styled.button`
  color: white;
  background-color: transparent;
  flex: 1;
  border: 1px solid black;
  border-color: transparent;
  width: 100%;
  text-align: left;
  border-radius: 4px;
  padding: 3px;

  cursor: pointer;

  &.full-width {
    max-width: 100%;
  }

  &:hover {
    background-color: #302b2b40;
    border-color: #000000;
  }

  &:active {
    background-color: #3f3939;
    border: 1px solid #777777;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  border: none;
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px #ffffff16;
  margin: 4px -4px;
`;

export const TextButton = styled.button`
  background: transparent;
  color: white;
  border: 0;
  cursor: pointer;
  margin: 0 4px;
  opacity: 0.6;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 1.0;
  }
`;