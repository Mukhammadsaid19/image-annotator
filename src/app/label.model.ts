export interface Label {
  category_id: number;
  image_id: number;
  bbox: {
    id: number;
    x1: number;
    y1: number;
    width: number;
    height: number;
  };
}
