enum ImageType {
  BaseImage="base-image",
  Overlay="overlay",
  Graph="graph"
}

declare interface GraphBaseProps {
  gradientName: string;
  fieldUUID: string;
  propertyName: string;
}

declare interface BaseImageProps {
  sharpness: number;
  brightness: number;
  contrast: number;
  saturation: number;
}

declare interface GraphContourProps extends GraphBaseProps {
  steps: number;

}

declare interface GraphHeightProps extends GraphBaseProps {

}

declare interface GraphVectorFieldProps extends GraphBaseProps {
  sampleDistance: number;

}

declare interface ImageMapData {
  name: string;
  url: string;
  isViewable: boolean;
  opacity: number;
  uuid?: string;

  imageType?: ImageType 
  filters?: ImageFilterData[];
  properties?: BaseImageProps | GraphContourProps | GraphHeightProps | GraphVectorFieldProps;
}