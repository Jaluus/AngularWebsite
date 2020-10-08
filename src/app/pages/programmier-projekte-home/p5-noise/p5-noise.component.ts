import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import * as p5 from 'p5';
import { ThemeManager } from 'src/app/shared/services/themeManager.service';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';
import { makeNoise2D, makeNoise3D } from 'open-simplex-noise';

@Component({
  selector: 'app-p5-noise',
  templateUrl: './p5-noise.component.html',
  styleUrls: ['./p5-noise.component.css'],
})
export class P5NoiseComponent implements OnDestroy, AfterViewInit {
  //references
  @ViewChild('Banner') myBanner: ElementRef;
  @ViewChild('DancingTrianglesRef') DancingTriangles: ElementRef;
  @ViewChild('CanvasRef2') NoiseRef: ElementRef;

  //Imporant
  canvas: any;
  themecolor;
  selectedTabIndex = 0;

  //Simplex
  NoiseSpeed = 0.04;
  scale = 10;
  NoiseZ = 0;

  //Dancing Triangles
  cohesion = 1;
  points = 5;
  speed = 0.01;
  closedEnds = false;
  neighbor = true;

  //Map generator
  selectedNoise = 'perlin';
  inc = 0.01;
  start = 0;
  seed = 0;

  //sketches
  DancingTrianglesSketch;
  NoiseSketch;
  MapGenerator;

  //etc
  noise2D = makeNoise2D(Date.now());
  noise3D = makeNoise3D(Date.now());
  constructor(private TM: ThemeManager, public WSM: WindowSizeManager) {}

