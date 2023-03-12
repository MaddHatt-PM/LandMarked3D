import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  min-width: 100%;
  margin: 4px 0;
`;

export const Wrapper = styled.div`
  border: 1px solid black;
  background-color: #0000002b;
  padding: 8px;
  border-radius: 8px;
`;

export const TitleWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  font-size: small;
  margin: 0;
`;


export const Title = styled.span`
  color: #ffffffdf;
  margin-bottom: 4px;
`;

export const Text = styled.p`
  font-size: small;
  color: #ffffff64;
  margin: 0;
`;