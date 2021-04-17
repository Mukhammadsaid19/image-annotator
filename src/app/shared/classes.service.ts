import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  private classSource = new BehaviorSubject('Dog');
  readonly classObservable = this.classSource.asObservable();

  updateClass(currentClass: string) {
    this.classSource.next(currentClass);
  }

  constructor() {}
}
