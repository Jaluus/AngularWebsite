import {Pixel} from "../pixel-canvas/pixel.model"
import {Injectable } from "@angular/core";
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class GridManager{
  gridArr: Pixel[][] = [];
  gridsize:number = 10
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
    return this.gridArr
  }

  clearAll(){
    for (let rows of this.gridArr){
      for (let element of rows){
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
      tile.clicked = true;
    } else {
      tile.clicked = false;
    }
  }

}
