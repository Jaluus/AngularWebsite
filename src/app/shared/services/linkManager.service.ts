import {Injectable } from "@angular/core";
import { NavItem } from '../../sidenav/navItem.model';

@Injectable()
export class LinkManager{
  headerLinks: NavItem[] = [
    new NavItem("Programmieren","/PP/Start"),
    new NavItem("Machine Learning","/ML/Start"),
    new NavItem("Sonstiges","/ETC/Start"),
  ];

  MlNavArr : NavItem[] = [
    new NavItem("Generator Networks","404"),
    new NavItem("Classifier Networks","404"),
    new NavItem("Learning Agents","404"),
    new NavItem("Deepdream","404")
  ];

  PpNavArr : NavItem[] = [
    new NavItem("Game of Life","Conway"),
    new NavItem("A* Pathfinder","AStar"),
    new NavItem("Maze Generator","404"),
    new NavItem("Fraktal Generator","404"),
  ];

  SNavArr : NavItem[] = [
    new NavItem("Blender Bilder","Blender"),
    new NavItem("Testpage","test")
  ];

  onHomepage = false;

}
