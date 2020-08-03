import { Component, OnInit } from '@angular/core';
import { GridManager } from 'src/app/shared/services/gridManager.service';

@Component({
  selector: 'app-conway',
  templateUrl: './conway.component.html',
  styleUrls: ['./conway.component.css'],
  providers:[GridManager]
})
export class ConwayComponent implements OnInit {

  constructor(public gridmng :GridManager) { }

  ngOnInit(): void {
  }

  GOLStep(){
    let lifeIdArr:number[] = []
    let deathIdArr:number[] = []
    //Checks if a cell should die or live, and then registers it in an array
    for (let cell of this.gridmng.gridArr){

      let wasAlive = cell.clicked
      let numAlive = this.gridmng.getAliveNeigbors(cell)

      if (numAlive === 3 && !wasAlive){
        lifeIdArr.push(cell.id)
      }
      if (numAlive < 2 && wasAlive){
        deathIdArr.push(cell.id)
      }
      if (numAlive > 3 && wasAlive){
        deathIdArr.push(cell.id)
      }
    }
    //sets cells to alive
    for (let id of lifeIdArr){
      this.gridmng.gridArr[id].clicked = true
    }
    //sets cells to dead
    for (let id of deathIdArr){
      this.gridmng.gridArr[id].clicked = false
    }
  }
}


