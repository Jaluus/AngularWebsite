import { Component, OnInit, Input } from '@angular/core';
import { NavItem } from '../sidenav/navItem.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input("Desktop")  bigScreen = true;

  links: NavItem[] = [
    new NavItem("Programmieren","/PP/Start"),
    new NavItem("Machine Learning","/ML/Start"),
    new NavItem("sonstiges","/ETC"),
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
