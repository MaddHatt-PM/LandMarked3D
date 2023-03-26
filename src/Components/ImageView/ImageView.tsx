import React from "react";
import { Container, Image } from "./ImageView.styles";

interface ImageViewProps {
  imageMapData: ImageMapData
}

const ImageView = (props: ImageViewProps) => {

  return (
    <Image
      src={props.imageMapData.url}
      style={{
        opacity: props.imageMapData.opacity,
      }}
    />
  );
};

export default ImageView;