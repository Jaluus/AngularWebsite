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
    for (let cell of this.gridmng.gridArr){
      let wasAlive = cell.clicked
      if (this.gridmng.getAliveNeigbors(cell) === 3 && !wasAlive){
        lifeIdArr.push(cell.id)
      }
      if (this.gridmng.getAliveNeigbors(cell) < 2 && wasAlive){
        deathIdArr.push(cell.id)
      }
      if (this.gridmng.getAliveNeigbors(cell) > 3 && wasAlive){
        deathIdArr.push(cell.id)
      }
    }

    for (let id of lifeIdArr){
      this.gridmng.gridArr[id].clicked = true
    }

    for (let id of deathIdArr){
      this.gridmng.gridArr[id].clicked = false
    }
  }
}


