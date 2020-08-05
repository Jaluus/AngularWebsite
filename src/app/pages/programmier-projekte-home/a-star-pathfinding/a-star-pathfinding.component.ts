import { Component, OnInit, OnChanges } from '@angular/core';
import { NodeManager } from 'src/app/shared/services/nodeManager.service';
import { NgModel } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Node } from 'src/app/shared/Models/node.model';

@Component({
  selector: 'app-a-star-pathfinding',
  templateUrl: './a-star-pathfinding.component.html',
  styleUrls: ['./a-star-pathfinding.component.css'],
  providers: [NodeManager]
})
export class AStarPathfindingComponent implements OnInit {
  newGridsize = 20;
  AStarArray = [];
  dist = 0;

  constructor(public NMG : NodeManager,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.NMG.setGridsize(this.newGridsize)
  }

  calcDist(node:Node){
    let xdist = this.NMG.destNode[0] - node.x // swap sourcenode with node
    let ydist = this.NMG.destNode[1] - node.y

    let min = Math.min(Math.abs(xdist) , Math.abs(ydist))
    let max = Math.max(Math.abs(xdist) , Math.abs(ydist))

    return min * 14 + 10 * (max -min)
  }

  AStarStep(){
    if(this.NMG.sourceNode && this.NMG.destNode){
      let minHCost = Infinity
      let nextNode = null;
      let adjecentNodes = [];
      let explorableNodes = [];

      const source = this.NMG.sourceNode
      adjecentNodes = this.NMG.getAdjecent(this.NMG.nodeArr[source[1]][source[0]])

      for (let node of adjecentNodes){
        if(node.role === "none"){
          node.hCost = this.calcDist(node)
          node.role = "open"
          explorableNodes.push(node)
        }
      }
      for (let node of explorableNodes){
        if(node.hCost < minHCost){
          nextNode = node;
          minHCost = node.hCost
        }
      }
      nextNode.role = "closed"
    } else {
      this._snackBar.open("Please set Destination and Source", "Ok" , {duration: 3000})
    }
  }


}
