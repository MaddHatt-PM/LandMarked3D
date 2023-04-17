import styled, { css } from "styled-components";

export const Container = styled.div`
  height: 30px;
  width: 100%;
  z-index: 1000;

  background-color: var(--title-background);
  -webkit-app-region: drag;
  position: sticky;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  border-bottom: 1px solid black;
  font-size: medium;
`;

export const WindowsName = styled.span`
  color: var(--title-text-color);
  position: relative;
  font-size: small;
`;

interface WinPinProps {
  isPinned?: boolean;
}

export const WinButton = styled.button<WinPinProps>`
  -webkit-app-region: no-drag;
  -webkit-user-select: none;
  user-select: none;
  border-radius: 0%;
  float: left;
  border: 0px;
  height: 30px;
  width: 38px;
  background-color: var(--title-button-normal);
    
    &:hover {
    background-color: var(--title-button-hover);
    }

    &:active {
      background-color: var(--title-button-click);
    }
    img {
      padding-top: 4px;
    }
`;

export const WinPin = styled(WinButton)`
  ${({ isPinned }) => isPinned && css`
    background-color: var(--title-button-toggled);
  `}
`

export const WinClose = styled(WinButton)`
    &:hover {
    background-color: var(--title-button-hover-close);
    }

    &:active {
      background-color: var(--title-button-click-close);
    }
`;

interface LogoProps {
  isOnline: boolean;
}

export const Logo = styled.img<LogoProps>`
    width: 20px;
    height: 20px;
    float: left;
    margin: auto 4px auto 4px; 

    filter: hue-rotate(${props => props.isOnline ? "0deg" : "200deg"});
`;

export const AppName = styled.span`
  -webkit-user-select: none;
  font-size: small;
  user-select: none;
  color: var(--title-text-color);
  display: flex;
  padding-left: 8px;
  padding-top: 2px;
`;

export const HStack = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  position: absolute;
  width: 100%;
`;