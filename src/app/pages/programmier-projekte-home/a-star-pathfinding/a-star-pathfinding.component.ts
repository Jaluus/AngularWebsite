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
  newGridsize = 15;
  OPEN: Node[] = []; //maybe add this to class
  CLOSED: Node[] = [];
  onlyCardinal = false;

  constructor(public NMG : NodeManager,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.NMG.setGridsize(this.newGridsize)
    this.NMG.roleMode = "draw"
  }

  calcHorG(node:Node,h:boolean){
    let xdist;
    let ydist;
    if (h){
      xdist = this.NMG.destNode[0] - node.x
      ydist = this.NMG.destNode[1] - node.y
    } else {
      xdist = this.NMG.sourceNode[0] - node.x
      ydist = this.NMG.sourceNode[1] - node.y
    }

    let min = Math.min(Math.abs(xdist) , Math.abs(ydist))
    let max = Math.max(Math.abs(xdist) , Math.abs(ydist))

    return min * 14 + 10 * (max - min)
  }

  calcDelta(nodeA:Node,nodeB:Node){
    let xdist = nodeA.x - nodeB.x
    let ydist = nodeA.y - nodeB.y
    let min = Math.min(Math.abs(xdist) , Math.abs(ydist))
    let max = Math.max(Math.abs(xdist) , Math.abs(ydist))
    return min * 14 + 10 * (max - min)
  }

  elementOf(checkNode:Node, array:Node[]){
    for (let node of array){
      if (node === checkNode){
        return true
      }
    }
    return false
  }

  AStarStep(){
    this.NMG.removeTracers()
    this.OPEN = [];
    this.CLOSED = [];
    if(!this.NMG.sourceNode || !this.NMG.destNode){
      this._snackBar.open("No Start or Goal set","Ok",{duration:3000});
      return;
    }
    let sourceNode = this.NMG.nodeArr[this.NMG.sourceNode[1]][this.NMG.sourceNode[0]]
    let destNode = this.NMG.nodeArr[this.NMG.destNode[1]][this.NMG.destNode[0]]
    sourceNode.gCost = 0;
    sourceNode.hCost = this.calcHorG(sourceNode,true);
    this.OPEN.push(sourceNode)
    let i = 0;
    while (this.OPEN.length > 0 && i < 10000) { // Do this while the array is not empty // i is a timeout counter
      i = i+1
      let minFCost = Infinity;
      let minHCost = Infinity;
      let currentNode:Node;

      for (let node of this.OPEN){ // find the node with the lowest f cost || Maybe check later for the one with the lowest h cost additionally
        if(node.getFCost() <= minFCost){
          if(node.hCost < minHCost){
            minFCost = node.getFCost()
            minHCost = node.hCost
            currentNode = node;
          }
        }
      }

      if (currentNode === destNode){ //Checks if the node is the dest node
        this._snackBar.open("Shortest path found; Stopping search","Ok",{duration:3000});
        for (let node of this.OPEN){
          node.role="open"
        }
        for (let node of this.CLOSED){
          node.role="closed"
        }
        while (currentNode.parent){
          currentNode.parent.role = "path"
          currentNode = currentNode.parent
        }
        destNode.role = "dest"
        sourceNode.role = "source"
        return;
      }

      let successorNodes = this.NMG.getAdjecent(currentNode,true,this.onlyCardinal) // Generate each state node_successor that come after node_current

      for (let successorNode of successorNodes){ // for each node_successor of node_current
        let successor_current_cost = currentNode.gCost + this.calcDelta(successorNode,currentNode) // Set successor_current_cost = g(node_current) + w(node_current, node_successor)

        if (this.elementOf(successorNode,this.OPEN)){ // if node_successor is in the OPEN list
          if(successorNode.gCost <= successor_current_cost){continue} //if g(node_successor) ≤ successor_current_cost continue
        }
        else if (this.elementOf(successorNode,this.CLOSED)) { // else if node_successor is in the CLOSED list
          if(successorNode.gCost <=  successor_current_cost){continue} //if g(node_successor) ≤ successor_current_cost continue
          this.OPEN.push(successorNode) //Move node_successor from the CLOSED list to the OPEN list
          this.CLOSED.splice(this.CLOSED.indexOf(successorNode),1)
        }
        else {
          this.OPEN.push(successorNode) //Add node_successor to the OPEN list
          successorNode.hCost = this.calcHorG(successorNode,true) // Set h(node_successor) to be the heuristic distance to node_goal
        }

        successorNode.gCost = successor_current_cost // Set g(node_successor) = successor_current_cost
        successorNode.parent = currentNode; //Set the parent of node_successor to node_current /Broken
      }
      this.CLOSED.push(currentNode) //MOVE node_current to the CLOSED list
      this.OPEN.splice(this.OPEN.indexOf(currentNode),1)
    }
    this._snackBar.open("No Path found; Aborting search","Ok",{duration:3000});
    for (let node of this.CLOSED){
      node.role="closed";
    }
    destNode.role = "dest";
    sourceNode.role = "source";
    return;
  }
}

