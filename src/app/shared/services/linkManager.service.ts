import {Injectable } from "@angular/core";
import { NavItem } from '../Models/navItem.model';

@Injectable()
export class LinkManager{
  headerLinks: NavItem[] = [
    new NavItem("Programming","/PP/Start"),
    new NavItem("Machine Learning","/ML/Start"),
    new NavItem("Other","/ETC/Start"),
  ];

  MlNavArr : NavItem[] = [
    new NavItem("MNIST Detection","mnistClas"),
    new NavItem("MNIST Generator","mnistGen"),
    new NavItem("Learning Agents","404",false),
    new NavItem("Deepdream","404",false)
  ];

  PpNavArr : NavItem[] = [
    new NavItem("Game of Life","Conway"),
    new NavItem("A* Pathfinder","AStar"),
    new NavItem("Tree Fractal Generator","Fractal"),
    new NavItem("Maze Generator","404",false),
  ];

  SNavArr : NavItem[] = [
    new NavItem("Blender Gallery","Blender"),
    new NavItem("Testpage","test")
  ];

  onHomepage = false;

}
