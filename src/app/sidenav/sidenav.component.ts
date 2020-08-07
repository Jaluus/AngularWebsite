import { Component, OnInit } from '@angular/core';
import { NavItem } from "../shared/Models/navItem.model"
import { ActivatedRoute} from '@angular/router';
import { WindowSizeManager } from '../shared/services/windowSizeManager.service';
import { LinkManager } from '../shared/services/linkManager.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  navItemArr:NavItem[];

  constructor(
    private activeRoute : ActivatedRoute,
    public WSM : WindowSizeManager,
    private links : LinkManager) { }

  ngOnInit(): void {
    this.activeRoute.url.subscribe(
      (url) => {
        if(url[0].path === "ML"){
          this.navItemArr = this.links.MlNavArr
        }
        if(url[0].path === "PP"){
          this.navItemArr =this.links.PpNavArr
        }
        if(url[0].path === "ETC"){
          this.navItemArr =this.links.SNavArr
        }
  })
}
}
