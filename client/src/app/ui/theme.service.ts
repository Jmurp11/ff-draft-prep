import { Injectable, EventEmitter, Renderer2, Inject, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface ITheme {
  name: string,
  baseColor?: string,
  isActive?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public onThemeChange: EventEmitter<ITheme> = new EventEmitter();

  public themes: ITheme[] = [
    {
      'name': 'dark-purple',
      'baseColor': '#9c27b0',
      'isActive': false
    }, {
      'name': 'dark-pink',
      'baseColor': '#e91e63',
      'isActive': false
    }, {
      'name': 'blue',
      'baseColor': '#03a9f4',
      'isActive': true
    }, {
      'name': 'light-purple',
      'baseColor': '#7367f0',
      'isActive': false
    }, {
      'name': 'navy',
      'baseColor': '#10174c',
      'isActive': false
    }
  ];
  public activatedTheme: ITheme;
  private renderer: Renderer2;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  applyMatTheme(themeName: string) {

    this.activatedTheme = this.themes.find(t => t.name === themeName);
    this.flipActiveFlag(themeName);
    this.renderer.addClass(this.document.body, themeName);

  }

  changeTheme(prevTheme: string, themeName: string) {
    console.log(prevTheme);
    console.log(themeName);
    this.renderer.removeClass(this.document.body, prevTheme);
    this.renderer.addClass(this.document.body, themeName);
    this.flipActiveFlag(themeName);
    this.onThemeChange.emit(this.activatedTheme);
  }

  flipActiveFlag(themeName: string) {
    this.themes.forEach((t) => {
      t.isActive = false;
      if (t.name === themeName) {
        t.isActive = true;
        this.activatedTheme = t;
      }
    });
  }
}
