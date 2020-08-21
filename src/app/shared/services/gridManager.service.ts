import {Pixel} from "../Models/pixel.model"
import {Injectable } from "@angular/core";

@Injectable()
export class GridManager{
  gridArr: Pixel[][] = [];
  gridsize:number = 15
  drawMode = true;

  makeArr(){
    this.gridArr = [];
    for( let i = 0; i < this.gridsize; i++ ) {
      this.gridArr.push([]);
    }

    for (let ypos = 0; ypos < this.gridsize ; ypos++) {
      for (let xpos = 0; xpos < this.gridsize ; xpos++) {
        this.gridArr[ypos].push(new Pixel(xpos,ypos,false))
      }
    }
  }

  setValue(tile:Pixel,value:number){
    tile.value = value
  }

  getGridArr(){
    let TempArr = []
    this.gridArr.forEach((row,idx) => {
      TempArr.push([])
      for (let cell of row){
        TempArr[idx].push(cell.value*255)
      }
    })
    return TempArr
  }

  clearAll(){
    for (let rows of this.gridArr){
      for (let element of rows){
        element.value = 0
        element.clicked = false
      }
    }
  }

  setGridsize(newGridsize){
    if(newGridsize)
    this.gridsize = newGridsize;
    this.makeArr()
  }

  getAdjecent(tile:Pixel){
    let AdArr:Pixel[] = [];
    let ypos = tile.y
    let xpos = tile.x
    let rightBoundry = (xpos === this.gridsize-1)
    let leftBoundry = (xpos === 0)
    //Upper Tiles
    if(ypos>0){
      if (leftBoundry){ AdArr.push(null) } else { AdArr.push(this.gridArr[ypos-1][xpos-1]) }
      AdArr.push(this.gridArr[ypos-1][xpos])
      if (rightBoundry){ AdArr.push(null) } else { AdArr.push(this.gridArr[ypos-1][xpos+1]) }
    } else {
      AdArr.push(null)
      AdArr.push(null)
      AdArr.push(null)
    }
      //Middle Tiles
      if (leftBoundry){ AdArr.push(null) } else { AdArr.push(this.gridArr[ypos][xpos-1]) }
      //AdArr.push(this.gridArr[tile.id])
      AdArr.push(null) // dont push yourself
      if (rightBoundry){ AdArr.push(null) } else { AdArr.push(this.gridArr[ypos][xpos+1]) }

      //Lower Tiles
      //
    if(ypos < this.gridsize-1){
      if (leftBoundry){ AdArr.push(null) } else { AdArr.push(this.gridArr[ypos+1][xpos-1]) }
      AdArr.push(this.gridArr[ypos+1][xpos])
      if (rightBoundry){ AdArr.push(null) } else { AdArr.push(this.gridArr[ypos+1][xpos+1]) }
    } else {
      AdArr.push(null)
      AdArr.push(null)
      AdArr.push(null)
    }

    return AdArr;
  }

  colorPixel(tile:Pixel){
    if(this.drawMode){
      tile.value = 1;
      tile.clicked = true;
    } else {
      tile.value = 0;
      tile.clicked = false;
    }
  }

}
