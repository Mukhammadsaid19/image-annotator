import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Label } from '../label.model';

@Injectable({
  providedIn: 'root',
})
export class AnnotatorService {
  private labelSource = new BehaviorSubject<Label[]>([
    {
      class: 'Dog',
      bbox: { id: 0, x1: 0, y1: 0, x2: 0, y2: 0 },
    },
  ]);

  private labelStore: { labels: Label[] } = {
    labels: [
      {
        class: 'Dog',
        bbox: { id: 0, x1: 0, y1: 0, x2: 0, y2: 0 },
      },
    ],
  };
  readonly labelObservable = this.labelSource.asObservable();

  updateLabel(updatedLabel: Label) {
    this.labelStore.labels.forEach((l, i) => {
      if (l.bbox.id === updatedLabel.bbox.id) {
        this.labelStore.labels[i] = Object.assign({}, updatedLabel);
      }
    });
    this.labelSource.next(Object.assign({}, this.labelStore).labels);
  }

  addLabel(newLabel: Label) {
    this.labelStore.labels.push(Object.assign({}, newLabel));
    this.labelSource.next(Object.assign({}, this.labelStore).labels);
  }

  deleteLabel(labelId: number) {
    console.log('delete label', labelId);
    this.labelStore.labels.forEach((l, i) => {
      if (l.bbox.id === labelId) {
        this.labelStore.labels.splice(i, 1);
      }
    });

    this.labelSource.next(Object.assign({}, this.labelStore).labels);
  }

  constructor() {}
}
