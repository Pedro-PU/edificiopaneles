import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-termometro',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './termometro.component.html',
  styleUrls: ['./termometro.component.scss']
})
export class TermometroComponent implements OnChanges {
  @Input() temperature = 0;
  @Input() min = 0;
  @Input() max = 100;

  fillPercent = 0;
  mercuryGradient = '';

  ngOnChanges(changes: SimpleChanges) {
    const range = this.max - this.min;
    const relative = this.temperature - this.min;
    this.fillPercent = Math.max(0, Math.min(100, (relative / range) * 100));
    this.mercuryGradient = this.getGradient(this.temperature);
  }

  getGradient(temp: number): string {
    if (temp < 10) return 'linear-gradient(to top, #2196f3, #90caf9)';
    if (temp < 25) return 'linear-gradient(to top, #43a047, #a5d6a7)';
    return 'linear-gradient(to top, #e53935, #ff8a80)';
  }
}
