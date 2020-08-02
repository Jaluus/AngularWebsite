import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonstigesHomeComponent } from './sonstiges-home.component';

describe('SonstigesHomeComponent', () => {
  let component: SonstigesHomeComponent;
  let fixture: ComponentFixture<SonstigesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonstigesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonstigesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
