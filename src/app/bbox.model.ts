export interface BBoxModel {
  segmentation: number[];
  area: number;
  iscrowd: number;
  ignore: number;
  image_id: number;
  bbox: number[];
  category_id: number;
  id: number;
}
