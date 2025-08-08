import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-v-bateria-grafico',
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon
  ],
  templateUrl: './v-bateria-grafico.component.html',
  styleUrls: ['./v-bateria-grafico.component.scss']
})
export class VBateriaGraficoComponent implements OnChanges {
  @Input() voltajeBateria: number = 243;

  porcentaje: number = 0;
  strokeDashoffset: number = 0;
  color: string = '#00cc66';

  ngOnChanges(): void {
    const nuevoPorcentaje = this.mapearBateriaAPorcentaje(this.voltajeBateria);
    if (nuevoPorcentaje !== this.porcentaje) {
      this.porcentaje = nuevoPorcentaje;
      this.actualizarGauge();
    }
  }

  private mapearBateriaAPorcentaje(v: number): number {
    const min = 243;
    const max = 260;
    const clamped = Math.max(min, Math.min(max, v));
    return ((clamped - min) / (max - min)) * 100;
  }

  private actualizarGauge() {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    this.strokeDashoffset = circumference * (1 - this.porcentaje / 100);

    if (this.porcentaje < 40) {
      this.color = '#ff4d4d';
    } else if (this.porcentaje < 80) {
      this.color = '#ffcc00';
    } else {
      this.color = '#00cc66';
    }
  }
}
