import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.component.html',
  styleUrls: ['./testpage.component.css']
})
export class TestpageComponent implements OnInit {
  mouseDown = false;
  gridArr: {number:number, clicked:boolean}[] = []
  gridSize = 28*28
  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.gridSize; i++) {
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

}

