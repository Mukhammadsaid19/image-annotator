import { Injectable } from '@angular/core';
import { ImageModel } from '../image.model';
@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  images: ImageModel[] = [
    {
      id: 0,
      file_name: 'sample_1.jpg',
      width: 100,
      height: 100,
    },
    {
      id: 1,
      file_name: 'sample_2.jpg',
      width: 200,
      height: 200,
    },
  ];

  getAll() {
    return this.images;
  }
  constructor() {}
}
