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
  textstart = 10;
  animationSpeed = 2;
  noise3D = makeNoise3D(Date.now());

  constructor(private route: ActivatedRoute, private TM: ThemeManager) {}

  ngAfterViewInit() {
    this.route.params.subscribe((val) => {
      let divWidth = this.myBanner.nativeElement.offsetWidth;
      let divHeight = this.myBanner.nativeElement.offsetHeight;
      this.headerSketch = (s) => {
        s.setup = () => {
          let canvas2 = s.createCanvas(divWidth, divHeight);
          canvas2.parent('mainBanner');
        };

        s.draw = () => {
          //blue #1832c5
          //indigo  '#3f51b5'
          this.themecolor = this.TM.alt ? '#f44336' : '#1832c5';
          s.background(this.themecolor);

          s.stroke(180);
          s.noFill();

          for (let line = -10; line <= 10; line++) {
            s.beginShape();
            var xoff = this.startx;
            var yoff = this.starty;
            for (let x = 0; x < divWidth; x++) {
              // var y =
              //   s.noise(xoff + line * 0.06, yoff + line * 0.03, this.startz) *
              //   divHeight;
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
              xoff += this.inc;
            }
            s.endShape();
          }

          this.startx = s.mouseX / 2000;
          this.starty = s.mouseY / 2000;

          //Text Stuff
          s.noStroke();
          s.fill(255, this.fade);
          s.textSize(56);
          s.textAlign(s.CENTER, s.CENTER);
          s.textFont('Roboto');
          s.textStyle(s.BOLD);
          s.text(this.heading, s.width / 2, s.height / 2 + this.textstart);
          s.fill(255, this.fade - 255);
          s.textSize(20);
          s.textStyle(s.NORMAL);
          s.text(
            this.subheading,
            s.width / 2,
            s.height / 2 + 40 + this.textstart
          );
          if (this.fade < 600) {
            this.fade += 5 * this.animationSpeed;
          }
          if (this.textstart > 0) {
            this.textstart -= 0.5 * this.animationSpeed;
          }
        };

        s.mouseWheel = (event) => {
          this.startz += event.delta / 2000;
        };

        s.windowResized = () => {
          divWidth = this.myBanner.nativeElement.offsetWidth;
          divHeight = this.myBanner.nativeElement.offsetHeight;
          s.resizeCanvas(divWidth, divHeight);
        };
      };
      this.mainHeader = new p5(this.headerSketch);
    });
  }
  ngOnDestroy() {
    this.mainHeader.remove();
  }
}
