import { Component, OnInit } from '@angular/core';
import { LinkManager } from 'src/app/shared/services/linkManager.service';

@Component({
  selector: 'app-machine-learning-home',
  templateUrl: './machine-learning-home.component.html',
  styleUrls: ['./machine-learning-home.component.css']
})
export class MachineLearningHomeComponent implements OnInit {

  constructor(public links : LinkManager) { }

  Components = [
    {
      name:"MNIST Handwriting Detection",
      subDesc:"A Classifier Network",
      imagePath:"https://archive.uslu.tech/pictures/ML/mnist.PNG",
      link:this.links.MlNavArr[0].route,
      description :
      `A CNN and DNN Model i've trained to detect handwritten numbers.<br>
      The submitted data is being sent to the Backend and gets evaluated there.<br>
      Still a bit wonky on Mobile, because you have to place each pixel individually.`,
    },
  ]

  ngOnInit(): void {
  }

}
