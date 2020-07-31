import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pixel-canvas',
  templateUrl: './pixel-canvas.component.html',
  styleUrls: ['./pixel-canvas.component.css']
})
export class PixelCanvasComponent implements OnInit {
  newGridSize:number = 10
  mouseDown = false;
  gridArr: {number:number, clicked:boolean}[] = []
  @Input() gridSize:number = 28

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < Math.pow(this.gridSize,2) ; i++) {
      this.gridArr.push({number:i,clicked:false})
    }
  }

  makeArr(){
    this.gridArr = [];
    for (let i = 0; i < Math.pow(this.gridSize,2) ; i++) {
      this.gridArr.push({number:i,clicked:false})
    }
  }

  onHover(tile){
    if (this.mouseDown){
      tile.clicked = true;
    }
  }

  clearAll(){
    for (let element of this.gridArr){
      element.clicked = false
    }
  }

  setGridsize(){
    this.gridSize = this.newGridSize
    this.makeArr()
  }

}
