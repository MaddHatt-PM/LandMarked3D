import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
  :root {
    --white: #fff;
    --lightGrey: #727272;
    --medGrey: rgb(49, 48, 53);
    --darkGrey: #1c1c1c;

    --input-text-placeholder: #383838;
    --input-text-background: #ebebeb;

    --tablerow: 255, 255, 255;
    --tablerow-hover: rgb(59, 62, 68);
    --table-header-bg: rgb(45, 46, 50);
    --table-divider: rgba(255, 255, 255, 0.1);
    --textbutton: 70, 68, 79;

    --section-divider: rgb(62, 60, 71);

    --background-color: #36393f;
    --title-background: #202225;
    --title-button-normal: #202225;
    --title-button-hover: #36393f;
    --title-button-click: #4f535c;
    --title-button-toggled: #272b35;
    --title-button-hover-close: #cc3d3d;
    --title-button-click-close: #ff2b2b;
    --title-text-color: rgb(176, 176, 176);
    --text-normal-color: white;

    user-select: none;
    }

    ::-webkit-scrollbar {
    width: 12px;
    height: 8px;
    border-left: 1px solid black;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #787676;
    border-left: 1px solid black;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;