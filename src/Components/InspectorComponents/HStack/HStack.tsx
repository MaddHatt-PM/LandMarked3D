import styled from "styled-components";

interface HStackProps {
  gap?: string
}

export const HStack = styled.div.attrs<HStackProps>(({ gap }) => ({
  style: {
    gap: gap ?? "10px",
  }
})) <HStackProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  position: absolute;
  width: 100%;
`;