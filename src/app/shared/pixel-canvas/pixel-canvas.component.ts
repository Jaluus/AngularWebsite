import { Component, OnInit, Input } from '@angular/core';
import { GridManager } from '../services/gridManager.service';
import { Pixel } from '../Models/pixel.model';
import { WindowSizeManager } from '../services/windowSizeManager.service';

@Component({
  selector: 'app-pixel-canvas',
  templateUrl: './pixel-canvas.component.html',
  styleUrls: ['./pixel-canvas.component.css']

})
export class PixelCanvasComponent implements OnInit{
  mouseDown = false;
  @Input() clickable = true

  constructor(public gridmng :GridManager,
    public WSM:WindowSizeManager) {}

  ngOnInit(){
    this.gridmng.makeArr();
  }

  onHover(tile:Pixel){
    if (this.mouseDown && tile && this.clickable){
      this.gridmng.colorPixel(tile)
    }
  }

  onClick(tile){
    if (tile && this.clickable){
      this.gridmng.colorPixel(tile)
    }
  }

  getColor(cell){
    if (cell.clicked){
      return "black"
    }
    if (cell.value === 0){
      return "transparent"
    }

    let w = (1-cell.value) * 255
    return "rgb(" + w + "," + w + "," + w + ")"
  }


}
