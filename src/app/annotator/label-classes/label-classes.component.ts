import { Component, OnInit } from '@angular/core';
import { AnnotatorService } from 'src/app/shared/annotator.service';

@Component({
  selector: 'app-label-classes',
  templateUrl: './label-classes.component.html',
  styleUrls: ['./label-classes.component.scss'],
})
export class LabelClassesComponent implements OnInit {
  currentLabel: any;
  currentClass: string = '';
  labelClasses: string[] = [
    'Cow',
    'Dog',
    'Cat',
    'Fox',
    'Ox',
    'Rabbit',
    'Cheetah',
    'Human',
    'Spider',
    'Elephant',
  ];

  handleClassChange() {
    this.annotatorService.updateLabel(this.currentLabel);
  }

  constructor(private annotatorService: AnnotatorService) {}

  ngOnInit(): void {
    this.annotatorService.labelObservable.subscribe(
      (label) => (this.currentLabel = label)
    );
  }
}
