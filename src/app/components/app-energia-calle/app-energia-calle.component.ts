import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-energia-calle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-energia-calle.component.html',
  styleUrls: ['./app-energia-calle.component.scss']
  
})
export class AppEnergiaCalleComponent {
  @Input() activa = false;
  @Input() nombre = 'Calle';
}
