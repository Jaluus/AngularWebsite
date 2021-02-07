import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';
import * as p5 from 'p5';

@Component({
  selector: 'app-black-white',
  templateUrl: './black-white.component.html',
  styleUrls: ['./black-white.component.css'],
})
export class BlackWhiteComponent implements AfterViewInit, OnDestroy {
  @ViewChild('BWRef') BWref: ElementRef;

  canvas: any;
  BW: any;
  constructor(public WSM: WindowSizeManager) {}

  ngAfterViewInit() {
    this.BW = (s) => {
      let divWidth;
      let divHeight;

      s.setup = () => {
        divWidth = this.BWref.nativeElement.offsetWidth;
        divHeight = this.BWref.nativeElement.offsetHeight;
        let canvas2 = s.createCanvas(divWidth, divHeight);
        canvas2.parent('BWID');
        s.background(51);
        s.pixelDensity(1);
      };

      s.draw = () => {};

      s.windowResized = () => {
        divWidth = this.BWref.nativeElement.offsetWidth;
        divHeight = this.BWref.nativeElement.offsetHeight;
        s.resizeCanvas(divWidth, divHeight);
      };
    };
    this.canvas = new p5(this.BW);
  }

  ngOnDestroy() {
    this.canvas.remove();
  }
}
