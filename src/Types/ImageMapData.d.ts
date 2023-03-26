declare interface ImageMapData {
  name: string;
  url: string;
  isViewable: boolean;
  opacity: number;

  filters?: ImageFilterData[];
}