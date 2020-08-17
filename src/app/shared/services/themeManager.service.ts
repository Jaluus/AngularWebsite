import {Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({providedIn: "root"})
export class ThemeManager{
  private currentTheme = "dark-theme"
  dark = true;
  alt = true

  private renderer : Renderer2;

  constructor(rendererFactory: RendererFactory2){
    this.renderer = rendererFactory.createRenderer(null,null)
  }

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

  switchTheme(){
    if (this.alt){
      this.renderer.removeClass(document.body,"dark-theme")
      this.renderer.addClass(document.body,"light-theme")
    } else{
      this.renderer.removeClass(document.body,"light-theme")
      this.renderer.addClass(document.body,"dark-theme")
    }
    this.alt = !this.alt
  }

}
