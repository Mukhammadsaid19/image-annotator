import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as JSZip from 'jszip';
import { BBoxModel } from 'src/app/bbox.model';
import { CategoryModel } from 'src/app/category.model';
import { CocoModel } from 'src/app/coco.model';
import { ImageModel } from 'src/app/image.model';
import { Label } from 'src/app/label.model';
import { AnnotatorService } from 'src/app/shared/annotator.service';
import { ClassesService } from 'src/app/shared/classes.service';
import { ImagesService } from 'src/app/shared/images.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.scss'],
})
export class LabelListComponent implements OnInit {
  drawnLabels: Label[] = [];
  value;

  images: ImageModel[] = [];
  classes: CategoryModel[] = [];
  bboxes: BBoxModel[] = [];
  coco: CocoModel;

  constructor(
    private annotatorService: AnnotatorService,
    private imagesService: ImagesService,
    private classesService: ClassesService,
    private _snackBar: MatSnackBar
  ) {}

  deleteLabel(labelToDelete: Label) {
    this.annotatorService.deleteLabel(labelToDelete.bbox.id);
  }

  downloadCoco() {
    let i = 0;
    this.bboxes = [];

    let zip = new JSZip();

    for (let label of this.drawnLabels) {
      this.bboxes.push({
        segmentation: [
          label.bbox.x1,
          label.bbox.y1,
          label.bbox.x1,
          label.bbox.y1 + label.bbox.height,
          label.bbox.x1 + label.bbox.width,
          label.bbox.y1 + label.bbox.height,
          label.bbox.x1 + label.bbox.width,
          label.bbox.y1,
        ],
        area: label.bbox.width * label.bbox.height,
        iscrowd: 0,
        ignore: 0,
        image_id: label.image_id,
        bbox: [
          label.bbox.x1,
          label.bbox.y1,
          label.bbox.width,
          label.bbox.height,
        ],
        category_id: label.category_id,
        id: ++i,
      });
    }

    this.coco = {
      images: this.images,
      type: 'instances',
      categories: this.classes,
      annotations: this.bboxes,
    };

    zip.file('coco.json', JSON.stringify(this.coco));
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      saveAs(blob, 'coco.zip');
    });

    this.value = JSON.stringify(this.coco);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.annotatorService.deleteLabel(0);
    this.annotatorService.labelObservable.subscribe(
      (labels) => (this.drawnLabels = labels)
    );

    this.images = this.imagesService.getAll();

    this.classes = this.classesService.getAll();
  }
}
