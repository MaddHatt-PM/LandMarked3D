import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownButton = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  color: #444;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  z-index: 1;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const DropdownListItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;
