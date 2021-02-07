import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import * as p5 from 'p5';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css'],
})
export class TestpageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('CanvasRef2') NoiseRef: ElementRef;

  canvas: any;
  geneticSketch: any;

  mutationRate = 0.01;
  lifespan = 200;
  maxForce = 1;
  popsize = 100;
  dt = 1;
  limitVel = 5;

  constructor(public WSM: WindowSizeManager) {}

  ngAfterViewInit() {
    this.geneticSketch = (s) => {
      let divWidth;
      let divHeight;

      s.setup = () => {
        divWidth = this.NoiseRef.nativeElement.offsetWidth;
        divHeight = this.NoiseRef.nativeElement.offsetHeight;
        let canvas2 = s.createCanvas(divWidth, divHeight);
        canvas2.parent('geneticCanvas');
      };

      s.draw = () => {
        s.background(51);
        s.fill(255);
      };

      s.windowResized = () => {
        divWidth = this.NoiseRef.nativeElement.offsetWidth;
        divHeight = this.NoiseRef.nativeElement.offsetHeight;
        s.resizeCanvas(divWidth, divHeight);
      };
    };
    this.canvas = new p5(this.geneticSketch);
  }

  ngOnDestroy() {
    this.canvas.remove();
  }
}
