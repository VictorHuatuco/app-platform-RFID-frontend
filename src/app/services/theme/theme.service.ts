import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSettings = {
    primaryColor: '#1976d2',
    menuBackground: '#212121',
    menuTextColor: 'white',
    logo: 'assets/img/default-logo.png',
  };

  private systemThemes: { [key: string]: any } = {
    'TRADE+': {
      primaryColor: '#d32f2f',
      menuBackground: '#739E97',
      menuTextColor: 'white',
      logo: 'assets/img/logo-Trade-white.png',
    },
    'FLOW+': {
      primaryColor: '#00796b',
      menuBackground: '#28398D',
      menuTextColor: 'white',
      logo: 'assets/img/logo-Flow-white.png',
    },
    'INSIGHT+': {
      primaryColor: '#303f9f',
      menuBackground: '#6D51A0',
      menuTextColor: 'white',
      logo: 'assets/img/logo-Insight-white.png',
    },
    BRIQ: {
      primaryColor: '#1976d2',
      menuBackground: '#003443',
      menuTextColor: 'white',
      logo: 'assets/img/logo-BriQ-white.png',
    },
  };

  changeTheme(systemName: string) {
    const theme = this.systemThemes[systemName] || this.systemThemes['FLOW+']; // Cliente por defecto
    console.log(theme);
    this.setTheme(theme);
  }

  setTheme(theme: {
    primaryColor: string;
    menuBackground: string;
    menuTextColor: string;
    logo: string;
  }) {
    this.themeSettings = theme;
    // this.applyTheme();
  }

  getTheme() {
    return this.themeSettings;
  }

  // private applyTheme() {
  //   document.documentElement.style.setProperty(
  //     '--primary-color',
  //     this.themeSettings.primaryColor
  //   );
  //   document.documentElement.style.setProperty(
  //     '--menu-background',
  //     this.themeSettings.menuBackground
  //   );
  //   document.documentElement.style.setProperty(
  //     '--menu-text-color',
  //     this.themeSettings.menuTextColor
  //   );
  //   document.documentElement.style.setProperty(
  //     '--logo',
  //     `url(${this.themeSettings.logo})`
  //   );
  // }
}
