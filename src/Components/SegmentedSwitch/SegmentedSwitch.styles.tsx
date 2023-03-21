import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: #282323;
  /* margin: 10px; */
  border: 1px solid #000000;
  border-radius: 4px;
  overflow: hidden;
`;

export const ButtonToggle = styled.button<{ selected: boolean }>`
  padding: 6px;
  background-color: ${(props) => (props.selected ? '#860cdd' : 'transparent')};
  color: ${(props) => (props.selected ? '#fff' : '#ffffff5e')};
  border: none;
  border-radius: 0;
  border-right: 1px solid #000000;
  flex: 1;
  cursor:  ${(props) => (props.selected ? 'default' : 'pointer')};

  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: ${(props) => (props.selected ? '#860cdd' : '#302b2b')};
  }

  &:active {
    background-color: #3f3939;
  }
`;