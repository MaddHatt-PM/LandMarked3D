import { style } from "d3";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  min-width: 100%;
  margin: 0;
  gap: 4px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

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
  border: 1px solid black;
  min-width: 100%;
  height: 32px;
  color: white;
  text-align: left;
  padding: 6px;
  cursor: pointer;
  font-size: smaller;
  background-color: #282323;
  margin-bottom: 0px;

  position: relative;

  &:hover {
    background-color: #302b2b;
  }
  
  &:active {
    background-color: #3f3939;
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
  right: 8px;
  transform: translateY(-50%) rotate(135deg);
  width: 0.3em;
  height: 0.3em;
  border-top: 0.15em solid currentColor;
  border-right: 0.15em solid currentColor;
  opacity: 0.5;
`;

export const SideButton = styled.button`
  color: white;
  background-color: #282323;
  flex: 0;
  flex-grow: 0;
  flex-shrink: 0;
  
  width: 28px;
  min-width: 28px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 3px;
  cursor: pointer;

  &.full-width {
    max-width: 100%;
  }

  &:hover {
    background-color: #302b2b;
  }

  &:active {
    background-color: #3f3939;
    border: 1px solid #777777;
  }
`;

interface DropdownListProps {
  leadingButtonCount: number,
  trailingButtonCount: number,
}

export const DropdownList = styled.ul.attrs<DropdownListProps>((props: DropdownListProps) => ({
  style: {
    left: `calc(20% - 18px)`,
    width: `calc(80%)`,

  }
})) <DropdownListProps>`
  position: absolute;
  top: 100%;
  background-color: #242020;
  display: grid;
  border: 1px solid black;
  z-index: 1;
  list-style: none;
  padding: 8px;
  margin: -5px 0;
  border-radius: 4px 0 4px 4px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  /* gap: 5px; */
`;

export const DropdownListItem = styled.li`
  font-size: smaller;
  cursor: pointer;
  color: #ffffff72;
  padding: 4px 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* border-bottom: 1px solid black; */
  
  &:hover {
    background-color: #141111;
    border-radius: 5px;
  }
  
  &:last-child {
    border: none;
  }
`;
