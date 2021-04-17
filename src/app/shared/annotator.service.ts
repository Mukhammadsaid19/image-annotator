import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Label } from '../label.model';

@Injectable({
  providedIn: 'root',
})
export class AnnotatorService {
  private labelSource = new BehaviorSubject({
    class: 'dog',
    bbox: { id: 0, x1: 2, y1: 10, x2: 50, y2: 100 },
  });

  labelObservable = this.labelSource.asObservable();

  updateLabel(newLabel: Label) {
    return this.labelSource.next(newLabel);
  }

  constructor() {}
}
