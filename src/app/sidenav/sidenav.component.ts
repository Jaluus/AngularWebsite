import { Component, OnInit } from '@angular/core';
import { NavItem } from "./navItem.model"

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  HP = true;
  navItemArr : NavItem[] = [
    new NavItem("a* Pathfinding","https://google.com"),
    new NavItem("Blender Bilder","None Yet"),
    new NavItem("Maze Generator","None Yet"),
    new NavItem("Fraktal Generator","None Yet")
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
