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
  message = "Light mode"
  dark = true

  constructor(
    public WSM: WindowSizeManager,
    public links: LinkManager,
    public router : Router,
    public TM : ThemeManager,
    private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  switchTheme(){
    if (this.dark){
      this.renderer.removeClass(document.body,"dark-theme")
      this.renderer.addClass(document.body,"light-theme")
      this.message = "Dark mode"
    } else{
      this.renderer.removeClass(document.body,"light-theme")
      this.renderer.addClass(document.body,"dark-theme")
      this.message = "Light mode"
    }
    this.dark = !this.dark
  }

}
