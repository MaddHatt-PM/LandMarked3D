import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  /* min-width: 100%; */
  margin: 0;
  gap: 4px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  -webkit-app-region: no-drag;

  &.is-open {
    margin-bottom: 1px;
  }
`;

interface ButtonTextProps {
  isPlaceholderEnabled: boolean;
}

export const DropdownButtonText = styled.span<ButtonTextProps>`
  opacity: ${(props) => (props.isPlaceholderEnabled ? 0.5 : 1.0)};
`;

export const DropdownButton = styled.button`
  border: 0 solid black;
  min-width: 100%;
  color: var(--title-text-color);
  text-align: left;
  padding: 4px 8px;
  cursor: pointer;
  font-size: smaller;
  background-color: rgba(78, 69, 69, 0);
  margin-bottom: 0px;

  position: relative;

  &:hover {
    background-color: rgba(68, 67, 94, 0.25);
  }
  
  border-radius: 4px;
  &.is-open {
    background-color: rgba(68, 67, 94, 0.36);
    &:hover {
      background-color: rgba(68, 67, 94, 0.36);
    }
  }
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 3px);
  min-width: 10em;
  background-color: #2d2e3a;
  border: 1px solid black;
  z-index: 1;
  list-style: none;
  padding: 6px 0;
  margin: 0;
  border-radius: 4px;
  overflow: hidden;
  gap: 4px;
`;

export const DropdownListItem = styled.li`
  padding: 5px 12px;
  font-size: smaller;
  cursor: pointer;
  color: #ffffff93;
  font-size: small;



  &:not(:last-child) {
    /* border-bottom: 1px solid #fbfbfb1d; */
    border-radius: 0;
  }
  
  &:hover {
    background-color: #3c3d4e;
  }
`;

export const HDivider = styled.div`
  background-color: #00000058;
  box-shadow: 0 1px 0 #ffffff12;
  height: 1px;
  width: 100%;
  margin: 8px 0px;
`;