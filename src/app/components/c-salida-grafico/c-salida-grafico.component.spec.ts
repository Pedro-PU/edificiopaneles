import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CSalidaGraficoComponent } from './c-salida-grafico.component';

describe('CSalidaGraficoComponent', () => {
  let component: CSalidaGraficoComponent;
  let fixture: ComponentFixture<CSalidaGraficoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CSalidaGraficoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CSalidaGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
