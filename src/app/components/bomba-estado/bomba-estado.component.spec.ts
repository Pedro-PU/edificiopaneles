import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BombaEstadoComponent } from './bomba-estado.component';

describe('BombaEstadoComponent', () => {
  let component: BombaEstadoComponent;
  let fixture: ComponentFixture<BombaEstadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BombaEstadoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BombaEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
