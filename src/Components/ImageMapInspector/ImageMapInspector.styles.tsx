import styled from "styled-components";

export const Container = styled.div`

`;

export const SideButton = styled.button`
  color: white;
  background-color: #282323;
  flex: 0;
  flex-grow: 0;
  flex-shrink: 0;
  
  width: 22px;
  min-width: 22px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 3px;
  cursor: pointer;
  
  &.left {
    border-radius: 4px 0 0 4px;
  }
  
  &.right{
    border-radius: 0 4px 4px 0;
border-left: none;
  }

  &:hover {
    background-color: #302b2b;
  }

  &:active {
    background-color: #3f3939;
    border: 1px solid #777777;
  }
`;

export const ChevronIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%) rotate(135deg);
  width: 0.3em;
  height: 0.3em;
  border-top: 0.15em solid currentColor;
  border-right: 0.15em solid currentColor;
  opacity: 0.5;
`;