import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  min-width: 100%;
  margin: 4px 0;
`;

export const Wrapper = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  font-size: small;
`;


interface SliderInputProps {
  percentage: number
}

const height="6px"

export const SliderInput = styled.input<SliderInputProps>`
  position: relative;
  -webkit-appearance: none;
  height: ${height};
  background-color: #959198;
  border-radius: ${height};
  flex-grow: 1;
  min-width: 0;

  &::-webkit-slider-thumb {
    position: relative;
    appearance: none;
    width: 14px;
    height: 14px;
    background-color: #e1e1e1;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 2;
    &:hover {
      background-color: white;
    }

    &:active {
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.6);
    }
  }

  &::before {
    content: '';
    position: absolute;
    height: ${height};
    border-radius: ${height};
    width: ${(props) => (props.percentage ? props.percentage + '%' : '0%')};
    background-color: #860cdd;
    max-width: 100%;
  }
`;

export const Label = styled.span`
  color: white;
  text-align: left;
  font-size: small;
  min-width: fit-content;
`;

export const SliderValue = styled.input`
  color: #ffffffa0;
  text-align: right;
  font-size: small;
  border: 1px solid black;
  border-radius: 4px;
  padding: 4px;
  background-color: #282323;
  min-width:36px;
  max-width: 50%;
  flex: 1;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  &:focus {
    outline: none;
    border: 1px solid #777777;
  }
  
  &:hover {
    background-color: #302b2b;
  }

  &:active {
    background-color: #3f3939;
  }
`;