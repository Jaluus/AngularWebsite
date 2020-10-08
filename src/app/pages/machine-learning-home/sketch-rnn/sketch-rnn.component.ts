import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import * as p5 from 'p5';
import * as ml5 from 'ml5';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';
//https://www.npmjs.com/package/line-simplify-rdp

@Component({
  selector: 'app-sketch-rnn',
  templateUrl: './sketch-rnn.component.html',
  styleUrls: ['./sketch-rnn.component.css'],
})
export class SketchRnnComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sketchRNNref') RNNRef: ElementRef;

  canvas: any;
  MlSketch: any;

  //sketch RNN
  sketchRNN;
  currentStroke;
  activeModel = 'cat';
  seedPoints = [];
  personDrawing = false;
  personFinished = false;
  startX;
  startY;
  modelReady = false;

  models = [
    'ant',
    'ambulance',
    'angel',
    'alarm_clock',
    'antyoga',
    'backpack',
    'barn',
    'basket',
    'bear',
    'bee',
    'beeflower',
    'bicycle',
    'bird',
    'book',
    'brain',
    'bridge',
    'bulldozer',
    'bus',
    'butterfly',
    'cactus',
    'calendar',
    'castle',
    'cat',
    'catbus',
    'catpig',
    'chair',
    'couch',
    'crab',
    'crabchair',
    'crabrabbitfacepig',
    'cruise_ship',
    'diving_board',
    'dog',
    'dogbunny',
    'dolphin',
    'duck',
    'elephant',
    'elephantpig',
    'everything',
    'eye',
    'face',
    'fan',
    'fire_hydrant',
    'firetruck',
    'flamingo',
    'flower',
    'floweryoga',
    'frog',
    'frogsofa',
    'garden',
    'hand',
    'hedgeberry',
    'hedgehog',
    'helicopter',
    'kangaroo',
    'key',
    'lantern',
    'lighthouse',
    'lion',
    'lionsheep',
    'lobster',
    'map',
    'mermaid',
    'monapassport',
    'monkey',
    'mosquito',
    'octopus',
    'owl',
    'paintbrush',
    'palm_tree',
    'parrot',
    'passport',
    'peas',
    'penguin',
    'pig',
    'pigsheep',
    'pineapple',
    'pool',
    'postcard',
    'power_outlet',
    'rabbit',
    'rabbitturtle',
    'radio',
    'radioface',
    'rain',
    'rhinoceros',
    'rifle',
    'roller_coaster',
    'sandwich',
    'scorpion',
    'sea_turtle',
    'sheep',
    'skull',
    'snail',
    'snowflake',
    'speedboat',
    'spider',
    'squirrel',
    'steak',
    'stove',
    'strawberry',
    'swan',
    'swing_set',
    'the_mona_lisa',
    'tiger',
    'toothbrush',
    'toothpaste',
    'tractor',
    'trombone',
    'truck',
    'whale',
    'windmill',
    'yoga',
    'yogabicycle',
  ];

  constructor(public WSM: WindowSizeManager) {}

  ngAfterViewInit() {
    this.MlSketch = (s) => {
      let divWidth;
      let divHeight;
      let x;
      let y;
      let nextPen = 'down';
      let canvas2;
      s.preload = () => {
        this.modelReady = false;
        console.log('Loading Model...');
        this.sketchRNN = ml5.sketchRNN(this.activeModel, s.modelReady);
        console.log('Loaded Model');
      };
      s.setup = () => {
        divWidth = this.RNNRef.nativeElement.offsetWidth;
        divHeight = this.RNNRef.nativeElement.offsetHeight;
        canvas2 = s.createCanvas(divWidth, divHeight);
        canvas2.parent('NoiseHolder');
        canvas2.mousePressed(s.startDrawing);
        canvas2.mouseReleased(s.sketchRNNStart);
        s.stroke(0);
        s.strokeWeight(4);
        s.background(225);
        //resetting vars
        this.sketchRNN.reset();
        this.currentStroke = null;
        nextPen = 'down';
        this.seedPoints = [];
        this.personDrawing = false;
        this.personFinished = false;
      };

      s.modelReady = () => {
        this.modelReady = true;
        s.setup();
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
        if (this.modelReady) {
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
              s.line(
                x,
                y,
                x + this.currentStroke.dx,
                y + this.currentStroke.dy
              );
            }
            x = x + this.currentStroke.dx;
            y = y + this.currentStroke.dy;
            nextPen = this.currentStroke.pen;
            this.currentStroke = null;
            this.sketchRNN.generate(s.gotStrokePath);
          }
        }
      };

      s.windowResized = () => {
        divWidth = this.RNNRef.nativeElement.offsetWidth;
        divHeight = this.RNNRef.nativeElement.offsetHeight;
        s.resizeCanvas(divWidth, divHeight);
      };
    };
    this.canvas = new p5(this.MlSketch);
  }

  swapModel() {
    console.log('swapping');
    this.canvas.preload();
    this.canvas.setup();
  }

  restartRNN() {
    this.canvas.sketchRNNStart();
  }
  newDrawing() {
    this.canvas.setup();
  }

  redraw() {
    this.canvas.draw();
  }

  ngOnDestroy() {
    this.canvas.remove();
  }
}
