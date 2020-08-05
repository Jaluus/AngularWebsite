import { Component, OnInit } from '@angular/core';
import { imageManager } from "../../../shared/services/imageManager.service";
import { WindowSizeManager } from 'src/app/shared/services/windowSizeManager.service';

@Component({
  selector: 'app-blender-bilder',
  templateUrl: './blender-bilder.component.html',
  styleUrls: ['./blender-bilder.component.css'],
  providers: [imageManager]
})
export class BlenderBilderComponent implements OnInit {

  constructor(
    private imgMng : imageManager,
    public WSM : WindowSizeManager) {}

  imgArr;
  DM;

  ngOnInit(): void {
    this.imgArr = this.imgMng.imageArr
  }

  getGSize(){
    return this.WSM.DesktopMode? "20" : "5"
  }

}
