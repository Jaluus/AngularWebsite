import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ThemeManager } from 'src/app/shared/services/themeManager.service';
import * as p5 from 'p5';
import { ActivatedRoute } from '@angular/router';
import { makeNoise2D, makeNoise3D } from 'open-simplex-noise';

@Component({
  selector: 'app-mainhader-p5',
  templateUrl: './mainhader-p5.component.html',
  styleUrls: ['./mainhader-p5.component.css'],
})
export class MainhaderP5Component implements AfterViewInit, OnDestroy {
  @Input() heading = 'heading';
  @Input() subheading = 'subheading';
  @ViewChild('Banner') myBanner: ElementRef;
  mainHeader: any;
  headerSketch: any;
  themecolor;
  inc = 0.015;
  startx = 0;
  starty = 0;
  startz = 0;
  fade = 0;
  noise3D = makeNoise3D(Date.now());

  constructor(private route: ActivatedRoute, private TM: ThemeManager) {}

  //this.route.params.subscribe((val) => {

  ngAfterViewInit() {
    let divWidth = this.myBanner.nativeElement.offsetWidth;
    let divHeight = this.myBanner.nativeElement.offsetHeight;

    if (Math.random() < 0.5) {
      this.headerSketch = (s) => {
        let step = 2;
        let factor = 0.02;
        let strings = ['+', '-', '=', '*', '#', '_', '|', '°', '<', '■'];

        s.setup = () => {
          let canvas2 = s.createCanvas(divWidth, divHeight);
          canvas2.parent('mainBanner');
        };

        s.draw = () => {
          //blue #1832c5
          //indigo  '#3f51b5'
          this.themecolor = this.TM.alt ? '#f44336' : '#1832c5';

          if (this.TM.alt) {
            s.stroke(51);
            s.fill(51);
          } else {
            s.stroke(180);
            s.fill(215);
          }

          s.background(this.themecolor);

          for (let y = 1; y * (step + 10) < divHeight; y++) {
            for (let x = 0; x * (step + 10) < divWidth; x++) {
              let n = this.noise3D(
                (x - s.mouseX / 100) * factor,
                (y - s.mouseY / 100) * factor,
                s.frameCount * 0.005
              );
              n = n - s.int(n);
              let i = s.floor(s.map(s.cos(n) * s.sin(n), -0.5, 0.8, 0, 10));

              s.textSize(step + 5);
              s.text(strings[i], x * (step + 10), y * (step + 10));
            }
          }

          let deltaMouse = s
            .createVector(s.pmouseX - s.mouseX, s.pmouseY - s.mouseY)
            .normalize();

          this.startx -= deltaMouse.x / 100;
          this.starty += deltaMouse.y / 100;
          this.startz += 0.001;

          //Text Stuff
          s.push();
          s.noStroke();
          s.fill(255, this.fade);
          s.textSize(56);
          s.textAlign(s.CENTER, s.CENTER);
          s.textFont('Roboto');
          s.textStyle(s.BOLD);
          s.text(
            this.heading,
            s.width / 2,
            s.height / 2 + s.min(0, s.millis() / 4 - 20)
          );
          s.fill(255, this.fade - 255);
          s.textSize(20);
          s.textStyle(s.NORMAL);
          s.text(this.subheading, s.width / 2, s.height / 2 + 40);

          this.fade = s.millis() / 3;
          s.pop();
        };

        s.windowResized = () => {
          divWidth = this.myBanner.nativeElement.offsetWidth;
          divHeight = this.myBanner.nativeElement.offsetHeight;
          s.resizeCanvas(divWidth, divHeight);
        };
      };
    } else {
      this.headerSketch = (s) => {
        s.setup = () => {
          let canvas2 = s.createCanvas(divWidth, divHeight);
          canvas2.parent('mainBanner');
        };

        s.draw = () => {
          //blue #1832c5
          //indigo  '#3f51b5'
          this.themecolor = this.TM.alt ? '#f44336' : '#1832c5';

          if (this.TM.alt) {
            s.stroke(51);
          } else {
            s.stroke(180);
          }

          s.background(this.themecolor);
          s.noFill();

          for (let line = -10; line <= 10; line++) {
            s.beginShape();
            var xoff = this.startx;
            var yoff = this.starty;
            for (let x = 0; x <= divWidth; x += 4) {
              // var y =
              //   s.noise(xoff + line * 0.06, yoff + line * 0.03, this.startz) *
              //   divHeight; //this.startz + line * 0.04
              var y =
                ((this.noise3D(
                  xoff + line * 0.06,
                  yoff + line * 0.03,
                  this.startz + line * 0.04
                ) +
                  1) /
                  2) *
                divHeight;
              s.vertex(x, y + line * 7);
              xoff += this.inc * 4;
            }
            s.endShape();
          }

          let deltaMouse = s
            .createVector(s.pmouseX - s.mouseX, s.pmouseY - s.mouseY)
            .normalize();

          this.startx -= deltaMouse.x / 100;
          this.starty += deltaMouse.y / 100;
          this.startz += 0.001;

          //Text Stuff
          s.noStroke();
          s.fill(255, this.fade);
          s.textSize(56);
          s.textAlign(s.CENTER, s.CENTER);
          s.textFont('Roboto');
          s.textStyle(s.BOLD);
          s.text(
            this.heading,
            s.width / 2,
            s.height / 2 + s.min(0, s.millis() / 4 - 20)
          );
          s.fill(255, this.fade - 255);
          s.textSize(20);
          s.textStyle(s.NORMAL);
          s.text(this.subheading, s.width / 2, s.height / 2 + 40);

          this.fade = s.millis() / 3;
        };

        s.mouseWheel = (event) => {
          this.startz += event.delta / 5000;
        };

        s.windowResized = () => {
          divWidth = this.myBanner.nativeElement.offsetWidth;
          divHeight = this.myBanner.nativeElement.offsetHeight;
          s.resizeCanvas(divWidth, divHeight);
        };
      };
    }

    this.mainHeader = new p5(this.headerSketch);
  }
  ngOnDestroy() {
    this.mainHeader.remove();
  }
}
