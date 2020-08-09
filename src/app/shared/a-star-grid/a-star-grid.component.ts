import { Component, OnInit, Input } from '@angular/core';
import { NodeManager } from '../services/nodeManager.service'
import { Node } from '../Models/node.model';
import { WindowSizeManager } from '../services/windowSizeManager.service';

@Component({
  selector: 'app-a-star-grid',
  templateUrl: './a-star-grid.component.html',
  styleUrls: ['./a-star-grid.component.css']
})
export class AStarGridComponent implements OnInit {
  mouseDown = false;
  @Input() displayCost = ""

  constructor(public NMG :NodeManager,
    public WSM:WindowSizeManager) {}

  ngOnInit(){
    this.NMG.makeNetwork();

  }

  getColor(node : Node){
    switch (node.role) {
      case "none" :{
        return "transparent"
      }
      case "draw" :{
        return "black"
      }
      case "dest" :{
        return "blue"
      }
      case "source" :{
        return "#00ffee"
      }
      case "open" :{
        return "green"
      }
      case "closed" :{
        return "red"
      }
      case "path" :{
        return "pink"
      }
    }
  }

  onHover(tile:Node){
    if (this.mouseDown && tile){
      this.NMG.setRole(tile)
    }
  }


}
