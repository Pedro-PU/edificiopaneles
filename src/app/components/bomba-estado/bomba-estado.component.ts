import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-bomba-estado',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './bomba-estado.component.html',
  styleUrls: ['./bomba-estado.component.scss']
})
export class BombaEstadoComponent {
  @Input() nombre = '';
  @Input() encendida = false;
  @Output() toggle = new EventEmitter<void>();

  // Utilizamos el icono de gota: relleno si está activa, outline si no
  get iconName() {
    return this.encendida ? 'water' : 'water-outline';
  }

  onClick() {
    this.toggle.emit();
  }
}
