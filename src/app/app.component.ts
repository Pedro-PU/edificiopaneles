import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  IonFooter,
  IonToolbar,
  IonTitle
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { appRoutes } from './app.routes';

import {
  homeOutline, homeSharp,
  documentTextOutline, documentTextSharp,
  flameOutline, flameSharp,
  helpCircleOutline, helpCircleSharp,
  flash,
  speedometer,
  batteryCharging,
  batteryFull,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
    IonFooter,
    IonToolbar,
    IonTitle
  ],
})
export class AppComponent {
  public appPages: { title: string; url: string; icon: string }[] = [];

  constructor() {
    addIcons({
      homeOutline, homeSharp,
      documentTextOutline, documentTextSharp,
      flameOutline, flameSharp,
      helpCircleOutline, helpCircleSharp,
      flash,
      speedometer,
      batteryCharging,
      batteryFull,
    });

    this.generarAppPagesDinamicamente();
  }

  private generarAppPagesDinamicamente() {
    const iconos: { [key: string]: string } = {
      'folder': 'home',
      'datos': 'document-text',
      'bombas': 'flame',
    };

    for (const route of appRoutes) {
      if (route.path && route.loadComponent && !route.redirectTo) {
        const routePath = route.path.split('/')[0];
        const title = routePath === 'folder' ? 'Principal' : routePath.charAt(0).toUpperCase() + routePath.slice(1);
        const url = route.path.includes(':') ? '/folder/inbox' : `/${routePath}`;
        const icon = iconos[routePath] || 'help-circle';

        this.appPages.push({ title, url, icon });
      }
    }
  }
}