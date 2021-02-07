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
  selector: 'app-hunter-prey',
  templateUrl: './hunter-prey.component.html',
  styleUrls: ['./hunter-prey.component.css'],
})
export class HunterPreyComponent implements AfterViewInit, OnDestroy {
  @ViewChild('EcoRef') ecoRef: ElementRef;

  canvas: any;
  EcoSketch: any;

  mr = 0.4;
  fnut = 0.3;
  vnut = 1;
  pnut = -0.5;

  maxFood = 100;
  maxPoision = 50;
  numV = 40;
  numH = 4;

  VreproductionRate = 0.003;
  HreproductionRate = 0.003;

  dropFoodOnDeath = false;
  showBest = false;
  SpeedDecay = true;

  debug = false;
  hunterDebug = false;

  Values: any = null;

  constructor(public WSM: WindowSizeManager) {}

  ngAfterViewInit() {
    this.EcoSketch = (s) => {
      let divWidth;
      let divHeight;

      //Sim Params
      let mr = 0.4; //Mutation Rate
      let fnut = 0.3; //food Nutrition
      let vnut = 1; //Vehicle Nutrition
      let pnut = -5;

      let maxFood = 50;
      let maxPoision = 200;
      let numV = 30;
      let numH = 4;

      let dropFoodOnDeath = false;
      let showBest = false;

      let VHealthDecay = 2000;
      let HHealthDecay = 2000;

      let VreproductionRate = 0.002;
      let HreproductionRate = 0.002;

      let SpeedDecay = false;
      let ReproductionOnFood = false;

      //Contiuus Params
      s.vehicles = [];
      s.hunters = [];
      s.food = [];
      s.poison = [];

      s.meanDNA = [];
      s.popSize = [];

      s.meanHunterDNA = [];
      s.hunterPopSize = [];

      s.bestVehicle;
      s.selectedVehicle;

      s.time = 0;
      s.sampleTime = 100;

      //etc
      let debug = false;
      let hunterDebug = false;
      let MouseDown = false;

      s.setup = () => {
        divWidth = this.ecoRef.nativeElement.offsetWidth;
        divHeight = this.ecoRef.nativeElement.offsetHeight;
        let canvas2 = s.createCanvas(divWidth, divHeight);
        canvas2.parent('EcoSys');
        s.background(51);
        //s.pixelDensity(1);

        mr = this.mr;
        fnut = this.fnut;
        vnut = this.vnut;
        pnut = this.pnut;

        maxFood = this.maxFood;
        maxPoision = this.maxPoision;
        numV = this.numV;
        numH = this.numH;

        dropFoodOnDeath = this.dropFoodOnDeath;
        showBest = this.showBest;
        SpeedDecay = this.SpeedDecay;

        HreproductionRate = this.HreproductionRate;
        VreproductionRate = this.VreproductionRate;

        debug = this.debug;
        hunterDebug = this.hunterDebug;

        //Populate the Simulation
        for (var i = 0; i < numV; i++) {
          var vehicle = new Vehicle(s.random(s.width), s.random(s.height));
          s.vehicles.push(vehicle);
        }

        for (var i = 0; i < numH; i++) {
          var hunter = new Hunter(s.random(s.width), s.random(s.height));
          s.hunters.push(hunter);
        }

        for (var i = 0; i < maxFood; i++) {
          s.food.push(s.createVector(s.random(s.width), s.random(s.height)));
        }

        for (var i = 0; i < maxPoision; i++) {
          s.poison.push(s.createVector(s.random(s.width), s.random(s.height)));
        }
      };

      // s.mousePressed = () => {
      //   MouseDown = true;
      // };

      // s.mouseReleased = () => {
      //   MouseDown = false;
      // };

      s.mouseReleased = () => {
        var record = Infinity;
        var closestIndex = -1;

        var posMouse = s.createVector(s.mouseX, s.mouseY);

        if (
          posMouse.x > s.width ||
          posMouse.x < 0 ||
          posMouse.y > s.height ||
          posMouse.y < 0
        ) {
          return;
        }

        for (var i = s.vehicles.length - 1; i >= 0; i--) {
          var d = 0;
          d = posMouse.dist(s.vehicles[i].pos);
          if (d < record) {
            record = d;
            closestIndex = i;
          }
        }

        if (s.vehicles[closestIndex]) {
          s.selectedVehicle = s.vehicles[closestIndex];
        }

        console.log(s.selectedVehicle);
      };

      s.draw = () => {
        s.background(51);

        s.time += 1;
        let maxLife = 0;
        s.bestVehicle = null;

        for (var i = s.vehicles.length - 1; i >= 0; i--) {
          var v = s.vehicles[i];
          v.boundaries();
          v.behaviors(s.food, s.hunters, s.poison); //FIX THIS; HERE HAS TO BE THE HUNTERS
          v.update();
          v.show();

          if (v.lifetime > maxLife) {
            s.bestVehicle = v;
          }
          if (v.dead()) {
            if (dropFoodOnDeath) {
              s.food.push(s.createVector(v.pos.x, v.pos.y));
            }
            s.vehicles.splice(i, 1);
            continue;
          }

          var newVehicle = v.clone();

          if (newVehicle) {
            s.vehicles.push(newVehicle);
          }
        }

        for (var i = s.hunters.length - 1; i >= 0; i--) {
          var h = s.hunters[i];
          h.boundaries();
          h.behaviors(s.vehicles, s.poison);
          h.update();
          h.show();

          // if (h.lifetime > maxLife) {
          //   bestVehicle = h;
          // }
          if (h.dead()) {
            if (dropFoodOnDeath) {
              s.food.push(s.createVector(h.pos.x, h.pos.y));
            }
            s.hunters.splice(i, 1);
            continue;
          }

          var newHunter = h.clone();

          if (newHunter) {
            s.hunters.push(newHunter);
          }
        }

        if (s.poison.length < maxPoision) {
          // maybe add random?=
          s.poison.push(s.createVector(s.random(s.width), s.random(s.height)));
        }

        //create New Food
        if (s.food.length < maxFood) {
          s.food.push(s.createVector(s.random(s.width), s.random(s.height)));
        }

        for (var i = 0; i < s.food.length; i++) {
          var foodpt = s.food[i];
          s.push();
          s.fill(0, 255, 0);
          s.ellipse(foodpt.x, foodpt.y, 4);
          s.pop();
        }

        for (var i = 0; i < s.poison.length; i++) {
          var poisonpt = s.poison[i];
          s.push();
          s.fill(255, 0, 0);
          s.ellipse(poisonpt.x, poisonpt.y, 4);
          s.pop();
        }

        if (s.bestVehicle && showBest) {
          s.push();
          s.fill(0, 0, 255, 100);
          s.ellipse(s.bestVehicle.pos.x, s.bestVehicle.pos.y, 20);
          s.pop();
        }

        if (s.selectedVehicle && !s.selectedVehicle.dead()) {
          s.push();
          s.fill(0, 0, 255, 100);
          s.ellipse(s.selectedVehicle.pos.x, s.selectedVehicle.pos.y, 20);
          s.pop();
        }

        if (s.time % s.sampleTime == 1) {
          //collection Hunter DNA
          let collectedDNA = [0, 0, 0, 0, 0, 0];
          for (let i = 0; i < s.vehicles.length; i++) {
            let v = s.vehicles[i];
            for (let j = 0; j < v.dna.length; j++) {
              collectedDNA[j] += v.dna[j] / s.vehicles.length;
            }
          }
          s.meanDNA.push(collectedDNA);
          s.popSize.push(s.vehicles.length);

          //collection Hunter DNA
          collectedDNA = [0, 0, 0];
          for (let i = 0; i < s.hunters.length; i++) {
            let h = s.hunters[i];
            for (let j = 1; j < h.dna.length; j++) {
              collectedDNA[j - 1] += h.dna[j] / s.hunters.length;
            }
          }
          s.meanHunterDNA.push(collectedDNA);
          s.hunterPopSize.push(s.hunters.length);
        }
      };

      function Vehicle(x, y, givenDNA = undefined, ancestors = 0, health = 1) {
        this.pos = s.createVector(x, y);
        //this.target = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = s.createVector();

        this.health = s.min(health, 1);
        this.pickupRange = 4;

        this.overFeed = 0;

        //stats
        this.ancestors = ancestors;
        this.numChildren = 0;
        this.lifetime = 0;
        this.eatenFood = 0;

        this.currentTarget = null;

        this.dna = [];
        if (givenDNA == undefined) {
          this.dna[0] = s.random(0, 2); //food weight
          this.dna[1] = s.random(-2, 0); //hunter Weight
          this.dna[2] = s.random(40, 100); //food vision distance
          this.dna[3] = s.random(40, 100); //hunter vision distance
          this.dna[4] = s.random(0.2, 0.4); //turnForce
          this.dna[5] = s.random(1.5, 3.5); //maxSpeed
          this.dna[6] = s.random(40, 100); //Posion vision distance
          this.dna[7] = s.random(-2, 0); //Posion Weight
        } else {
          this.dna = givenDNA.slice();
          this.mutate();
        }
      }

      Vehicle.prototype.mutate = function () {
        if (s.random(1) < mr) {
          this.dna[0] += s.random(-0.1, 0.1);
        }

        if (s.random(1) < mr) {
          this.dna[1] += s.random(-0.1, 0.1);
        }

        if (s.random(1) < mr) {
          this.dna[2] += s.random(-10, 10);
          if (this.dna[2] < 10) {
            this.dna[2] = 10;
          }
        }

        if (s.random(1) < mr) {
          this.dna[3] += s.random(-10, 10);
          if (this.dna[3] < 10) {
            this.dna[3] = 10;
          }
        }

        if (s.random(1) < mr) {
          this.dna[4] += s.random(-0.05, 0.05);
        }

        if (s.random(1) < mr) {
          this.dna[5] += s.random(-0.5, 0.5);
          if (this.dna[5] < 0.1) {
            this.dna[5] = 0.1;
          }
        }

        if (s.random(1) < mr) {
          this.dna[6] += s.random(-10, 10);
          if (this.dna[6] < 10) {
            this.dna[6] = 10;
          }
        }

        if (s.random(1) < mr) {
          this.dna[7] += s.random(-0.1, 0.1);
        }
      };

      Vehicle.prototype.update = function () {
        let decay = SpeedDecay ? this.dna[5] : 1;

        this.health -= decay / VHealthDecay + 0.001; //Heath Decay this.dna[5]
        this.lifetime += 1;

        this.acc.normalize().mult(this.dna[4]);
        this.vel.add(this.acc);
        this.vel.normalize().mult(this.dna[5]);
        this.pos.add(this.vel);
        this.acc.mult(0);
      };

      Vehicle.prototype.dead = function () {
        return this.health < 0;
      };

      Vehicle.prototype.show = function () {
        s.push();

        let gr = s.color(0, 255, 0);
        let rd = s.color(0, 0, 0);
        let col = s.lerpColor(rd, gr, this.health);

        s.fill(col);
        s.noStroke();
        s.translate(this.pos.x, this.pos.y);
        s.rotate(this.vel.heading() - s.PI / 2);
        s.triangle(-3, -3, 0, 6, 3, -3);

        if (debug) {
          s.noFill();
          s.stroke('green');
          s.ellipse(0, 0, this.dna[2] * 2);
          s.stroke('red');
          s.ellipse(0, 0, this.dna[3] * 2);
        }

        s.pop();
      };

      Vehicle.prototype.boundaries = function () {
        let desired = null;
        var d = 10; //Distance from the edge

        if (this.pos.x < d) {
          desired = s.createVector(this.dna[5], this.vel.y);
        } else if (this.pos.x > s.width - d) {
          desired = s.createVector(-this.dna[5], this.vel.y);
        }

        if (this.pos.y < d) {
          desired = s.createVector(this.vel.x, this.dna[5]);
        } else if (this.pos.y > s.height - d) {
          desired = s.createVector(this.vel.x, -this.dna[5]);
        }

        if (desired !== null) {
          desired.normalize();
          desired.mult(this.dna[5]);
          let steer = p5.Vector.sub(desired, this.vel);
          steer.limit(this.dna[4]);
          this.applyForce(steer);
        }
      };

      Vehicle.prototype.behaviors = function (food, hunter, poison) {
        var fSteer = this.eat(food, fnut, this.dna[2]); // find the FoOOOOD
        var hSteer = this.eat(hunter, 0, this.dna[3]); // flee the Hunter
        var pSteer = this.eat(poison, pnut, this.dna[6]); // Flee the Posion

        if (!MouseDown) {
          fSteer.mult(this.dna[0]);
          hSteer.mult(this.dna[1]);
          pSteer.mult(this.dna[7]);
        }
        let resSteer = p5.Vector.add(fSteer, hSteer).add(pSteer);

        this.applyForce(resSteer);
      };

      Vehicle.prototype.clone = function () {
        let repoProp = s.map(this.health, 0, 1, 0, VreproductionRate);
        // Dont Reproduce if you are standing still
        if (
          (s.random(1) < repoProp && this.vel.mag() && this.health > 0.6) ||
          (this.overFeed > 10 && ReproductionOnFood)
        ) {
          this.overFeed = 0;
          this.numChildren += 1;
          this.health -= 0.3;
          return new Vehicle(
            this.pos.x,
            this.pos.y,
            this.dna,
            this.ancestors + 1,
            this.health + 0.3
          );
        }
        return null;
      };

      Vehicle.prototype.getHealth = function () {
        if (this.dead()) {
          return 0;
        }
        return Math.round(this.health * 100);
      };

      Vehicle.prototype.eat = function (list, nut, perception) {
        var record = Infinity;
        var closestIndex = -1;

        for (var i = list.length - 1; i >= 0; i--) {
          var d = 0;

          if (nut == 0) {
            // checks if its a hunter or Posion/food
            d = this.pos.dist(list[i].pos);
          } else {
            d = this.pos.dist(list[i]);
          }

          //Eat if you wander over stuff
          if (d < this.pickupRange) {
            if (nut != 0) {
              list.splice(i, 1);
              if (nut > 0) {
                this.eatenFood += 1;
              }
            }
            this.health += nut;
            if (this.health > 1) {
              this.health = 1;
              this.overfeed += 1;
            }
            continue;
          }

          if (d < record && d < perception) {
            record = d;
            closestIndex = i;
          }
        }
        if (MouseDown) {
          return this.seek(s.createVector(s.mouseX, s.mouseY), 0);
        }

        if (list[closestIndex]) {
          if (nut == 0) {
            // checks if its a hunter or Posion/food
            this.currentTarget = list[closestIndex].pos;
          } else {
            this.currentTarget = list[closestIndex];
          }

          return this.seek(this.currentTarget, perception);
        }

        this.currentTarget = null;
        return s.createVector();
      };

      Vehicle.prototype.seek = function (t, perception) {
        var desired = p5.Vector.sub(t, this.pos);
        var d = desired.mag();
        var speed = s.map(d, 0, perception, this.dna[5] / 4, this.dna[5], true); // the closer the slower!
        desired.setMag(speed);
        var steer = p5.Vector.sub(desired, this.vel);
        return steer;
      };

      Vehicle.prototype.applyForce = function (f) {
        this.acc.add(f);
      };

      function Hunter(x, y, givenDNA = undefined, ancestors = 0, health = 1) {
        this.pos = s.createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = s.createVector();

        this.health = s.min(health, 1);
        this.pickupRange = 8;

        this.overFeed = 0;

        //stats
        this.ancestors = ancestors;
        this.numChildren = 0;
        this.lifetime = 0;
        this.currentTarget = null;

        this.dna = [0];
        if (givenDNA == undefined) {
          this.dna[1] = s.random(70, 200); //food vision distance
          this.dna[2] = s.random(0.2, 0.4); //turnForce
          this.dna[3] = s.random(2, 4); //maxSpeed
          this.dna[4] = s.random(40, 100); //Posion vision distance
          this.dna[5] = s.random(-2, 0); //Posion Weight
          this.dna[6] = s.random(0, 2); //Food Weight
        } else {
          this.dna = givenDNA.slice();
          this.mutate();
        }
      }

      Hunter.prototype.mutate = function () {
        if (s.random(1) < mr) {
          this.dna[1] += s.random(-20, 20);
        }

        if (s.random(1) < mr) {
          this.dna[2] += s.random(-0.05, 0.05);
        }

        if (s.random(1) < mr) {
          this.dna[3] += s.random(-1, 1);
          if (this.dna[3] < 0.1) {
            this.dna[3] = 0.1;
          }
        }

        if (s.random(1) < mr) {
          this.dna[4] += s.random(-10, 10);
          if (this.dna[4] < 10) {
            this.dna[4] = 10;
          }
        }

        if (s.random(1) < mr) {
          this.dna[5] += s.random(-0.1, 0.1);
        }
      };

      Hunter.prototype.update = function () {
        let decay = SpeedDecay ? this.dna[3] : 1;

        this.health -= decay / HHealthDecay + 0.001;
        this.lifetime += 1;

        this.acc.normalize().mult(this.dna[2]);
        this.vel.add(this.acc);
        this.vel.normalize().mult(this.dna[3]);
        this.pos.add(this.vel);
        this.acc.mult(0);
      };

      Hunter.prototype.dead = function () {
        return this.health < 0;
      };

      Hunter.prototype.show = function () {
        s.push();

        let gr = s.color(255, 0, 0);
        let rd = s.color(0, 0, 0);
        let col = s.lerpColor(rd, gr, this.health);

        s.fill(col);
        s.noStroke();
        s.translate(this.pos.x, this.pos.y);
        s.rotate(this.vel.heading() - s.PI / 2);
        s.triangle(-6, -6, 0, 12, 6, -6);
        s.pop();
        if (hunterDebug) {
          s.push();
          s.noFill();
          s.stroke('green');
          if (this.currentTarget) {
            s.line(
              this.pos.x,
              this.pos.y,
              this.currentTarget.x,
              this.currentTarget.y
            );
          }
          s.stroke('red');
          s.ellipse(this.pos.x, this.pos.y, this.dna[1] * 2);
          s.pop();
        }
      };

      Hunter.prototype.boundaries = function () {
        let desired = null;
        var d = 10; //Distance from the edge

        if (this.pos.x < d) {
          desired = s.createVector(this.dna[3], this.vel.y);
        } else if (this.pos.x > s.width - d) {
          desired = s.createVector(-this.dna[3], this.vel.y);
        }

        if (this.pos.y < d) {
          desired = s.createVector(this.vel.x, this.dna[3]);
        } else if (this.pos.y > s.height - d) {
          desired = s.createVector(this.vel.x, -this.dna[3]);
        }

        if (desired !== null) {
          desired.normalize();
          desired.mult(this.dna[3]);
          let steer = p5.Vector.sub(desired, this.vel);
          steer.limit(this.dna[2]);
          this.applyForce(steer);
        }
      };

      Hunter.prototype.behaviors = function (vehicle, poison) {
        var vSteer = this.eat(vehicle, vnut, this.dna[1]);
        var pSteer = this.eat(poison, pnut, this.dna[4]);

        vSteer.mult(this.dna[6]);
        pSteer.mult(this.dna[5]);

        let resSteer = p5.Vector.add(vSteer, pSteer);

        this.applyForce(resSteer);
      };

      Hunter.prototype.clone = function () {
        let repoProp = s.map(this.health, 0, 1, 0, HreproductionRate);
        if (
          (s.random(1) < repoProp && this.vel.mag() && this.health > 0.6) ||
          (this.overFeed > 10 && ReproductionOnFood)
        ) {
          this.overFeed = 0;
          this.numChildren += 1;
          this.health -= 0.3;
          return new Hunter(
            this.pos.x,
            this.pos.y,
            this.dna,
            this.ancestors + 1,
            this.health + 0.3
          );
        }
        return null;
      };

      Hunter.prototype.eat = function (list, nut, perception) {
        var record = Infinity;
        var closestIndex = -1;
        for (var i = list.length - 1; i >= 0; i--) {
          var d = 0;
          if (nut > 0) {
            // checks if its a hunter or Posion/food
            d = this.pos.dist(list[i].pos);
          } else {
            d = this.pos.dist(list[i]);
          }
          //Eat if you wander over stuff
          if (d < this.pickupRange) {
            if (nut > 0) {
              // checks if its a hunter or Posion/food
              list[i].health = -5;
            }
            list.splice(i, 1);
            this.health += nut;
            if (this.health > 1) {
              if (this.health > 1.6) {
                this.overFeed += 1;
              }
              this.health = 1;
            }
            continue;
          }

          if (d < record && d < perception) {
            record = d;
            closestIndex = i;
          }
        }

        if (list[closestIndex]) {
          if (nut > 0) {
            // checks if its a hunter or Posion/food
            this.currentTarget = list[closestIndex].pos;
          } else {
            this.currentTarget = list[closestIndex];
          }
          return this.seek(this.currentTarget, perception);
        }
        this.currentTarget = null;
        return s.createVector();
      };

      Hunter.prototype.seek = function (t, perception) {
        var desired = p5.Vector.sub(t, this.pos);
        var d = desired.mag();
        var speed = s.map(d, 0, perception, this.dna[3] / 4, this.dna[3], true); // the closer the slower!
        desired.setMag(speed);
        var steer = p5.Vector.sub(desired, this.vel);
        return steer;
      };

      Hunter.prototype.applyForce = function (f) {
        this.acc.add(f);
      };

      s.restart = () => {
        s.vehicles = [];
        s.hunters = [];
        s.food = [];
        s.poison = [];

        s.meanDNA = [];
        s.popSize = [];

        s.meanHunterDNA = [];
        s.hunterPopSize = [];

        s.bestVehicle;

        s.time = 0;
        s.sampleTime = 100;

        s.setup();
      };

      s.windowResized = () => {
        divWidth = this.ecoRef.nativeElement.offsetWidth;
        divHeight = this.ecoRef.nativeElement.offsetHeight;
        s.resizeCanvas(divWidth, divHeight);
      };
    };
    this.canvas = new p5(this.EcoSketch);
  }

  restartSim() {
    this.canvas.restart();
  }

  test() {
    console.log(this.canvas);
  }

  ngOnDestroy() {
    this.canvas.remove();
  }
}
