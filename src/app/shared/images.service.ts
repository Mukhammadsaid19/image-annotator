import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ImageModel } from '../image.model';
@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private counter;
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
    {
      id: 2,
      file_name: 'sample_3.jpg',
      width: 200,
      height: 200,
    },
    {
      id: 3,
      file_name: 'sample_4.jpeg',
      width: 200,
      height: 200,
    },
    {
      id: 4,
      file_name: 'sample_5.jpg',
      width: 200,
      height: 200,
    },
  ];

  getAll(): ImageModel[] {
    return this.images;
  }

  constructor() {}
}
