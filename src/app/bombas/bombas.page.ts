import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonIcon, IonLabel, IonChip, IonButtons, IonMenuButton, AlertController } from '@ionic/angular/standalone';
import { Database, ref, onValue, set } from '@angular/fire/database';
import { checkmarkCircleOutline, closeCircleOutline, sunnyOutline, flashOutline, thermometerOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

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

  constructor(private db: Database, private alertCtrl: AlertController) { 
    addIcons({ checkmarkCircleOutline, closeCircleOutline, sunnyOutline, flashOutline, thermometerOutline });
  }

  ngOnInit() {
    onValue(ref(this.db, 'bombas/energia'), snapshot => {
      const data = snapshot.val();
      if (data) this.energia = data;
    });

    onValue(ref(this.db, 'bombas/grupo01'), snapshot => {
      const data = snapshot.val();
      if (data) this.grupo01 = data;
    });

    onValue(ref(this.db, 'bombas/grupo02'), snapshot => {
      const data = snapshot.val();
      if (data) this.grupo02 = data;
    });
  }

  async toggleBomba(grupo: 'grupo01' | 'grupo02', bomba: string, estadoActual: boolean) {
    // 1. Contar cuántas bombas están encendidas
    const totalEncendidas = [
      this.grupo01.bomba01,
      this.grupo01.bomba02,
      this.grupo02.bomba03,
      this.grupo02.bomba04
    ].filter(v => v).length;

    // 2. Si se intenta encender una nueva y ya hay 2 activas → bloquear
    if (!estadoActual && totalEncendidas >= 2) {
      const alertaMax = await this.alertCtrl.create({
        header: 'Límite alcanzado',
        message: 'Solo se pueden encender 2 bombas al mismo tiempo.',
        buttons: ['OK']
      });
      await alertaMax.present();
      return;
    }

    // 3. Mostrar confirmación antes de cambiar estado
    const alert = await this.alertCtrl.create({
      header: 'Confirmar acción',
      message: `¿Seguro que quieres ${estadoActual ? 'apagar' : 'encender'} la ${bomba.toUpperCase()}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Sí',
          handler: () => {
            const bombaRef = ref(this.db, `bombas/${grupo}/${bomba}`);
            set(bombaRef, !estadoActual);
          }
        }
      ]
    });
    await alert.present();
  }

}
