import { Component, OnInit} from '@angular/core';
import { WindowSizeManager } from '../shared/services/windowSizeManager.service';
import { LinkManager } from '../shared/services/linkManager.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  Mainpage = false;

  constructor(
    public WSM: WindowSizeManager,
    public links: LinkManager,
    public router : Router,
    private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {
  }
}
