import React, { useState } from "react";
import { CheckmarkCircleSVG, CopySVG } from "../../../Assets/SVGAssets";
import { Container, CopyButton, Divider, Text, Title, TitleWrapper, Wrapper } from "./HelpBox.styles";

enum state {
  none,
  warning,
  error
}

interface HelpBoxProps {
  text: string
  state?: state,
  title?: string,
  includeCopySymbol?: boolean,
  seperateLines?: boolean,
}
const HelpBox = (props: HelpBoxProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyTextToClipboard = async () => {
    return await navigator.clipboard.writeText(props.title + '\n' + props.text.trimStart())
  }

  const handleCopyClick = () => {
    copyTextToClipboard()
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const text = props.text
    .split('\n')
    .map((o) => o.trimStart())
    .filter((o) => o !== "")

  return (
    <Container>
      <Wrapper>
        {props.title &&
          <>
            <TitleWrapper>
              <Title>{props.title}</Title>

              {props.includeCopySymbol &&
                <CopyButton
                  onClick={handleCopyClick}
                >
                  {isCopied
                    ? <CheckmarkCircleSVG height={14} />
                    : <CopySVG height={14} />
                  }
                </CopyButton>
              }

            </TitleWrapper>
            <Divider />
          </>
        }

        {
          text.map((o, id) => (
            <div key={id}>
              <Text >{o}</Text>
              {id !== text.length - 1 &&
                <Divider />
              }
            </div>
          ))
        }
      </Wrapper>
    </Container>
  );
};

export default HelpBox;