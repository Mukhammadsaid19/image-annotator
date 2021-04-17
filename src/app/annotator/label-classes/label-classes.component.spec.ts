import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelClassesComponent } from './label-classes.component';

describe('LabelClassesComponent', () => {
  let component: LabelClassesComponent;
  let fixture: ComponentFixture<LabelClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
