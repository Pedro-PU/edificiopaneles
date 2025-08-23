import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { PanelData } from '../../datos/datos.page'; // importa la interfaz

@Component({
  selector: 'app-chart-panel',
  templateUrl: './chart-panel.component.html',
  styleUrls: ['./chart-panel.component.scss'],
  standalone: true,
})
export class ChartPanelComponent implements AfterViewInit {
  @Input() datos: PanelData[] = [];
  @Input() curvaGlobal: { hora: string, valor: number }[] = [];
  @Input() tipo: keyof PanelData = 'CSalida';

  @ViewChild('chartCanvas') canvasRef!: ElementRef;

  ngAfterViewInit() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');

    const horas = this.datos.map(d => d.hora);
    const valores = this.datos.map(d => d[this.tipo] as number);

    const globalValores = this.curvaGlobal.map(d => d.valor);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: horas,
        datasets: [
          {
            label: `${this.tipo} diario`,
            data: valores,
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            fill: true,
            tension: 0.3
          },
          {
            label: `${this.tipo} global`,
            data: globalValores,
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            fill: false,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: `${this.tipo.charAt(0).toUpperCase() + this.tipo.slice(1)} vs Hora`  }
        },
        scales: {
          x: { title: { display: true, text: 'Hora' } },
          y: { title: { display: true, text: this.tipo } }
        }
      }
    });
  }
}
