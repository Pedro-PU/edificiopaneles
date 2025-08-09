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
  @Input() temperature = 0;    // temperatura actual
  @Input() min = 0;            // mínimo esperable
  @Input() max = 100;          // máximo esperable

  fillPercent = 0;             // altura de la “mercurio” en %

  ngOnChanges(changes: SimpleChanges) {
    const range = this.max - this.min;
    const relative = this.temperature - this.min;
    this.fillPercent = (relative / range) * 100;
    if (this.fillPercent < 0) this.fillPercent = 0;
    if (this.fillPercent > 100) this.fillPercent = 100;
  }
}
