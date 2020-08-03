import { Component, OnInit, Input } from '@angular/core';
import { GridManager } from '../services/gridManager.service';
import { Pixel } from './pixel.model';
import { WindowSizeManager } from '../services/windowSizeManager.service';

@Component({
  selector: 'app-pixel-canvas',
  templateUrl: './pixel-canvas.component.html',
  styleUrls: ['./pixel-canvas.component.css']

})
export class PixelCanvasComponent implements OnInit{
  mouseDown = false;

  constructor(public gridmng :GridManager,
    public WSM:WindowSizeManager) {}

  ngOnInit(){
    this.gridmng.makeArr();
  }

  onHover(tile:Pixel){
    if (this.mouseDown && tile){
      this.gridmng.colorPixel(tile)
    }
  }


}
