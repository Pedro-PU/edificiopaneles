import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VSalidaGraficoComponent } from './v-salida-grafico.component';

describe('VSalidaGraficoComponent', () => {
  let component: VSalidaGraficoComponent;
  let fixture: ComponentFixture<VSalidaGraficoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VSalidaGraficoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VSalidaGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
