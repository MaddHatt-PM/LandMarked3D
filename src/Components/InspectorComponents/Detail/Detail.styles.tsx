import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  min-width: 100%;
  margin: 5px 0;
`;

export const Wrapper = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 4px;
  font-size: small;
`;

export const Label = styled.span`
  color: white;
  text-align: left;
  font-size: small;
`;

export const Text = styled.span`
  color: white;
  text-align: right;
  font-size: small;
  opacity: 0.5;
`;