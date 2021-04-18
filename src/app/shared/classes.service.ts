import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoryModel } from '../category.model';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  private classData: CategoryModel[] = [
    {
      supercategory: 'none',
      id: 0,
      name: 'Cat',
    },
    {
      supercategory: 'none',
      id: 1,
      name: 'Dog',
    },
    {
      supercategory: 'none',
      id: 2,
      name: 'Cow',
    },
    {
      supercategory: 'none',
      id: 3,
      name: 'Human',
    },
    {
      supercategory: 'none',
      id: 4,
      name: 'Cheetah',
    },
  ];
  private classSource = new BehaviorSubject(this.classData[0]);
  readonly classObservable = this.classSource.asObservable();

  updateClass(currentClass: CategoryModel) {
    this.classSource.next(currentClass);
  }

  getAll() {
    return this.classData;
  }

  constructor() {}
}
