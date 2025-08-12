import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-energia-solar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-energia-solar.component.html',
  styleUrls: ['./app-energia-solar.component.scss']
})
export class AppEnergiaSolarComponent {
  @Input() activa = false;
  @Input() nombre = 'Solar';
}