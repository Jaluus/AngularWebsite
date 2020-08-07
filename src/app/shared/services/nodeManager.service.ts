import { Node } from "../Models/node.model"
import {Injectable } from "@angular/core";

@Injectable()
export class NodeManager {
  AdArr:Node[] = [];
  nodeArr: Node[][] = [];
  gridsize:number = 10
  roleMode = "none"
  sourceNode : number[] = null;
  destNode : number[] = null;

  makeNetwork(){
    this.sourceNode = null;
    this.destNode = null;
    this.nodeArr = [];
    for( let i = 0; i < this.gridsize; i++ ) {
      this.nodeArr.push([]);
    }

    for (let ypos = 0; ypos < this.gridsize ; ypos++) {
      for (let xpos = 0; xpos < this.gridsize ; xpos++) {
        this.nodeArr[ypos].push(new Node(xpos,ypos,"none"))
      }
    }
  }

  resetNetwork(){
    this.makeNetwork();
  }

  removeTracers(){
    for (let row of this.nodeArr){
      for (let node of row){
        node.parent = null;
        if (node.role === "open" || node.role ==="closed" || node.role ==="path" ){
          node.reset()
      }
    }
  }
}

  setGridsize(newGridsize){
    this.gridsize = newGridsize;
    this.makeNetwork()
  }

  getAdjecent(tile:Node,wallCheck:boolean = false,onlyCardinal:boolean = false){
    this.AdArr = [];
    let tempArr : Node[] = [];
    let ypos = tile.y
    let xpos = tile.x
    let rightBoundry = (xpos === this.gridsize-1)
    let leftBoundry = (xpos === 0)

    //Upper Tiles
    if(ypos>0){
      if (!leftBoundry && !onlyCardinal){ this.AdArr.push(this.nodeArr[ypos-1][xpos-1]) }
      this.AdArr.push(this.nodeArr[ypos-1][xpos])
      if (!rightBoundry && !onlyCardinal){ this.AdArr.push(this.nodeArr[ypos-1][xpos+1]) }
    }
      //Middle Tiles
    if (!leftBoundry){ this.AdArr.push(this.nodeArr[ypos][xpos-1]) }
    if (!rightBoundry){ this.AdArr.push(this.nodeArr[ypos][xpos+1]) }

      //Lower Tiles
    if(ypos < this.gridsize-1){
      if (!leftBoundry && !onlyCardinal){ this.AdArr.push(this.nodeArr[ypos+1][xpos-1]) }
      this.AdArr.push(this.nodeArr[ypos+1][xpos])
      if (!rightBoundry && !onlyCardinal){ this.AdArr.push(this.nodeArr[ypos+1][xpos+1]) }
    }

    if (wallCheck) {
      //console.log("BEFORE :" + this.AdArr.length)
      //console.table(this.AdArr)
      for (let node of this.AdArr){
        //console.log((node.role === "draw") + " " + node)
        if (!(node.role === "draw")){
          tempArr.push(node)
        }
      }
      this.AdArr = tempArr;
      //console.log("AFTER :" + this.AdArr.length)
      //console.table(this.AdArr)
    }

    return this.AdArr;
  }

  setRole(node:Node){
    if (this.roleMode === "source") {
      if (!(node.role === "dest")){ //So that source cant overwrite dest
        if (this.sourceNode) { this.nodeArr[this.sourceNode[1]][this.sourceNode[0]].role = "none" }
        this.sourceNode = [node.x, node.y]
        node.role = this.roleMode;
      }
    }
    else if (this.roleMode === "dest") {
      if (!(node.role === "source")){ //So that dest cant overwrite source
        if (this.destNode) { this.nodeArr[this.destNode[1]][this.destNode[0]].role = "none" }
        this.destNode = [node.x, node.y]
        node.role = this.roleMode;
      }
    }
    else {
      if (node.role === "source"){ this.sourceNode = null; }
      if (node.role === "dest"){ this.destNode = null; }
    node.role = this.roleMode;
    }
  }

}
