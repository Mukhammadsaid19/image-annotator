export interface Label {
  class: string;
  bbox: {
    id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}
