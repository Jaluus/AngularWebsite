import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeManager {
  private currentTheme = 'light-theme';
  dark = true;
  alt = false;

  private change = new Subject<string>();
  changed = this.change.asObservable();

  private renderer: Renderer2;
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  swapTheme() {
    if (this.currentTheme === 'dark-theme') {
      this.currentTheme = 'light-theme';
    } else {
      this.currentTheme = 'dark-theme';
    }
  }

  getTheme() {
    return this.currentTheme;
  }

  switchTheme() {
    if (this.alt) {
      this.renderer.removeClass(document.body, 'dark-theme');
      this.renderer.addClass(document.body, 'light-theme');
    } else {
      this.renderer.removeClass(document.body, 'light-theme');
      this.renderer.addClass(document.body, 'dark-theme');
    }
    this.alt = !this.alt;
    this.change.next('We swapped');
  }
}
