import {Injectable } from "@angular/core";
import { Image } from "../Models/image.model";

@Injectable()
export class imageManager{

  blenderStartPath = "https://archive.uslu.tech/pictures/BlenderCompressed/";
  compressEnding = "-min.png";

  imageArr : Image[] = [
    new Image (this.blenderStartPath +"Fraktale/frac6"+this.compressEnding , "Fraktale",  1, 2 ),
    new Image (this.blenderStartPath +"Würfel" +this.compressEnding , "Würfel",  1, 1 ),
    new Image (this.blenderStartPath +"Mond" +this.compressEnding, "Der Mond",  1, 1 ),
    new Image (this.blenderStartPath +"Gold" +this.compressEnding, "Gold Grid",  2, 1 ),
    new Image (this.blenderStartPath +"Spiegel" +this.compressEnding, "Spiegel",  2, 1 ),
    new Image (this.blenderStartPath +"Fraktale/Fractal2" +this.compressEnding, "Mehr Fraktale",  1, 1 ),
    new Image (this.blenderStartPath +"Pathtracer" +this.compressEnding, "Pathtracing",  1, 1 ),
    new Image (this.blenderStartPath +"Donut/DonutFinal" +this.compressEnding, "DonutFinal",  2, 1 ),
    new Image (this.blenderStartPath +"Donut/DonutV1"+this.compressEnding , "Pathtracing",  2, 1 ),
  ]
}
