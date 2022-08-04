import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import * as p5 from 'p5';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';
import { makeNoise2D } from 'open-simplex-noise';

@Component({
  selector: 'app-p5-webgl',
  templateUrl: './p5-webgl.component.html',
  styleUrls: ['./p5-webgl.component.css'],
})
export class P5WebglComponent implements OnDestroy, AfterViewInit {
  @ViewChild('CanvasRef2') NoiseRef: ElementRef;
  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

  canvas: any;
  testSketch: any;

  offsetAngle = 0;
  boxSize = 30;
  zoom = 300;
  lighting = true;
  outline = false;
  clouds = false;

  constructor(public WSM: WindowSizeManager) {}

  noise2D = makeNoise2D(Date.now());

  ngAfterViewInit() {
    this.testSketch = (s) => {
      let divWidth;
      let divHeight;
      var ma;
      var zoomFactor = 0.7;
      var offsetX = 100;
      var offsetY = 100;

      var offsetAngleX = 0;

      s.setup = () => {
        divWidth = this.NoiseRef.nativeElement.offsetWidth;
        divHeight = this.NoiseRef.nativeElement.offsetHeight;
        let canvas2 = s.createCanvas(divWidth, divHeight, s.WEBGL);
        canvas2.parent('testCanvas');
        ma = s.asin(1 / 3 ** 0.5);
        s.ortho(
          -s.width * zoomFactor,
          s.width * zoomFactor,
          -s.width * zoomFactor,
          s.width * zoomFactor,
          0,
          10000
        );
      };

      s.draw = () => {
        if (this.outline) {
          s.stroke(0);
        } else {
          s.noStroke();
        }
        s.background(225);
        if (this.lighting) {
          s.directionalLight(255, 255, 255, 1, 1, -1);
          s.directionalLight(255, 255, 255, -1, 1, -1);
        }

        let rotateAng = ma + this.offsetAngle;
        let rotateAngX = 45 + offsetAngleX;

        for (let y = -s.height / 2; y < s.height / 2; y += this.boxSize) {
          for (let x = -s.width / 2; x < s.width / 2; x += this.boxSize) {
            s.push();

            let xT = (x + offsetX) / this.zoom;
            let yT = (y + offsetY) / this.zoom;

            //let h = s.noise(xT,yT) ** 2
            let h =
              s.map(
                this.noise2D(xT, yT) +
                  this.noise2D(xT * 2, yT * 2) / 2 +
                  this.noise2D(xT * 4, yT * 4) / 4,
                -1.75,
                1.75,
                0,
                1
              ) ** 2;

            s.fill('darkblue');
            if (h > 0.1) {
              s.fill('blue');
            }
            if (h > 0.15) {
              s.fill(0, 120, 255);
            }
            if (h > 0.2) {
              s.fill('yellow');
            }
            if (h > 0.25) {
              s.fill(s.color(0, 255 - h * 255 - 30, 0));
            }

            if (h > 0.5) {
              s.fill(h * 255 + 30);
            }

            s.rotateX(rotateAngX);
            s.rotateZ(rotateAng);
            s.translate(0, 0, -100);
            s.translate(x, y, h * 150);

            s.box(this.boxSize, this.boxSize, h * 300);

            //draw Water
            if (h <= 0.2) {
              s.translate(0, 0, -h * 150);

              s.fill(0, 0, 100, 200);
              if (h > 0.1) {
                s.fill(0, 0, 200, 200);
              }
              if (h > 0.15) {
                s.fill(0, 90, 255, 200);
              }

              h = s.max(h, 0.2);
              s.translate(0, 0, h * 150);
              s.box(this.boxSize - 0.01, this.boxSize - 0.01, h * 300);
            }

            //draw Trees
            if (h > 0.33 && h < 0.38) {
              s.fill(150, 75, 0);
              s.translate(0, 0, h * 150 + 7.5);
              s.box(this.boxSize / 8, this.boxSize / 8, 15);
              s.fill('green');
              s.translate(0, 0, 7.5);
              s.box(this.boxSize / 4, this.boxSize / 4, this.boxSize / 4);
            }
            s.pop();

            //draw Clouds

            if (h > 0.6 && this.clouds) {
              s.push();
              s.fill(255, 255, 255, 100);
              s.rotateX(rotateAngX);
              s.rotateZ(rotateAng);
              s.translate(0, 0, -100);
              s.translate(x, y, 300);
              s.box(this.boxSize * 4, this.boxSize * 4, this.boxSize);
              s.pop();
            }
          }
        }

        if (s.mouseIsPressed) {
          if (s.mouseButton === s.RIGHT) {
            let deltaX = s.mouseX - s.pmouseX;
            let deltaY = s.mouseY - s.pmouseY;
            this.offsetAngle -= deltaX / 100;
            offsetAngleX -= deltaY / 100;

            console.log(offsetAngleX);
          } else {
            let deltaX = s.mouseX - s.pmouseX;
            let deltaY = s.mouseY - s.pmouseY;
            let mouseDelta = s.createVector(deltaX, deltaY).rotate(-rotateAng);
            offsetX -= mouseDelta.x;
            offsetY -= mouseDelta.y;
          }
        }
      };

      s.windowResized = () => {
        divWidth = this.NoiseRef.nativeElement.offsetWidth;
        divHeight = this.NoiseRef.nativeElement.offsetHeight;
        s.resizeCanvas(divWidth, divHeight);
      };
    };
    this.canvas = new p5(this.testSketch);
  }

  ngOnDestroy() {
    this.canvas.remove();
  }
}
