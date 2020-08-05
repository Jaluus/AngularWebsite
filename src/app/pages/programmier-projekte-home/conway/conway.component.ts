import { Component, OnInit } from '@angular/core';
import { GridManager } from 'src/app/shared/services/gridManager.service';
import { Pixel } from 'src/app/shared/Models/pixel.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-conway',
  templateUrl: './conway.component.html',
  styleUrls: ['./conway.component.css'],
  providers:[GridManager]
})
export class ConwayComponent implements OnInit {
  nMoreToDie = 3;
  nLessToDie = 2;
  nToLive = 3;

  timestep = 200;
  stepper;
  simulating = false;

  constructor(public gridmng :GridManager,
          private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  getAliveNeigbors(tile:Pixel){
    let i = 0;
    for (let n of this.gridmng.getAdjecent(tile)){
      i = n?.clicked? i+1 : i;
    }
    return i
  }

  StartGOL(){
    this.stepper = setInterval(()=> {
      this.GOLStep()
    }, this.timestep);
    this.simulating = true;
  }

  StopGOL(){
    clearInterval(this.stepper)
    this.simulating = false
  }

  GOLStep(){
    let lifeIdArr = []
    let deathIdArr = []
    //Checks if a cell should die or live, and then registers it in an array
    for (let row of this.gridmng.gridArr){
      for (let cell of row){

        let wasAlive = cell.clicked
        let numAlive = this.getAliveNeigbors(cell)

        if (numAlive === this.nToLive && !wasAlive){
          lifeIdArr.push([cell.x,cell.y])
        }
        if (numAlive < this.nLessToDie && wasAlive){
          deathIdArr.push([cell.x,cell.y])
        }
        if (numAlive > this.nMoreToDie && wasAlive){
          deathIdArr.push([cell.x,cell.y])
        }
      }
    }
    //sets cells to alive
    if( lifeIdArr.length === 0 && deathIdArr.length === 0){
        this._snackBar.open("Steady state detected, stopping simulation", "Ok" , {duration: 3000})
      this.StopGOL();
    }

    for (let pos of lifeIdArr){
      this.gridmng.gridArr[pos[1]][pos[0]].clicked = true
    }
    //sets cells to dead
    for (let pos of deathIdArr){
      this.gridmng.gridArr[pos[1]][pos[0]].clicked = false
    }
  }
}


