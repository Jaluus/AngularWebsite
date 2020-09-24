import { Component, OnInit } from '@angular/core';
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';
import { Image } from 'src/app/shared/Models/image.model';

@Component({
  selector: 'app-unity-fractal-generator',
  templateUrl: './unity-fractal-generator.component.html',
  styleUrls: ['./unity-fractal-generator.component.css'],
})
export class UnityFractalGeneratorComponent implements OnInit {
  backendLink = 'https://backend.uslu.tech/pictures/UnityFractal/';

  imgArr = [
    new Image(this.backendLink + 'BlueInfinityCUT.jpg', 'Green', 2, 1),
    new Image(this.backendLink + 'Mandelbulb2CUT.jpg', 'Green', 1, 2),
    new Image(this.backendLink + 'MengerSpongeBWCUT.jpg', 'Green', 2, 1),
  ];

  constructor(public WSM: WindowSizeManager) {}

  ngOnInit(): void {}
}
