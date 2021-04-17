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
import { LabelDetailsComponent } from './annotator/label-details/label-details.component';
import { CardComponent } from './annotator/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    AnnotatorComponent,
    CanvasComponent,
    LabelClassesComponent,
    LabelDetailsComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
