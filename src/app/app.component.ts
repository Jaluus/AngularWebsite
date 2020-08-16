import { Component, HostListener } from '@angular/core';
import { WindowSizeManager } from './shared/services/windowSizeManager.service';
import { ThemeManager } from './shared/services/themeManager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  theme = "dark-theme"
  constructor(
    public WSM : WindowSizeManager,
    public TM : ThemeManager) {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
   this.WSM.screenHeight = window.innerHeight;
   this.WSM.screenWidth = window.innerWidth;
   this.WSM.DesktopMode = (this.WSM.screenWidth <= this.WSM.screenTransitionWidth) ? false : true
  }

}
