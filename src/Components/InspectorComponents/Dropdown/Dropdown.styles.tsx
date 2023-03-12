import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  min-width: 100%;
  margin: 6px 0;
`;

export const DropdownButton = styled.button`
  border: 1px solid black;
  /* border; */
  min-width: 100%;
  color: white;
  text-align: left;
  padding: 6px;
  cursor: pointer;
  font-size: smaller;
  background-color: #282323;

  &:hover {
    background-color: #302b2b;
  }

  border-radius: 4px;
  &.is-open {
    border-radius: 4px 4px 0 0;
    border-bottom: none;
    background-color: #302b2b;
    
    &:hover {
      background-color: #3f3939;
  }
  }
`;

export const ChevronIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%) rotate(135deg);
  width: 0.3em;
  height: 0.3em;
  border-top: 0.15em solid currentColor;
  border-right: 0.15em solid currentColor;
  opacity: 0.5;
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 99%;
  background-color: #242020;
  border: 1px solid black;
  z-index: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 0 0 4px 4px;
`;

export const DropdownListItem = styled.li`
  padding: 6px;
  font-size: smaller;
  cursor: pointer;
  color: #ffffff72;

  border-bottom: 1px solid black;
  
  &:hover {
    background-color: #302b2b;;
  }
  
  &:last-child {
    border: none;
  }
`;
