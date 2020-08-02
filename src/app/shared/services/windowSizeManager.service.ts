import { Injectable } from "@angular/core"

@Injectable()
export class WindowSizeManager {
  screenWidth:number;
  screenHeight:number;
  screenTransitionWidth = 800;
  DesktopMode = true;

  DrawerToggle=false;

  ToggleDrawer(){
    this.DrawerToggle = !this.DrawerToggle;
  }
}
