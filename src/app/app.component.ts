import { Component, HostListener } from '@angular/core';
import { WindowSizeManager } from './shared/services/windowSizeManager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  constructor(public WSM : WindowSizeManager) {
    this.onResize();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event?) {
   this.WSM.screenHeight = window.innerHeight;
   this.WSM.screenWidth = window.innerWidth;
   this.WSM.DesktopMode = (this.WSM.screenWidth <= this.WSM.screenTransitionWidth) ? false : true
  }

}

