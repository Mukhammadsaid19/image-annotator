import { Component, OnInit } from '@angular/core';
import { Label } from 'src/app/label.model';
import { AnnotatorService } from 'src/app/shared/annotator.service';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.scss'],
})
export class LabelListComponent implements OnInit {
  drawnLabels: Label[] = [];

  constructor(private annotatorService: AnnotatorService) {}

  deleteLabel(labelToDelete: Label) {
    this.annotatorService.deleteLabel(labelToDelete.bbox.id);
  }

  ngOnInit(): void {
    this.annotatorService.labelObservable.subscribe(
      (labels) => (this.drawnLabels = labels)
    );
  }
}
