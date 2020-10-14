import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TensorflowObjectdetectionComponent } from './tensorflow-objectdetection.component';

describe('TensorflowObjectdetectionComponent', () => {
  let component: TensorflowObjectdetectionComponent;
  let fixture: ComponentFixture<TensorflowObjectdetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TensorflowObjectdetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TensorflowObjectdetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
