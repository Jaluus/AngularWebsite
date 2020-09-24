import { TmplAstBoundAttribute } from '@angular/compiler';
import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';

import * as p5 from 'p5';
import { ThemeManager } from 'src/app/shared/services/themeManager.service';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css'],
})
export class TestpageComponent implements OnInit {
  constructor(private TM: ThemeManager) {}
  canvas: any;
  sw = 1;
  c = [];
  themecolor;
  xoff1 = 0;
  xoff2 = 1;

  ngOnInit() {
    const sketch = (s) => {
      s.setup = () => {
        let canvas2 = s.createCanvas(s.windowWidth - 250, s.windowHeight - 300);
        canvas2.parent('sketch-holder');
      };

      s.draw = () => {
        this.themecolor = this.TM.alt ? '#f44336' : '#1832c5';
        s.background(this.themecolor);
        var x = s.map(s.noise(this.xoff1), 0, 1, 0, s.width);
        var y = s.map(s.noise(this.xoff2), 0, 1, 0, s.height);
        this.xoff1 += 0.02;
        this.xoff2 += 0.02;
        s.ellipse(x, y, 24, 24);

        //Text Stuff
        s.textSize(56);
        s.textAlign(s.CENTER, s.CENTER);
        s.textFont('Roboto');
        s.textStyle(s.BOLD);
        s.text("Jan's Tests", s.width / 2, s.height / 2);
        s.textSize(20);
        s.textStyle(s.NORMAL);
        s.text('A Sandbox Website', s.width / 2, s.height / 2 + 40);
        s.fill(255);
      };
    };

    this.canvas = new p5(sketch);
  }
}