  ngAfterViewInit() {
    this.DancingTrianglesSketch = (s) => {
      let divWidth = 200;
      let divHeight = 200;
      let pointArr = [];
      let pause = false;
      s.setup = () => {
        divWidth = this.DancingTriangles.nativeElement.offsetWidth;
        divHeight = this.DancingTriangles.nativeElement.offsetHeight;
        let canvas2 = s.createCanvas(divWidth, divHeight);
        canvas2.parent('DancingTriangles');
        //s.noSmooth();
      };

      s.draw = () => {
        pointArr = [];
        s.background(51);
        s.stroke(225);
        s.noFill();
        for (let point = 0; point < this.points; point++) {
          let x;
          let y;
          // let x =
          //   ((this.noise2D(point / this.cohesion, this.start) + 1) / 2) *
          //   divWidth;
          // let y =
          //   ((this.noise2D(this.start, point / this.cohesion) + 1) / 2) *
          //   divHeight;
          if (this.closedEnds) {
            x =
              ((this.noise2D(
                Math.sin((point / this.points) * 2 * Math.PI) / this.cohesion,
                this.start
              ) +
                1) /
                2) *
              divWidth;
            y =
              ((this.noise2D(
                Math.cos((point / this.points) * 2 * Math.PI) / this.cohesion,
                this.start
              ) +
                1) /
                2) *
              divHeight;
          } else {
            x =
              ((this.noise2D(point / this.cohesion, this.start) + 1) / 2) *
              divWidth;
            y =
              ((this.noise2D(this.start, point / this.cohesion) + 1) / 2) *
              divHeight;
          }

          pointArr.push([x, y]);

          s.ellipse(x, y, 20);
        }

        //s.beginShape();
        if (this.neighbor) {
          for (let xy of pointArr) {
            s.beginShape();
            let closexy = s.getClosestPoints(xy, pointArr);
            s.vertex(xy[0], xy[1]);
            s.vertex(closexy[0][0], closexy[0][1]);
            s.vertex(xy[0], xy[1]);
            s.vertex(closexy[1][0], closexy[1][1]);
            s.endShape();
          }
        }
        this.start += this.speed;
        //s.endShape(s.CLOSE);
        //console.log(this.start);
        //s.noLoop();
      };

      s.togglePause = () => {
        if (pause) {
          s.noLoop();
        } else {
          s.loop();
        }
        pause = !pause;
      };

      s.getClosestPoints = (xy, pointArr) => {
        let closeArr = [
          [0, 0],
          [0, 0],
        ];
        let mindist = 9999999999999999999999999999999999;
        let mindist2 = 9999999999999999999999999999999999;
        for (let i = 0; i < pointArr.length; i++) {
          let x = pointArr[i][0];
          let y = pointArr[i][1];
          let xdist = x - xy[0];
          let ydist = y - xy[1];
          let dist = (xdist ** 2 + ydist ** 2) ** 0.5;
          if (dist === 0) {
            continue;
          }
          if (dist < mindist) {
            closeArr[1] = closeArr[0];
            mindist2 = mindist;

            closeArr[0] = [x, y];
            mindist = dist;
          } else if (dist < mindist2) {
            closeArr[1] = [x, y];
            mindist2 = dist;
          }
        }
        return closeArr;
      };

      s.windowResized = () => {
        divWidth = this.DancingTriangles.nativeElement.offsetWidth;
        divHeight = this.DancingTriangles.nativeElement.offsetHeight;
        s.resizeCanvas(divWidth, divHeight);
      };
    };
    this.NoiseSketch = (s) => {
      let divWidth;
      let divHeight;
      let pd;
      s.setup = () => {
        divWidth = this.NoiseRef.nativeElement.offsetWidth;
        divHeight = this.NoiseRef.nativeElement.offsetHeight;
        let canvas2 = s.createCanvas(divWidth, divHeight);
        canvas2.parent('NoiseHolder');
        s.pixelDensity(0.5);
        pd = s.pixelDensity();
      };

      s.draw = () => {
        s.loadPixels();
        var yoff = this.start;
        for (let y = 0; y < divHeight * pd; y++) {
          var xoff = this.start;
          for (let x = 0; x < divWidth * pd; x++) {
            var idx = (x + y * divWidth * pd) * 4;

            var map =
              (this.noise3D(xoff * this.scale, yoff * this.scale, this.NoiseZ) +
                1) /
                2 +
              (this.noise3D(
                xoff * 2 * this.scale,
                yoff * 2 * this.scale,
                this.NoiseZ
              ) +
                1) /
                4 +
              (this.noise3D(
                xoff * 4 * this.scale,
                yoff * 4 * this.scale,
                this.NoiseZ
              ) +
                1) /
                8;
            //var map = s.noise(xoff, yoff, this.seed);

            // var noise1 = Math.sin(map * this.scale) + 1;
            // var noise2 = Math.cos(map * this.scale) + 1;
            // var noise3 = noise2 + noise1;

            var noise1 = this.noise3D(map, map, this.NoiseZ) + 1;
            var noise2 = this.noise3D(noise1, noise1, this.NoiseZ) + 1;
            var noise3 = this.noise3D(noise2, noise2, this.NoiseZ) + 1;

            s.pixels[idx + 0] = (noise1 / 2) * 255;
            s.pixels[idx + 1] = (noise2 / 2) * 255;
            s.pixels[idx + 2] = (noise3 / 2) * 255;
            s.pixels[idx + 3] = 255;
            xoff += this.inc;
          }
          yoff += this.inc;
        }
        this.NoiseZ += this.NoiseSpeed;
        s.updatePixels();
        //s.noLoop();
      };

      s.windowResized = () => {
        divWidth = this.NoiseRef.nativeElement.offsetWidth;
        divHeight = this.NoiseRef.nativeElement.offsetHeight;
        s.resizeCanvas(divWidth, divHeight);
      };
    };
    this.MapGenerator = (s) => {
      var divWidth;
      var divHeight;
      let pd;
      s.setup = () => {
        divWidth = this.myBanner.nativeElement.offsetWidth;
        divHeight = this.myBanner.nativeElement.offsetHeight;
        let canvas2 = s.createCanvas(divWidth, divHeight);
        canvas2.parent('sketch-holder');
        s.pixelDensity(1);
        pd = s.pixelDensity();
      };

      s.draw = () => {
        s.loadPixels();
        var yoff = this.start;
        for (let y = 0; y < divHeight * pd; y++) {
          var xoff = this.start;
          for (let x = 0; x < divWidth * pd; x++) {
            var idx = (x + y * divWidth * pd) * 4;

            if (this.selectedNoise == 'simplex') {
              var noise = ((this.noise3D(xoff, yoff, this.seed) + 1) / 2) * 255;

              var noise1 = ((this.noise2D(noise, this.seed) + 1) / 2) * 255;
              var noise2 =
                ((this.noise2D(noise1 / 100, this.seed) + 1) / 2) * 255;
              var noise3 =
                ((this.noise2D(noise2 / 100, this.seed) + 1) / 2) * 255;
            } else {
              var noise1 = s.noise(xoff, yoff, this.seed) * 255;

              var noise2 = s.noise(noise1) * 255;
              var noise3 = s.noise(noise2 / 10) * 255;
            }

            s.pixels[idx + 0] = noise1;
            s.pixels[idx + 1] = noise2;
            s.pixels[idx + 2] = noise3;
            s.pixels[idx + 3] = 255;
            xoff += this.inc;
          }
          yoff += this.inc;
        }
        //this.seed += this.inc;
        s.updatePixels();
        s.noLoop();
      };

      s.windowResized = () => {
        divWidth = this.myBanner.nativeElement.offsetWidth;
        divHeight = this.myBanner.nativeElement.offsetHeight;
        s.resizeCanvas(divWidth, divHeight);
      };
    };

    this.canvas = new p5(this.MapGenerator);
  }

  redraw() {
    this.canvas.draw();
  }
  randomRedraw() {
    this.inc = Math.round(Math.random() * 100) / 10000;
    this.seed = Math.round(Math.random() * 100);
    this.start = Math.round(Math.random() * 100);
    this.canvas.draw();
  }

  changeCanvas(event) {
    this.selectedTabIndex = event['index'];
    this.canvas.remove();
    switch (this.selectedTabIndex) {
      case 0:
        this.canvas = new p5(this.MapGenerator);
        break;
      case 1:
        this.canvas = new p5(this.DancingTrianglesSketch);
        break;
      case 2:
        this.canvas = new p5(this.NoiseSketch);
        break;
    }
  }

  ngOnDestroy() {
    this.canvas.remove();
  }
}
