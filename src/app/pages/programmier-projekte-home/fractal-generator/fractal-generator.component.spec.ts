import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FractalGeneratorComponent } from './fractal-generator.component';

describe('FractalGeneratorComponent', () => {
  let component: FractalGeneratorComponent;
  let fixture: ComponentFixture<FractalGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FractalGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FractalGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
