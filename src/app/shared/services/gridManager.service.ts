import {Pixel} from "../pixel-canvas/pixel.model"
import {Injectable } from "@angular/core";

@Injectable()
export class GridManager{
  gridArr: Pixel[] = []
  gridsize:number = 10
  drawMode = true;

  makeArr(){
    this.gridArr = [];
    for (let i = 0; i < Math.pow(this.gridsize,2) ; i++) {
      this.gridArr.push(new Pixel(i,false))
    }
  }

  clearAll(){
    for (let element of this.gridArr){
      element.clicked = false
    }
  }

  setGridsize(newGridsize){
    if(newGridsize)
    this.gridsize = newGridsize;
    this.makeArr()
  }

  getAdjecent(tile:Pixel){
    let AdArr:Pixel[] = [];
    let rightBoundry = (tile.id+1) % this.gridsize === 0;
    let leftBoundry = (tile.id) % this.gridsize === 0;

    //Upper Tiles
    if(tile.id-this.gridsize >= 0){
      if (leftBoundry){ AdArr.push(null) } else { AdArr.push(this.gridArr[tile.id-this.gridsize-1]) }
      AdArr.push(this.gridArr[tile.id-this.gridsize])
      if (rightBoundry){ AdArr.push(null) } else { AdArr.push(this.gridArr[tile.id-this.gridsize+1]) }
    } else {
      AdArr.push(null)
      AdArr.push(null)
      AdArr.push(null)
    }
      //Middle Tiles
      if (leftBoundry){ AdArr.push(null) } else { AdArr.push(this.gridArr[tile.id-1]) }
      //AdArr.push(this.gridArr[tile.id])
      AdArr.push(null) // dont push yourself
      if (rightBoundry){ AdArr.push(null) } else { AdArr.push(this.gridArr[tile.id+1]) }

      //Lower Tiles
    if(tile.id+this.gridsize < Math.pow(this.gridsize,2)){
      if (leftBoundry){ AdArr.push(null) } else { AdArr.push(this.gridArr[tile.id+this.gridsize-1]) }
      AdArr.push(this.gridArr[tile.id+this.gridsize])
      if (rightBoundry){ AdArr.push(null) } else { AdArr.push(this.gridArr[tile.id+this.gridsize+1]) }
    } else {
      AdArr.push(null)
      AdArr.push(null)
      AdArr.push(null)
    }
    return AdArr;
  }

  colorPixel(tile:Pixel){
    if(this.drawMode){
      tile.clicked = true;
    } else {
      tile.clicked = false;
    }
  }

  getAliveNeigbors(tile:Pixel){
    let i = 0;
    for (let n of this.getAdjecent(tile)){
      i = n?.clicked? i+1 : i;
    }
    return i
  }

}
