import { Component, OnInit } from '@angular/core';
import { LinkManager } from 'src/app/shared/services/linkManager.service';

@Component({
  selector: 'app-programmier-projekte-home',
  templateUrl: './programmier-projekte-home.component.html',
  styleUrls: ['./programmier-projekte-home.component.css'],
})
export class ProgrammierProjekteHomeComponent implements OnInit {
  constructor(public links: LinkManager) {}

  Components = [
    {
      name: 'Unity Fractal Generator',
      subDesc: 'Raymarching in Action',
      imagePath:
        'https://backend.uslu.tech/pictures/UnityFractal/ThumbImageFractal.png',
      link: this.links.PpNavArr[0].route,
      description: `A fractal generator and explorer i've written in the Unity game engine entirely from scratch,<br>
    with a custom shader to be able to utilize Raymarching to its fullest.<br>
    You can fully customise the fractals and make screenshots of your creations,<br>
    but beware, the files can get Massive!`,
    },
    {
      name: 'Interactive p5.js Noise Art',
      subDesc: 'Having Fun with p5.js',
      imagePath: 'https://backend.uslu.tech/pictures/PP/Perlin_compressed.jpg',
      link: this.links.PpNavArr[1].route,
      description: `A little collection of stuff you can do with the p5.js library in Angular!<br>
      Right now there is a Gradient Generator made with Simplex- and Perlin-noise, a visualizer for Parametric Equations and some Dancing Triangles.<br>
      You can interact with each of the things in your own way and shape them as you like!<br>
      I plan on adding some more stuff, if I find the time!`,
    },
    {
      name: 'Interactive p5.js WebGl Art',
      subDesc: 'Fun in 3 Dimensions',
      imagePath: 'https://backend.uslu.tech/pictures/PP/TerrainGen.PNG',
      link: this.links.PpNavArr[2].route,
      description: `Some more stuff I made with the WebGl Renderer<br>
      Three Dimensions are way more fun but a bit more costly on your PC, so dont expect the best performance!.<br>
      Right now there is a small Terrain-generator, maybe I can make a little Game out of it?`,
    },
    {
      name: 'A* Pathfinder',
      subDesc: 'Dijkstra Based Pathfinder',
      imagePath: 'https://backend.uslu.tech/pictures/PP/AStar.PNG',
      link: this.links.PpNavArr[3].route,
      description: `A fast Pathfinding Algorithm to find the shortest way between to nodes in a graph.<br>
      In this case then graph is a grid of nodes with edges to each of its neighbors.<br>
      The algorithm calculates two costs, a heuristic-Cost and a g-Cost, to assess which way to take.`,
    },
    {
      name: "Conway's Game of Life",
      subDesc: 'A Cellular Automaton',
      imagePath: 'https://backend.uslu.tech/pictures/PP/Conway.PNG',
      link: this.links.PpNavArr[4].route,
      description: `A small implementation of the popular Game of Life by <a href='https://de.wikipedia.org/wiki/John_Horton_Conway'>John Conway</a>.<br>
      It features the option to change the needed neighbors to get born, to die or to stay alive.<br>
      With this you can create pretty funky stuff!`,
    },
    {
      name: 'Tree Fractal Generator',
      subDesc: 'Beauty through Repetition',
      imagePath:
        'https://backend.uslu.tech/pictures/PP/TreeFractalGenerator.PNG',
      link: this.links.PpNavArr[5].route,
      description: `Who doesn't love trees?<br>
      Well I certainly do, so I implemented a drawFunction which can draw these, so called <a href='https://en.wikipedia.org/wiki/Fractal_canopy'>Fractal canopies</a>.<br>
      You can play around with various parameters and create your own trees! You can even make an <a href='https://en.wikipedia.org/wiki/H_tree'>H Tree</a>!<br>`,
    },
  ];

  ngOnInit(): void {}
}
