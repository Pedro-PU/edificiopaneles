import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppEnergiaSolarComponent } from './app-energia-solar.component';

describe('AppEnergiaSolarComponent', () => {
  let component: AppEnergiaSolarComponent;
  let fixture: ComponentFixture<AppEnergiaSolarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppEnergiaSolarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppEnergiaSolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
