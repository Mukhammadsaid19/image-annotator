import { Component, OnInit } from '@angular/core';
import { Label } from '../label.model';
import { AnnotatorService } from '../shared/annotator.service';

@Component({
  selector: 'app-annotator',
  templateUrl: './annotator.component.html',
  styleUrls: ['./annotator.component.scss'],
})
export class AnnotatorComponent implements OnInit {
  currentLabel: any;

  changeClass(): void {
    this.annotatorService.updateLabel(this.currentLabel);
  }

  constructor(private annotatorService: AnnotatorService) {}

  ngOnInit(): void {
    this.annotatorService.labelObservable.subscribe((label) =>
      console.log('Subscription got', (this.currentLabel = label))
    );
  }
}
