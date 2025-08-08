import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VPanelesGraficoComponent } from './v-paneles-grafico.component';

describe('VPanelesGraficoComponent', () => {
  let component: VPanelesGraficoComponent;
  let fixture: ComponentFixture<VPanelesGraficoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VPanelesGraficoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VPanelesGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
