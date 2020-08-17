import { Component, OnInit, Renderer2} from '@angular/core';
import { WindowSizeManager } from '../shared/services/windowSizeManager.service';
import { LinkManager } from '../shared/services/linkManager.service';
import { Router } from '@angular/router';
import { ThemeManager } from '../shared/services/themeManager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  Mainpage = false;
  LightTheme = false;

  constructor(
    public WSM: WindowSizeManager,
    public links: LinkManager,
    public router : Router,
    public TM : ThemeManager,) { }

  ngOnInit(): void {
  }

}
