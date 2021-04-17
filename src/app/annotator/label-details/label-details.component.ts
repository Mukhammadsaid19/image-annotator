import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AnnotatorService } from 'src/app/shared/annotator.service';

@Component({
  selector: 'app-label-details',
  templateUrl: './label-details.component.html',
  styleUrls: ['./label-details.component.scss'],
})
export class LabelDetailsComponent implements OnInit {
  @Output() detailsChanged = new EventEmitter();
  value: string;
  isEditEnable: boolean;
  currentLabel: any;

  onEdit() {
    this.isEditEnable = !this.isEditEnable;
  }

  onDelete() {
    // this.initializeLabel();
  }

  changeDetails() {
    this.annotatorService.updateLabel(this.currentLabel);
    this.detailsChanged.emit(this.currentLabel);
  }

  constructor(private annotatorService: AnnotatorService) {}

  ngOnInit(): void {
    this.annotatorService.labelObservable.subscribe(
      (label) => (this.currentLabel = label)
    );
  }
}
