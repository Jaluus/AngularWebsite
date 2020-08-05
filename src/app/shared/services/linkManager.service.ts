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
    new NavItem("Generator Networks","/"),
    new NavItem("Classifier Networks","/"),
    new NavItem("Learning Agents","/"),
    new NavItem("Deepdream","/")
  ];

  PpNavArr : NavItem[] = [
    new NavItem("Game of Life","Conway"),
    new NavItem("A* Pathfinder","AStar"),
    new NavItem("Maze Generator","/"),
    new NavItem("Fraktal Generator","/"),
  ];

  SNavArr : NavItem[] = [
    new NavItem("Blender Bilder","Blender"),
    new NavItem("Testpage","test")
  ];

  onHomepage = false;

}
