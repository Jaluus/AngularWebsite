import { Component, OnInit } from '@angular/core';
import { GridManager } from '../../services/gridManager.service';

@Component({
  selector: 'app-canvas-control',
  templateUrl: './canvas-control.component.html',
  styleUrls: ['./canvas-control.component.css']
})
export class CanvasControlComponent implements OnInit {
  newGridsize = 10;

  constructor(public gridmng :GridManager) {}

  ngOnInit(): void {
  }

}
