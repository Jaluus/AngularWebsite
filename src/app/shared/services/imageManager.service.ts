import {Injectable } from "@angular/core";
import { Image } from "../Models/image.model";

@Injectable()
export class imageManager{

  blenderStartPath = "https://uslu.tech/pictures/Blender/";

  imageArr : Image[] = [
    new Image (this.blenderStartPath +"Fraktale/frac6.png" , "Fraktale",  1, 2 ),
    new Image (this.blenderStartPath +"Würfel.png" , "Würfel",  1, 1 ),
    new Image (this.blenderStartPath +"Mond.png" , "Der Mond",  1, 1 ),
    new Image (this.blenderStartPath +"Gold.png" , "Gold Grid",  2, 1 ),
    new Image (this.blenderStartPath +"Spiegel.png" , "Spiegel",  2, 1 ),
    new Image (this.blenderStartPath +"Fraktale/Fractal2.png" , "Mehr Fraktale",  1, 1 ),
    new Image (this.blenderStartPath +"Pathtracer.png" , "Pathtracing",  1, 1 ),
    new Image (this.blenderStartPath +"Donut/DonutFinal.png" , "DonutFinal",  2, 1 ),
    new Image (this.blenderStartPath +"Donut/DonutV1.png" , "Pathtracing",  2, 1 ),
  ]
}
