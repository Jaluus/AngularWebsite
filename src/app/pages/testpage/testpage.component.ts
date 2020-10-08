import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import * as p5 from 'p5';
import * as ml5 from 'ml5';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css'],
})
export class TestpageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('CanvasRef2') NoiseRef: ElementRef;

  canvas: any;
  MlSketch: any;

  //sketch RNN
  sketchRNN;
  currentStroke;
  model = 'cat';
  seedPoints = [];
  personDrawing = false;
  personFinished = false;
  startX;
  startY;

  models = ['cat', 'truck'];

  constructor() {}

  ngAfterViewInit() {
    this.MlSketch = (s) => {
      let divWidth;
      let divHeight;
      let x;
      let y;
      let nextPen = 'down';
      s.preload = () => {
        console.log('Loading Model...');
        this.sketchRNN = ml5.sketchRNN(this.model);
        console.log('Loaded Model');
      };
      s.setup = () => {
        divWidth = this.NoiseRef.nativeElement.offsetWidth;
        divHeight = this.NoiseRef.nativeElement.offsetHeight;
        let canvas2 = s.createCanvas(divWidth, divHeight);
        canvas2.parent('NoiseHolder');
        canvas2.mousePressed(s.startDrawing);
        canvas2.mouseReleased(s.sketchRNNStart);
        s.stroke(0);
        s.strokeWeight(4);
        s.background(225);
      };

      s.sketchRNNStart = () => {
        this.personDrawing = false;
        this.personFinished = true;

        if (this.seedPoints.length != 0) {
          x = this.startX;
          y = this.startY;
          s.background(255);
          s.stroke(0);
          for (let v of this.seedPoints) {
            s.line(x, y, x + v.dx, y + v.dy);
            x += v.dx;
            y += v.dy;
          }
          s.stroke(255, 0, 0);
          this.sketchRNN.generate(this.seedPoints, s.gotStrokePath);
        } else {
          x = divWidth / 3;
          y = divHeight / 3;
          s.background(255);
          s.stroke(255, 0, 0);
          this.sketchRNN.generate(s.gotStrokePath);
        }
      };

      s.startDrawing = () => {
        if (!this.personFinished) {
          this.personDrawing = true;
          x = s.mouseX;
          y = s.mouseY;
          this.startX = x;
          this.startY = y;
        }
      };

      s.gotStrokePath = (error, strokePath) => {
        this.currentStroke = strokePath;
      };

      s.draw = () => {
        if (this.personDrawing) {
          let strokePath = {
            dx: s.mouseX - s.pmouseX,
            dy: s.mouseY - s.pmouseY,
            pen: 'down',
          };

          s.line(x, y, x + strokePath.dx, y + strokePath.dy);
          x += strokePath.dx;
          y += strokePath.dy;

          this.seedPoints.push(strokePath);
        }

        if (this.currentStroke) {
          if (nextPen == 'end') {
            this.sketchRNN.reset();
            this.currentStroke = null;
            nextPen = 'down';
            return;
          }
          if (nextPen == 'down') {
            s.line(x, y, x + this.currentStroke.dx, y + this.currentStroke.dy);
          }
          x = x + this.currentStroke.dx;
          y = y + this.currentStroke.dy;
          nextPen = this.currentStroke.pen;
          this.currentStroke = null;
          this.sketchRNN.generate(s.gotStrokePath);
        }
      };

      s.windowResized = () => {
        divWidth = this.NoiseRef.nativeElement.offsetWidth;
        divHeight = this.NoiseRef.nativeElement.offsetHeight;
        s.resizeCanvas(divWidth, divHeight);
      };
    };
    this.canvas = new p5(this.MlSketch);
  }

  restartRNN() {
    this.canvas.sketchRNNStart();
  }

  redraw() {
    this.canvas.draw();
  }

  ngOnDestroy() {
    this.canvas.remove();
  }
}
