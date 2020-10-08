import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ThemeManager } from 'src/app/shared/services/themeManager.service';
import * as p5 from 'p5';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mainheader-colorful',
  templateUrl: './mainheader-colorful.component.html',
  styleUrls: ['./mainheader-colorful.component.css'],
})
export class MainheaderColorfulComponent
  implements OnDestroy, AfterViewInit, OnInit {
  @Input() heading = 'heading';
  @Input() subheading = 'subheading';
  @ViewChild('Banner') myBanner: ElementRef;
  canvas: any;
  themecolor;
  inc = 0.001;
  start = 0;
  fade = 0;
  textstart = 10;
  subs;

  constructor(private route: ActivatedRoute, private TM: ThemeManager) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.route.params.subscribe((val) => {
      let divWidth = this.myBanner.nativeElement.offsetWidth;
      let divHeight = this.myBanner.nativeElement.offsetHeight;
      const sketch2 = (s) => {
        s.setup = () => {
          var r = 24;
          var g = 50;
          var b = 197;
          if (this.TM.alt) {
            r = 244;
            g = 67;
            b = 54;
          }

          let canvas2 = s.createCanvas(divWidth, divHeight);
          canvas2.parent('sketch-holder');
          var pd = s.pixelDensity(); //high res scaling
          //s.pixelDensity(1);
          s.loadPixels();
          var salt = s.millis();
          var yoff = 0;
          for (let y = 0; y < divHeight * pd; y++) {
            var xoff = 0;
            for (let x = 0; x < divWidth * pd; x++) {
              var idx = (x + y * divWidth * pd) * 4;

              var noise = s.noise(xoff, yoff, salt); //Noisemap

              var noise2 = (s.noise(noise) - 0.5) * 75;
              var noise3 = (s.noise(noise2) - 0.5) * 75;
              var noise4 = (s.noise(noise3) - 0.5) * 75;

              s.pixels[idx + 0] = r + noise2; //noise;
              s.pixels[idx + 1] = g + noise3;
              s.pixels[idx + 2] = b + noise4;
              s.pixels[idx + 3] = 255;
              xoff += this.inc;
            }
            yoff += this.inc;
          }
          s.updatePixels();
        };

        s.draw = () => {
          s.updatePixels();

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
            this.fade += 5;
          } else {
            s.noLoop();
          }
          if (this.textstart > 0) {
            this.textstart -= 0.5;
          }
        };

        s.windowResized = () => {
          divWidth = this.myBanner.nativeElement.offsetWidth;
          divHeight = this.myBanner.nativeElement.offsetHeight;
          s.resizeCanvas(divWidth, divHeight);
          s.setup();
          s.draw();
        };
      };
      this.canvas = new p5(sketch2);
    });

    this.subs = this.TM.changed.subscribe((val) => {
      this.canvas.windowResized();
    });
  }
  ngOnDestroy() {
    this.canvas.remove();
    this.subs.unsubscribe();
  }
}
