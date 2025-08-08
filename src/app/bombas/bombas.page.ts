import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonIcon, IonLabel, IonChip } from '@ionic/angular/standalone';
import { Database, ref, onValue } from '@angular/fire/database';
import { checkmarkCircleOutline, closeCircleOutline, sunnyOutline, flashOutline, thermometerOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { set } from '@angular/fire/database';

@Component({
  selector: 'app-bombas',
  templateUrl: './bombas.page.html',
  styleUrls: ['./bombas.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, 
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonGrid, IonRow, IonCol, IonIcon, IonLabel, IonChip,
    CommonModule, FormsModule, IonButtons, IonMenuButton
  ]
})
export class BombasPage implements OnInit {

  energia = { calle: false, solar: false };
  grupo01 = { bomba01: false, bomba02: false, temp01: 0 };
  grupo02 = { bomba03: false, bomba04: false, temp02: 0 };

  constructor(private db: Database) { 
    addIcons({ checkmarkCircleOutline, closeCircleOutline, sunnyOutline, flashOutline, thermometerOutline });
  }

  ngOnInit() {
    // Escuchar energía
    onValue(ref(this.db, 'bombas/energia'), snapshot => {
      const data = snapshot.val();
      if (data) this.energia = data;
    });

    // Escuchar grupo01
    onValue(ref(this.db, 'bombas/grupo01'), snapshot => {
      const data = snapshot.val();
      if (data) this.grupo01 = data;
    });

    // Escuchar grupo02
    onValue(ref(this.db, 'bombas/grupo02'), snapshot => {
      const data = snapshot.val();
      if (data) this.grupo02 = data;
    });
  }
  toggleBomba(grupo: 'grupo01' | 'grupo02', bomba: string, estadoActual: boolean) {
    const bombaRef = ref(this.db, `bombas/${grupo}/${bomba}`);
    set(bombaRef, !estadoActual);
  }
}
