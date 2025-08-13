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
  IonTitle,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
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
import { inject } from '@angular/core';
import { Database, ref, get } from '@angular/fire/database';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    IonTitle,
    IonInput,
    IonButton
  ],
})
export class AppComponent {
  public appPages: { title: string; url: string; icon: string }[] = [];
  public isAuthenticated = false;
  public passwordInput = '';

  private database = inject(Database);; // ← Inyectamos Firestore

  constructor() {
    addIcons({ homeOutline, homeSharp, documentTextOutline, documentTextSharp, flameOutline, flameSharp, helpCircleOutline, helpCircleSharp, flash, speedometer, batteryCharging, batteryFull });
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

  public async desbloquearOpciones() {
    try {
      const passwordRef = ref(this.database, '/contrasenia/contraseña'); // ← Ruta exacta
      const snapshot = await get(passwordRef);

      if (snapshot.exists()) {
        const storedPassword = snapshot.val();
        this.isAuthenticated = this.passwordInput === String(storedPassword);
      } else {
        console.warn('No se encontró la contraseña en Realtime Database');
      }
    } catch (error) {
      console.error('Error al obtener la contraseña desde Realtime Database:', error);
    }

    this.passwordInput = '';
  }
}
