import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WindowSizeManager } from "../../../shared/services/windowSizeManager.service";

@Component({
  selector: 'app-testtab',
  templateUrl: './testtab.component.html',
  styleUrls: ['./testtab.component.css']
})
export class TesttabComponent implements OnInit {
  constructor(public WSM:WindowSizeManager) { }
  @ViewChild("canvas", {static:true}) canvas : ElementRef<HTMLCanvasElement>;
  ctx : CanvasRenderingContext2D;
  cWidth;
  cHeight;
  deltaAngleL = 22
  deltaAngleR = 22
  treeLen = 50
  maxIter = 9
  lenChange = 75


  drawRandomTree(){
    this.deltaAngleL = Math.random() * 90
    this.deltaAngleR = Math.random() * 90
    this.treeLen = Math.random() * 90
    this.lenChange = (Math.random()+2) * 30
    this.clearAndDraw()
  }

  ngOnInit(): void {
    console.log(this.WSM.DesktopMode)
    if (!this.WSM.DesktopMode){
      this.cWidth = 300
      this.cHeight = 300
    }else {
      this.cWidth = 500
      this.cHeight = 500
    }
    this.canvas.nativeElement.width = this.cWidth
    this.canvas.nativeElement.height = this.cHeight
    this.ctx = this.canvas.nativeElement.getContext("2d")
    this.clearAndDraw()
  }
  drawTree(startX,startY,len,angle,brachWidth,iter=0){
    this.ctx.beginPath()
    this.ctx.save()

    this.ctx.strokeStyle = "green";
    this.ctx.fillStyle = "green";
    this.ctx.lineWidth = brachWidth

    this.ctx.translate(startX,startY)
    this.ctx.rotate(angle * Math.PI/180)
    this.ctx.moveTo(0,0)
    this.ctx.lineTo(0,-len)
    this.ctx.stroke()

    if(iter >= this.maxIter){
      this.ctx.restore();
      return
    }
    this.drawTree(0,-len,len*this.lenChange/100, +this.deltaAngleL,brachWidth,iter+1)
    this.drawTree(0,-len,len*this.lenChange/100, -this.deltaAngleR,brachWidth,iter+1)

    this.ctx.restore();
  }

  clearAndDraw(){
    this.ctx.clearRect(0,0,this.cWidth,this.cHeight)
    this.drawTree(this.cWidth/2,this.cHeight-80,this.treeLen,0,2)
  }
}

