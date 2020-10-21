import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import * as p5 from 'p5';
import * as Matter from 'matter-js';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';

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
  dt = 1
  limitVel = 5


  constructor(public WSM : WindowSizeManager) {}

  ngAfterViewInit() {
    this.geneticSketch = (s) => {
      let divWidth;
      let divHeight;

      var Engine = Matter.Engine;
      var Bodies = Matter.Bodies;
      var World = Matter.World;

      var engine;
      var world;
      var box1;

      s.setup = () => {
        divWidth = this.NoiseRef.nativeElement.offsetWidth;
        divHeight = this.NoiseRef.nativeElement.offsetHeight;
        let canvas2 = s.createCanvas(divWidth, divHeight);
        canvas2.parent('geneticCanvas');

        engine = Engine.create()
        world = engine.world
        box1 = Bodies.rectangle(400,200,80,80)

        Engine.run(engine)
        World.add(world,[box1])
      };

      s.draw = () => {
        s.background(51);
        s.fill(255)
        s.rect(box1.position.x,box1.position.y,80,80)
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
