import { BBoxModel } from './bbox.model';
import { CategoryModel } from './category.model';
import { ImageModel } from './image.model';

export interface CocoModel {
  images: ImageModel[];
  type: 'instances';
  annotations: BBoxModel[];
  categories: CategoryModel[];
}
