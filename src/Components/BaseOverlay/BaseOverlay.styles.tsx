import styled from "styled-components";

export const Container = styled.div`
  width: 500px;
  height: 200px;
  max-height: 500px;
  background-color: #282b30;
  border: 1px solid #ffffff14;
  border-radius: 4px;
  outline: 1px solid black;
  box-shadow: 0px 0px 16px #0000004d;
  color: white;
  display: flex;
  flex-direction: column;
  height: auto;
`;

export const Wrapper = styled.div`
  position: relative;
  height: calc(100% - 14px);
  margin: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const HStack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 2px;
  gap: 8px;

  width: 100%;
`;

export const VStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  width: 100%;
`;

export const ModalHeader = styled.p`

  font-size: medium;
  color: #ffffffdf;
  margin-top: 2px;
  margin-bottom: 2px;
`;

export const ModalDivider = styled.div`
  background-color: #000000;
  box-shadow: 0 1px 0 #ffffff12;
  height: 1px;
  width: calc(100% + 16px);
  margin: 2px -8px;
`;

export const CloseButton = styled.button`
color: white;
background-color: #282323;
border: 1px solid black;
aspect-ratio: 1.0;
width: 24px;
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

export const ModalButton = styled.button`
  color: white;
  background-color: #282323;
  flex: 1;
  max-width: 30%;
  height: 32px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 3px;
  cursor: pointer;

  &:hover {
    background-color: #302b2b;
  }

  &:active {
    background-color: #3f3939;
    border: 1px solid #777777;
  }
`;