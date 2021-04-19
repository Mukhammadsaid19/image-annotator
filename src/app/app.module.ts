import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnotatorComponent } from './annotator/annotator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { CanvasComponent } from './annotator/canvas/canvas.component';
import { LabelClassesComponent } from './annotator/label-classes/label-classes.component';
import { LabelListComponent } from './annotator/label-list/label-list.component';
import { KonvaComponent } from './konva/konva.component';
import { KonvaModule } from 'ng2-konva';

@NgModule({
  declarations: [
    AppComponent,
    AnnotatorComponent,
    CanvasComponent,
    LabelClassesComponent,
    LabelListComponent,
    KonvaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    KonvaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
