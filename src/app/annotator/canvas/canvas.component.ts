import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { CategoryModel } from 'src/app/category.model';
import { ImageModel } from 'src/app/image.model';
import { Label } from 'src/app/label.model';
import { AnnotatorService } from 'src/app/shared/annotator.service';
import { ClassesService } from 'src/app/shared/classes.service';
import { ImagesService } from 'src/app/shared/images.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit {
  @ViewChild('layer', { static: false }) layerCanvas: ElementRef;
  @ViewChild('board', { static: false }) boardCanvas: ElementRef;

  private context: CanvasRenderingContext2D;
  private layerCanvasElement: any;

  drawnLabels: Label[] = [];

  currentClasses: CategoryModel[] = [];
  currentImages: ImageModel[];
  currentModelImage: ImageModel;

  currentLabel: Label;
  currentImage = new Image();
  currentClass: CategoryModel;
  tempLabels: Label[] = [];

  currentIdx = 0;
  imageIdx = 0;

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
  getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log('x: ' + x + ' y: ' + y);
  }

  showImage() {
    this.loadImage();
    this.annotatorService.labelObservable.subscribe((value) =>
      this.refreshCanvas()
    );
    let parent = this;

    this.layerCanvasElement.addEventListener('mousedown', (e) => {
      this.getCursorPosition(this.context, e);
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
          width: this.uniX,
          height: this.uniY,
        };

        this.currentLabel.category_id = this.currentClasses.indexOf(
          this.currentClass
        );

        this.currentLabel.image_id = this.currentModelImage.id;

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

    this.tempLabels = this.drawnLabels.filter(
      (label) => label.image_id === this.currentModelImage.id
    );

    for (let label of this.tempLabels) {
      if (label.image_id === this.currentModelImage.id) {
        this.drawRect(
          label.bbox.x1,
          label.bbox.y1,
          label.bbox.width + label.bbox.x1,
          label.bbox.height + label.bbox.y1
        );
      }
    }
  }

  handleChangeCanvas() {
    this.annotatorService.addLabel(this.currentLabel);
  }

  handleNextImage() {
    if (this.imageIdx < this.currentImages.length) {
      ++this.imageIdx;
      this.currentModelImage = this.currentImages[this.imageIdx];
      this.currentImage.src = `assets/img/${this.currentModelImage.file_name}`;
      this.currentImage.onload = () => {
        this.showImage();
      };
    }
  }

  handlePrevImage() {
    if (this.imageIdx >= 0) {
      --this.imageIdx;
      this.currentModelImage = this.currentImages[this.imageIdx];
      this.currentImage.src = `assets/img/${this.currentModelImage.file_name}`;
      this.currentImage.onload = () => {
        this.showImage();
      };
    }
  }

  constructor(
    private annotatorService: AnnotatorService,
    private classesService: ClassesService,
    private imagesService: ImagesService
  ) {}

  ngOnInit(): void {
    let parent = this;
    this.annotatorService.labelObservable.subscribe(function (labels) {
      parent.drawnLabels = labels;
    });

    this.classesService.classObservable.subscribe((newClass) => {
      this.currentClass = newClass;
    });

    this.currentImages = this.imagesService.getAll();
    this.currentModelImage = this.currentImages[0];

    this.currentLabel = this.drawnLabels[0];
    this.currentImage.src = `assets/img/${this.currentImages[0].file_name}`;
    this.currentImage.onload = () => {
      this.showImage();
    };

    this.currentClasses = this.classesService.getAll();
  }
}
