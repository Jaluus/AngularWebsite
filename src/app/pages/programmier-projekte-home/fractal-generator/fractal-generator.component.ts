import { Component, OnInit } from '@angular/core';
import { NodeManager } from 'src/app/shared/services/nodeManager.service';
import { Node } from 'src/app/shared/Models/node.model';

@Component({
  selector: 'app-fractal-generator',
  templateUrl: './fractal-generator.component.html',
  styleUrls: ['./fractal-generator.component.css'],
  providers: [NodeManager]
})
export class FractalGeneratorComponent implements OnInit {
  newGridsize =  15;
  //fracArr:Node[] = [];

  constructor(public NMG : NodeManager) { }

  ngOnInit(): void {
    this.NMG.gridsize = this.newGridsize
    this.NMG.roleMode = "draw"
  }


  fracStep(){
    let fracArr:Node[] = [];
    let AnchorNode: Node;
    let RotationNode: Node;

    for(let row of this.NMG.nodeArr){
      for(let node of row){
        if(node.role !== "none"){
          fracArr.push(node);
        }
        if(node.role === "source"){
          RotationNode = node;
        }
        if(node.role === "dest"){
          AnchorNode = node;
        }
      }
    }
    let Ax = AnchorNode.x
    let Ay = AnchorNode.y
    let Rx = RotationNode.x
    let Ry = RotationNode.y
    let deltaY = Rx - Ax
    let deltaX = Ay - Ry

    for (let node of fracArr){
      let x = node.x;
      let y = node.y;
      x = x - Rx;
      y = y - Ry;
      let tempX = x
      x = y;
      y = -tempX;
      x = x + Rx - deltaX;
      y = y + Ry - deltaY;
      if (this.NMG.nodeArr[y][x] !== undefined){
        let NewNode = this.NMG.nodeArr[y][x]
        if(node.role === "source"){
          this.NMG.roleMode = "source"
          this.NMG.setRole(NewNode)
          this.NMG.roleMode = "draw"
          this.NMG.setRole(node)
        }else if (node.role !=="dest"){
          NewNode.role = "draw";
        }
      }
    }




  }
}
