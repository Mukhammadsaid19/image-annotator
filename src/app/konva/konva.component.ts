import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-konva',
  template: `<ko-stage [config]="configStage">
    <ko-layer>
      <ko-circle
        [config]="configCircle"
        (click)="handleClick($event)"
      ></ko-circle>
    </ko-layer>
  </ko-stage>`,
  styleUrls: ['./konva.component.scss'],
})
export class KonvaComponent implements OnInit {
  public configStage: Observable<any> = of({
    width: 200,
    height: 200,
  });
  public configCircle: Observable<any> = of({
    x: 100,
    y: 100,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
  });

  public handleClick(component) {
    console.log('Hello Circle', component);
  }
  constructor() {}

  ngOnInit(): void {}
}
