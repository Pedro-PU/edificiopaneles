import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';


import { Database, ref, onValue } from '@angular/fire/database';
import { ChartPanelComponent } from '../components/chart-panel/chart-panel.component';
interface DatosPorFecha {
  panel01: PanelData[];
  panel02: PanelData[];
}

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    ChartPanelComponent 
  ]

})
export class DatosPage implements OnInit {

  datosAgrupados: Record<string, DatosPorFecha> = {};

  constructor(private db: Database) {}

  ngOnInit() {
    const datosRef = ref(this.db, 'datos');
    onValue(datosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.organizarDatos(data);
      }
    });
  }

  private organizarDatos(data: any) {
    const agrupado: Record<string, DatosPorFecha> = {};

    Object.keys(data).forEach(panel => {
      Object.keys(data[panel]).forEach(mensaje => {
        const item: PanelData = data[panel][mensaje];
        const fecha = item.dia;
        
        item.potencia = item.VSalida * item.CSalida;

        if (!agrupado[fecha]) {
          agrupado[fecha] = { panel01: [], panel02: [] };
        }

        agrupado[fecha][panel as 'panel01' | 'panel02'].push(item);
      });
    });

    // Ordenar horas en cada panel
    Object.keys(agrupado).forEach((fecha: string) => {
      (['panel01', 'panel02'] as ('panel01' | 'panel02')[]).forEach(panel => {
        agrupado[fecha][panel].sort((a, b) => a.hora.localeCompare(b.hora));
      });
    });

    // Ordenar fechas de más reciente a más antigua sin usar fromEntries
    const fechasOrdenadas = Object.keys(agrupado).sort((a, b) => b.localeCompare(a));
    const nuevoAgrupado: Record<string, DatosPorFecha> = {};
    fechasOrdenadas.forEach(fecha => {
      nuevoAgrupado[fecha] = agrupado[fecha];
    });
    this.datosAgrupados = nuevoAgrupado;
  }

  getCurvaPotencia(): { hora: string, valor: number }[] {
    const puntos: { hora: string, valor: number }[] = [];

    Object.values(this.datosAgrupados).forEach(fecha => {
      (['panel01', 'panel02'] as const).forEach(panel => {
        fecha[panel].forEach((dato: PanelData) => {
          if (dato.potencia !== undefined) {
            puntos.push({ hora: dato.hora, valor: dato.potencia });
          }
        });
      });
    });

    return puntos.sort((a, b) => a.hora.localeCompare(b.hora));
  }


}

export interface PanelData {
  CSalida: number;
  VBateria: number;
  VPaneles: number;
  VSalida: number;
  dia: string;
  hora: string;
  potencia?: number;
}
export type PanelNumericKey = 'CSalida' | 'VBateria' | 'VPaneles' | 'VSalida';

