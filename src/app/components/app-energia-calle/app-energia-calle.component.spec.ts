import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppEnergiaCalleComponent } from './app-energia-calle.component';

describe('AppEnergiaCalleComponent', () => {
  let component: AppEnergiaCalleComponent;
  let fixture: ComponentFixture<AppEnergiaCalleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppEnergiaCalleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppEnergiaCalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
