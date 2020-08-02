import { Component, OnInit } from '@angular/core';
import { NavItem } from "./navItem.model"
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  MlNavArr : NavItem[] = [
    new NavItem("Generator Networks","/"),
    new NavItem("Classifier Networks","/"),
    new NavItem("Learning Agents","/"),
    new NavItem("Deepdream","/")
  ];

  PpNavArr : NavItem[] = [
    new NavItem("a* Pathfinding","/"),
    new NavItem("Blender Bilder","/"),
    new NavItem("Maze Generator","/"),
    new NavItem("Fraktal Generator","/"),
    new NavItem("Game of Life","Conway")
  ];

  navItemArr:NavItem[];

  constructor(private activeRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.activeRoute.url.subscribe(
      (url) => {
        if(url[0].path ==="ML"){
          this.navItemArr = this.MlNavArr
        }
        if(url[0].path ==="PP"){
          this.navItemArr =this.PpNavArr
        }
  })
}
}
