import { Injectable } from '@angular/core';
import { Image } from '../Models/image.model';

@Injectable()
export class imageManager {
  BackendPath = 'https://backend.uslu.tech/pictures';
  compressEnding = '-min.png';

  imageArr: Image[] = [
    new Image(this.getBlenderLink('Fraktale/frac6'), 'Fraktale', 1, 2),
    new Image(this.getBlenderLink('Würfel'), 'Würfel', 1, 1),
    new Image(this.getBlenderLink('Mond'), 'Der Mond', 1, 1),
    new Image(this.getBlenderLink('Gold'), 'Gold Grid', 2, 1),
    new Image(this.getBlenderLink('Spiegel'), 'Spiegel', 2, 1),
    new Image(this.getBlenderLink('Fraktale/Fractal2'), 'Mehr Fraktale', 1, 1),
    new Image(this.getBlenderLink('Pathtracer'), 'Pathtracing', 1, 1),
    new Image(this.getBlenderLink('Donut/DonutFinal'), 'DonutFinal', 2, 1),
    new Image(this.getBlenderLink('Donut/DonutV1'), 'Pathtracing', 2, 1),
  ];

  getBlenderLink(filePath: string) {
    return (
      this.BackendPath + '/BlenderCompressed/' + filePath + this.compressEnding
    );
  }
}
