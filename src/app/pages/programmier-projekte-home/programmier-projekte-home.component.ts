import { Component, OnInit } from '@angular/core';
import { LinkManager } from 'src/app/shared/services/linkManager.service';

@Component({
  selector: 'app-programmier-projekte-home',
  templateUrl: './programmier-projekte-home.component.html',
  styleUrls: ['./programmier-projekte-home.component.css']
})
export class ProgrammierProjekteHomeComponent implements OnInit {

  constructor(public links : LinkManager) {}

  Components = [
    {
      name:"Conways Game of Life",
      subDesc:"A Cellular Automaton",
      imagePath:"https://archive.uslu.tech/pictures/PP/Conway.PNG",
      link:this.links.PpNavArr[0].route,
      description : "A small implementation of the popular Game of Life by <a href='https://de.wikipedia.org/wiki/John_Horton_Conway'>John Conway</a>.<br>It features the option to change the needed neigbors to get born, to die or to stay alive.<br>With this you can create pretty funky stuff!",
    },
    {
      name:"A* Pathfinder",
      subDesc:"Dijkstra Based Pathfinder",
      imagePath:"https://archive.uslu.tech/pictures/PP/AStar.PNG",
      link:this.links.PpNavArr[1].route,
      description : "A fast Pathfinding Algorithm to find the shortest way between to nodes in a graph.<br>In this case then graph is a grid of nodes with edges to each of its neighbors.<br>The algorithm calculates two Costs, a heuristic-Cost and a g-Cost, to assess which way to take.",
    },
    {
      name:"Tree Fractal Generator",
      subDesc:"Beauty through Repetition",
      imagePath:"https://archive.uslu.tech/pictures/PP/TreeFractalGenerator.PNG",
      link:this.links.PpNavArr[2].route,
      description : "Who doesn't love Fractals?<br>Well I Certainly do, so I implemented a drawFunction which can draw these, so called <a href='https://en.wikipedia.org/wiki/Fractal_canopy'>Fractal canopies</a>.<br>You can play around with various parameters and create your own Trees! You can even make an <a href='https://en.wikipedia.org/wiki/H_tree'>H Tree</a>!<br>",
    },
  ]

  ngOnInit(): void {
  }

}
