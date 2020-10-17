import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/shared/Models/image.model';

@Component({
  selector: 'app-tensorflow-objectdetection',
  templateUrl: './tensorflow-objectdetection.component.html',
  styleUrls: ['./tensorflow-objectdetection.component.css']
})
export class TensorflowObjectdetectionComponent implements OnInit {

  constructor() { }

  backendLink = 'https://backend.uslu.tech/pictures/ML/TFDetection/';

  imgArr = [
    new Image(this.backendLink + 'PIC1.jpg', 'Green', 1, 1),
    new Image(this.backendLink + 'PIC2.jpg', 'Green', 1, 1),
    new Image(this.backendLink + 'PIC3.jpg', 'Green', 1, 1),
    new Image(this.backendLink + 'PIC4.jpg', 'Green', 1, 1),
  ];

  videoPath = this.backendLink + "InAction.mp4"


  ngOnInit(): void {
  }

}
