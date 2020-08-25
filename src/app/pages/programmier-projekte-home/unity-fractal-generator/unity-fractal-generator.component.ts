import { Component, OnInit } from '@angular/core';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';
import { Image } from 'src/app/shared/Models/image.model';

@Component({
  selector: 'app-unity-fractal-generator',
  templateUrl: './unity-fractal-generator.component.html',
  styleUrls: ['./unity-fractal-generator.component.css']
})
export class UnityFractalGeneratorComponent implements OnInit {

  imgArr = [
    new Image("https://backend.uslu.tech/pictures/UnityFractal/BlueInfinityCUT.png","Green",2,1),
    new Image("https://backend.uslu.tech/pictures/UnityFractal/Mandelbulb2CUT.png","Green",1,2),
    new Image("https://backend.uslu.tech/pictures/UnityFractal/MengerSpongeBWCUT.png","Green",2,1),
  ]

  constructor(
    public WSM : WindowSizeManager) {}

  ngOnInit(): void {
  }

}
