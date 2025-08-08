import { Component, inject, OnInit } from '@angular/core';
import { IonItem, IonIcon } from '@ionic/angular/standalone';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { IonLabel } from '@ionic/angular/standalone';
import { Database, ref, onValue } from '@angular/fire/database';
import { VPanelesGraficoComponent } from '../components/v-paneles-grafico/v-paneles-grafico.component';
import { VSalidaGraficoComponent } from '../components/v-salida-grafico/v-salida-grafico.component';
import { CSalidaGraficoComponent } from '../components/c-salida-grafico/c-salida-grafico.component';
import { VBateriaGraficoComponent } from '../components/v-bateria-grafico/v-bateria-grafico.component'

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonItem, IonIcon, IonLabel,IonGrid, IonRow, IonCol,
    VPanelesGraficoComponent,
    VSalidaGraficoComponent,
    CSalidaGraficoComponent,
    VBateriaGraficoComponent
  ]
})
export class FolderPage implements OnInit {
  panel1: any = {};
  panel2: any = {};

  constructor(private db: Database) {}

  ngOnInit() {
    this.getPanelData('panel01', (data) => this.panel1 = data);
    this.getPanelData('panel02', (data) => this.panel2 = data);
  }

  private getPanelData(panelName: string, callback: (data: any) => void) {
    const panelRef = ref(this.db, `paneles/${panelName}`);
    onValue(panelRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        callback({
          CSalida: data.CSalida,
          VSalida: data.VSalida,
          VPaneles: data.VPaneles,
          VBateria: data.VBateria
        });
      }
    });
  }

  
}
