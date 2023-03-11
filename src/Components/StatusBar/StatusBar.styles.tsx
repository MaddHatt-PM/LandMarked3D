import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex-direction: row;
  
  height: 24px;
  width: 100%;
  
  background-color: #7600cc;
  color: white;
`;

export const HStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding-left: 8px;
  padding-right: 8px;
`;

export const Text = styled.span`
  margin: 0 5px;

  font-size: small;
  font-weight: 400;
  user-select: none;
  opacity: 1;
`;

export const Divider = styled.span`
  display: inline-block;
  height: 10px;
  width: 1px;
  background-color: #ccc;
  margin: 0 6px;
  opacity: 0.8;
`;