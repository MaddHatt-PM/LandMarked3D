import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  min-width: 100%;
  margin: 10px 0;
  `;

export const Wrapper = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  font-size: small;
`;

export const ToggleContainer = styled.span`
  display: inline-block;
  position: relative;
  width: 30px;
  height: 12px;
`;


export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #959198;
  border-radius: 36px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 0;
    bottom: -2px;
    background-color: #e1e1e1;
    border-radius: 50%;
    transition: transform 0.2s;

    &:active {
        background-color: white;
    }
  }

  &.is-checked{
    background-color: #860cdd;

    &:before {
      transform: translateX(14px);
      

    }
  }
`;