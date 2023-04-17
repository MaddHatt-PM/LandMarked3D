import React from "react";
import { Container, Image } from "./ImageView.styles";

interface ImageViewProps {
  imageMapData: ImageMapData;
}

const ImageView = (props: ImageViewProps) => {

  return (
    <Image
      src={props.imageMapData.url}
      style={{
        display: props.imageMapData.isViewable ? "block" : "none",
        opacity: props.imageMapData.opacity,
        zIndex: -1
      }}
    />
  );
};

export default ImageView;