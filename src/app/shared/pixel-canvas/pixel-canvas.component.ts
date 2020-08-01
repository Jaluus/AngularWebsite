import { Component, OnInit, Input } from '@angular/core';
import { GridManager } from '../services/gridManager.service';
import { Pixel } from './pixel.model';

@Component({
  selector: 'app-pixel-canvas',
  templateUrl: './pixel-canvas.component.html',
  styleUrls: ['./pixel-canvas.component.css']

})
export class PixelCanvasComponent implements OnInit{
  mouseDown = false;
  newGridsize = 10;

  constructor(public gridmng :GridManager) {}

  ngOnInit(){
    this.gridmng.makeArr();
  }

  onHover(tile:Pixel){
    if (this.mouseDown && tile){
      tile.clicked = true;
    }
  }

  colorSquare(tile:Pixel){
    for (let pix of this.gridmng.getAdjecent(tile)){
      if(pix){
        pix.clicked = true;
      }
    }
  }

  colorPixel(tile:Pixel){
    tile.clicked = true;
  }

  //Build a Service for the canvas

  }
