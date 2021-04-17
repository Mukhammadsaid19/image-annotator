import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { AnnotatorService } from 'src/app/shared/annotator.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  @ViewChild('layer', { static: false }) layerCanvas: ElementRef;

  private context: CanvasRenderingContext2D;
  private layerCanvasElement: any;

  drawnLabels: any = [];
  currentLabel: any;
  currentImage = new Image();
  currentIdx = 0;

  showInput: boolean = false;
  isMoving: boolean;
  imgWidth: number;
  initX: number;
  initY: number;
  uniX: number;
  uniY: number;
  imgHeight: number;
  url: string;

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

        this.handleChangeCanvas();

        parent.drawRectMy(this.initX, this.initY, e.offsetX, e.offsetY);
      }
      this.uniX = undefined;
      this.uniY = undefined;
    });
  }

  drawRectMy(x1: number, y1: number, x2: number, y2: number) {
    let fillColor = 'rgba(63, 81, 181, 0.3)';
    let strokeColor = 'rgba(63, 81, 181, 1)';

    // this.context.clearRect(
    //   0,
    //   0,
    //   this.layerCanvasElement.width,
    //   this.layerCanvasElement.width
    // );
    // this.loadImage();

    let width = x2 - x1;
    let height = y2 - y1;

    this.uniX = width;
    this.uniY = height;

    this.context.beginPath();
    this.context.fillStyle = fillColor;
    this.context.fillRect(x1, y1, width, height);
    this.context.strokeStyle = strokeColor;
    this.context.lineWidth = 3;
    this.context.strokeRect(x1, y1, width, height);
  }

  drawRect(color: string, height: number, width: number) {
    this.uniX = height;
    this.uniY = width;
    this.context.clearRect(
      0,
      0,
      this.layerCanvasElement.width,
      this.layerCanvasElement.width
    );

    this.loadImage();
    this.context.restore();

    this.context.beginPath();
    this.context.rect(
      this.currentLabel.bbox.x1,
      this.currentLabel.bbox.y1,
      this.uniX,
      this.uniY
    );
    this.context.lineWidth = 2;
    this.context.strokeStyle = color;
    this.context.fillStyle = 'rgba(255, 0, 0, 0.3)';
    this.context.stroke();
  }

  handleChangeCanvas() {
    this.annotatorService.updateLabel(this.currentLabel);
  }

  constructor(private annotatorService: AnnotatorService) {}

  ngOnChanges() {}

  ngOnInit(): void {
    let parent = this;
    this.annotatorService.labelObservable.subscribe(function (label) {
      parent.currentLabel = label;
      // parent.drawRect('green', parent.currentLabel.bbox.)
    });

    this.currentImage.src = 'assets/img/sample_1.jpg';

    this.currentImage.onload = () => {
      this.showImage();
    };
  }
}
