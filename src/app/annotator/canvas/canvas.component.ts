import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Label } from 'src/app/label.model';
import { AnnotatorService } from 'src/app/shared/annotator.service';
import { ClassesService } from 'src/app/shared/classes.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  @ViewChild('layer', { static: false }) layerCanvas: ElementRef;

  private context: CanvasRenderingContext2D;
  private layerCanvasElement: any;

  drawnLabels: Label[] = [];

  currentLabel: Label;
  currentImage = new Image();
  currentClass: string;
  currentIdx = 0;

  showInput: boolean = false;
  isMoving: boolean;
  initX: number;
  initY: number;
  uniX: number;
  uniY: number;
  url: string;

  prettyClassPrint() {
    let x2 = this.uniX - this.initX;
    let y2 = this.uniY - this.initY;
    let dist1 = this.initX ** this.initX + this.initY ** this.initY;
    let dist2 = x2 ** x2 + y2 ** y2;

    return dist1 > dist2 ? [this.initX, this.initY] : [x2, y2];
  }

  loadImage() {
    this.layerCanvasElement = this.layerCanvas.nativeElement;
    this.context = this.layerCanvasElement.getContext('2d');
    this.layerCanvasElement.width = this.currentImage.width;
    this.layerCanvasElement.height = this.currentImage.height;

    this.context.drawImage(
      this.currentImage,
      0,
      0,
      this.currentImage.width,
      this.currentImage.height
    );
  }

  showImage() {
    this.loadImage();
    this.annotatorService.labelObservable.subscribe((value) =>
      this.refreshCanvas()
    );
    let parent = this;

    this.layerCanvasElement.addEventListener('mousedown', (e) => {
      this.isMoving = true;
      this.initX = e.offsetX;
      this.initY = e.offsetY;

      console.log(`initX: ${this.initX} and initY: ${this.initY}`);
    });

    this.layerCanvasElement.addEventListener('mousemove', (e) => {
      if (this.isMoving) {
        this.uniX = e.offsetX - this.initX;
        this.uniY = e.offsetY - this.initY;
      }
    });

    this.layerCanvasElement.addEventListener('mouseup', (e) => {
      this.isMoving = false;

      if (this.uniX && this.uniY) {
        this.currentLabel.bbox = {
          id: ++this.currentIdx,
          x1: this.initX,
          y1: this.initY,
          x2: this.uniX,
          y2: this.uniY,
        };

        this.currentLabel.class = this.currentClass;

        this.handleChangeCanvas();

        parent.drawRect(this.initX, this.initY, e.offsetX, e.offsetY);
      }
      this.uniX = undefined;
      this.uniY = undefined;
    });
  }

  drawRect(x1: number, y1: number, x2: number, y2: number) {
    let fillColor = 'rgba(63, 81, 181, 0.2)';
    let strokeColor = 'rgba(63, 81, 181, 0.8)';

    let width = x2 - x1;
    let height = y2 - y1;

    this.uniX = width;
    this.uniY = height;

    this.context.beginPath();
    this.context.fillStyle = fillColor;
    this.context.fillRect(x1, y1, width, height);
    this.context.strokeStyle = strokeColor;
    this.context.lineWidth = 2;
    this.context.strokeRect(x1, y1, width, height);
  }

  refreshCanvas(): void {
    this.loadImage();

    for (let label of this.drawnLabels) {
      this.drawRect(
        label.bbox.x1,
        label.bbox.y1,
        label.bbox.x2 + label.bbox.x1,
        label.bbox.y2 + label.bbox.y1
      );
    }
  }

  handleChangeCanvas() {
    this.annotatorService.addLabel(this.currentLabel);
    console.log(this.prettyClassPrint());
  }

  constructor(
    private annotatorService: AnnotatorService,
    private classesService: ClassesService
  ) {}

  ngOnInit(): void {
    let parent = this;
    this.annotatorService.labelObservable.subscribe(function (labels) {
      parent.drawnLabels = labels;
    });

    this.classesService.classObservable.subscribe((newClass) => {
      this.currentClass = newClass;
    });

    this.currentLabel = this.drawnLabels[0];
    this.currentImage.src = 'assets/img/sample_1.jpg';
    this.currentImage.onload = () => {
      this.showImage();
    };
  }
}
