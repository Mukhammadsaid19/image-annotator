import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/category.model';
import { Label } from 'src/app/label.model';
import { AnnotatorService } from 'src/app/shared/annotator.service';
import { ClassesService } from 'src/app/shared/classes.service';

@Component({
  selector: 'app-label-classes',
  templateUrl: './label-classes.component.html',
  styleUrls: ['./label-classes.component.scss'],
})
export class LabelClassesComponent implements OnInit {
  drawnLabels: Label[];
  currentClass: CategoryModel;

  labelClasses: CategoryModel[];

  handleClassChange() {
    this.classesService.updateClass(this.currentClass);
  }

  constructor(private classesService: ClassesService) {}

  ngOnInit(): void {
    this.labelClasses = this.classesService.getAll();
    this.currentClass = this.labelClasses[0];
  }
}
