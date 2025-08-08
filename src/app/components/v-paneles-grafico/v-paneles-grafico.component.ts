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
  selector: 'app-v-paneles-grafico',
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon
  ],
  templateUrl: './v-paneles-grafico.component.html',
  styleUrls: ['./v-paneles-grafico.component.scss']
})
export class VPanelesGraficoComponent implements OnChanges {
  @Input() voltaje: number = 0;

  porcentaje: number = 0;
  strokeDashoffset: number = 0;
  color: string = '#00cc66';

  ngOnChanges() {
    this.porcentaje = this.mapearVoltajeAPorcentaje(this.voltaje);
    this.actualizarGauge();
  }

  private mapearVoltajeAPorcentaje(v: number): number {
    const min = 0;
    const max = 300;
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
