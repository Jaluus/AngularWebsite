import {Injectable } from "@angular/core";

@Injectable({providedIn: "root"})
export class ThemeManager{
  private currentTheme = "dark-theme"

  swapTheme(){
    if (this.currentTheme === "dark-theme"){
      this.currentTheme = "light-theme"
    }else{
      this.currentTheme = "dark-theme"
    }
  }

  getTheme(){
    return this.currentTheme
  }

}
