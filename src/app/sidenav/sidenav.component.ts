import { Component, OnInit } from '@angular/core';
import { NavItem } from "./navItem.model"

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  navItemArr : NavItem[] = [
    new NavItem("a* Pathfinding","https://google.com"),
    new NavItem("Blender Bilder","None Yet"),
    new NavItem("Maze Generator","None Yet"),
    new NavItem("Fraktal Generator","None Yet")
  ];

  navItemArr2 : NavItem[] = [
    new NavItem("test","https://google.com"),
    new NavItem("Test2","None Yet"),
    new NavItem("Test3","None Yet"),
    new NavItem("Even More Content","None Yet"),
    new NavItem("test","https://google.com"),
    new NavItem("Test2","None Yet"),
    new NavItem("Test3","None Yet"),
    new NavItem("Even More Content","None Yet"),
    new NavItem("test","https://google.com"),
    new NavItem("Test2","None Yet"),
    new NavItem("Test3","None Yet"),
    new NavItem("Even More Content","None Yet"),
    new NavItem("Test2","None Yet"),
    new NavItem("Test3","None Yet"),
    new NavItem("Even More Content","None Yet"),
    new NavItem("test","https://google.com"),
    new NavItem("Test2","None Yet"),
    new NavItem("Test3","None Yet"),
    new NavItem("Even More Content","None Yet")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    if (this.navItemArr.length>0) {
      this.navItemArr = []
    }
    else {
      this.navItemArr = this.navItemArr2
    }
  }

}
