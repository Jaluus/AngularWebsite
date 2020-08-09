import { Component, OnInit } from '@angular/core';
import { LinkManager } from 'src/app/shared/services/linkManager.service';

@Component({
  selector: 'app-sonstiges-home',
  templateUrl: './sonstiges-home.component.html',
  styleUrls: ['./sonstiges-home.component.css']
})
export class SonstigesHomeComponent implements OnInit {

  constructor(private links: LinkManager) { }

  Components = [
    {
      name:"Blender Picture Gallery",
      subDesc:"Some Random Stuff I once made in Blender",
      imagePath:"https://archive.uslu.tech/pictures/BlenderCompressed/Würfel2-min.png",
      link:this.links.SNavArr[0].route,
      description : "I once tried my hand at 3D-Modelling and came up with some abstruct stuff I quite liked, I even managed to make some Fractals, which my CPU and GPU certainly didnt like.<br>I decided to put some of the pictures on here, even some Donuts which I made in a <a href='https://www.youtube.com/watch?v=TPrnSACiTJ4'>tutorial</a>.<br>I can just recommend it to everyone curious!",
    },
    {
      name:"My Old Website",
      subDesc:"My first try at HTML and JavaScript",
      imagePath:"https://archive.uslu.tech/pictures/OTHER/OldWebsite.PNG",
      link:"../ETC/Start",
      description : "There is still some stuff on it, like an Applet which has a Neural Network in it which has been trained on the MNIST dataset to Detect handwritten Numbers.<br>There is also an Agent with a modified learning algorithm to learn to balance a pole on its head!<br>You can visit it at <a href='https://archive.uslu.tech'>Archive.Uslu.Tech</a>",
    },
    {
      name:"Testing Page",
      subDesc:"Just for Testing Purposes",
      imagePath:"https://media2.giphy.com/media/gw3IWyGkC0rsazTi/giphy.gif",
      link:this.links.SNavArr[1].route,
      description : "Dont mind that Page, it does nothing, sometimes there is something, sometimes not!",
    },
  ]

  ngOnInit(): void {
  }

}
