import {Pixel} from "../pixel-canvas/pixel.model"
import {Injectable } from "@angular/core";

@Injectable()
export class GridManager{

  squareColor = false

  gridArr: Pixel[] = []
  gridSize:number = 28

  makeArr(){
    this.gridArr = [];
    for (let i = 0; i < Math.pow(this.gridSize,2) ; i++) {
      this.gridArr.push(new Pixel(i,false))
    }
  }

  clearAll(){
    for (let element of this.gridArr){
      element.clicked = false
    }
  }

  setGridsize(newGridsize){
    this.gridSize = newGridsize;
    console.log(this.gridSize)
    this.makeArr()
  }

  getAdjecent(tile:Pixel){
    let AdArr:Pixel[] = [];

    if(tile.id-this.gridSize-1 >= 0){
      AdArr.push(this.gridArr[tile.id-this.gridSize-1])
      AdArr.push(this.gridArr[tile.id-this.gridSize])
      AdArr.push(this.gridArr[tile.id-this.gridSize+1])
    } else {
      AdArr.push(null)
      AdArr.push(null)
      AdArr.push(null)
    }

      AdArr.push(this.gridArr[tile.id-1])
      AdArr.push(this.gridArr[tile.id])
      AdArr.push(this.gridArr[tile.id+1])

    if(tile.id+this.gridSize < Math.pow(this.gridSize,2)){
      AdArr.push(this.gridArr[tile.id+this.gridSize-1])
      AdArr.push(this.gridArr[tile.id+this.gridSize])
      AdArr.push(this.gridArr[tile.id+this.gridSize+1])
    } else {
      AdArr.push(null)
      AdArr.push(null)
      AdArr.push(null)
    }
    return AdArr;
  }

  toggleSize(){
    this.squareColor = !this.squareColor
  }

  colorSquare(tile:Pixel){
    for (let pix of this.getAdjecent(tile)){
      if(pix){
        pix.clicked = true;
      }
    }
  }

}
