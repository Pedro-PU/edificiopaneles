import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { Database, ref, onValue, set } from '@angular/fire/database';
import { checkmarkCircleOutline, closeCircleOutline, sunnyOutline, flashOutline, thermometerOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { BombaEstadoComponent } from '../components/bomba-estado/bomba-estado.component';
import { TermometroComponent }   from '../components/termometro/termometro.component';
import { VBateriaGraficoComponent } from '../components/v-bateria-grafico/v-bateria-grafico.component'
import { AppEnergiaCalleComponent } from '../components/app-energia-calle/app-energia-calle.component';
import { AppEnergiaSolarComponent } from '../components/app-energia-solar/app-energia-solar.component';

@Component({
  selector: 'app-bombas',
  templateUrl: './bombas.page.html',
  styleUrls: ['./bombas.page.scss'],
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
  IonicModule,
  BombaEstadoComponent,
  TermometroComponent,
  VBateriaGraficoComponent,
  AppEnergiaCalleComponent,
  AppEnergiaSolarComponent
]
})
export class BombasPage implements OnInit {

  energia = { calle: false, solar: false };
  grupo01 = { bomba01: false, bomba02: false, temp01: 0 };
  grupo02 = { bomba03: false, bomba04: false, temp02: 0 };
  panel2: any = {};
  constructor(private db: Database, private alertCtrl: AlertController) { 
    addIcons({ checkmarkCircleOutline, closeCircleOutline, sunnyOutline, flashOutline, thermometerOutline });
  }

  ngOnInit() {
    this.getPanelData('panel02', (data) => this.panel2 = data);
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

  private getPanelData(panelName: string, callback: (data: any) => void) {
    const panelRef = ref(this.db, `paneles/${panelName}`);
    onValue(panelRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        callback({
          VBateria: data.VBateria
        });
      }
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
