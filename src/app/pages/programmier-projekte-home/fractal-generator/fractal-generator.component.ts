import { Component, OnInit } from '@angular/core';
import { NodeManager } from 'src/app/shared/services/nodeManager.service';

@Component({
  selector: 'app-fractal-generator',
  templateUrl: './fractal-generator.component.html',
  styleUrls: ['./fractal-generator.component.css'],
  providers: [NodeManager]
})
export class FractalGeneratorComponent implements OnInit {
  newGridsize =  20;

  constructor(public NMG : NodeManager) { }

  ngOnInit(): void {
    this.NMG.gridsize = this.newGridsize
  }

}
