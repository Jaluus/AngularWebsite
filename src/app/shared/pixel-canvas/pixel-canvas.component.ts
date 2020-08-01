import { Component, OnInit, Input } from '@angular/core';
import { GridManager } from '../services/gridManager.service';
import { Pixel } from './pixel.model';

@Component({
  selector: 'app-pixel-canvas',
  templateUrl: './pixel-canvas.component.html',
  styleUrls: ['./pixel-canvas.component.css'],
  providers:[GridManager]

})
export class PixelCanvasComponent implements OnInit{
  @Input("enableCanvasControl") control = true;
  mouseDown = false;

  constructor(public gridmng :GridManager) {}

  ngOnInit(){
    this.gridmng.makeArr();
  }

  colorPixel(tile:Pixel){
    if(!this.gridmng.squareColor){
      tile.clicked = true;
    }else{
      this.gridmng.colorSquare(tile)
    }
  }

  onHover(tile:Pixel){
    if (this.mouseDown && tile){
      this.colorPixel(tile)
    }
  }


}
