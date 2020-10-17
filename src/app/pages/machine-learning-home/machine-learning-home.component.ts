import { Component, OnInit } from '@angular/core';
import { LinkManager } from 'src/app/shared/services/linkManager.service';

@Component({
  selector: 'app-machine-learning-home',
  templateUrl: './machine-learning-home.component.html',
  styleUrls: ['./machine-learning-home.component.css'],
})
export class MachineLearningHomeComponent implements OnInit {
  constructor(public links: LinkManager) {}

  Components = [
    {
      name: 'Learning Agents with a Genetic Algorithm',
      subDesc: 'Natural Selection in Action',
      imagePath: 'https://backend.uslu.tech/pictures/ML/GenAlgo.png',
      link: this.links.MlNavArr[0].route,
      description: `A simple Genetic Algorithm which is teaching small rockets to maneuver to a small target.<br>
      The underlying principle is that of Natural Selection, the caveat is that these Agents are not "Smart", they rather memorize the Course!<br>
      You can also add your own obstacles by dragging the mouse.<br>
      The Code is Vanilla Javascript with p5.js as a Drawing Tool.`,
    },
    {
      name: 'Object Detection with TF Lite',
      subDesc: 'A modified Implementation of an Object Detecting Model on Android',
      imagePath: 'https://backend.uslu.tech/pictures/ML/TFDetect.PNG',
      link: this.links.MlNavArr[1].route,
      description: `Modified code to run a custom object detection model with Tensorflow Lite.<br>
      Realtime Object detection with bounding boxes and percentage shown!<br>
      Works on nearly all Android phones.`,
    },
    {
      name: 'MNIST Number Generator',
      subDesc: 'Deep Convolutional Generative Adversarial Networks in Action',
      imagePath: 'https://backend.uslu.tech/pictures/ML/mnistGAN.PNG',
      link: this.links.MlNavArr[2].route,
      description: `A DCGAN and a GAN model that i've written to generate lifelike handwritten Numbers<br> by learing the characteristics of the MNIST dataset.<br>
      The DCGAN is outperforming the GAN by reducing noise and sharening the image.<br>
      I added sliders to be able to manipulate the Latent Space Vector which is being fed.<br>
      With this you can genererate your own numbers!`,
    },
    {
      name: 'MNIST Handwriting Detection',
      subDesc: 'Comparing a Convolutional and a Deep Neural Network',
      imagePath: 'https://backend.uslu.tech/pictures/ML/mnist.PNG',
      link: this.links.MlNavArr[3].route,
      description: `A CNN and DNN Model i've trained to detect handwritten numbers.<br>
      The submitted data is being sent to the Backend and gets evaluated there.<br>
      Still a bit wonky on Mobile, because you have to place each pixel individually.`,
    },
    // {
    //   name: 'Sketch RNN',
    //   subDesc: 'A small Implementation of the Google Sketch RNN',
    //   imagePath: 'https://backend.uslu.tech/pictures/ML/sketchCat.PNG',
    //   link: this.links.MlNavArr[4].route,
    //   description: `Just a small implementation of a pretrained model by Google.<br>
    //   You can choose what you want it to draw and it will finish your drawing!<br>
    //   Its actually magic.`,
    // },
  ];

  ngOnInit(): void {}
}
