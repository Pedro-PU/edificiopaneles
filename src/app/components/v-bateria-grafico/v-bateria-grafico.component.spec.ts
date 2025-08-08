import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VBateriaGraficoComponent } from './v-bateria-grafico.component';

describe('VBateriaGraficoComponent', () => {
  let component: VBateriaGraficoComponent;
  let fixture: ComponentFixture<VBateriaGraficoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VBateriaGraficoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VBateriaGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
