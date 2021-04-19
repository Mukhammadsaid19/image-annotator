import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonvaComponent } from './konva.component';

describe('KonvaComponent', () => {
  let component: KonvaComponent;
  let fixture: ComponentFixture<KonvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KonvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KonvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
