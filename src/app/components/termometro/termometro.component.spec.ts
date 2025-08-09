import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TermometroComponent } from './termometro.component';

describe('TermometroComponent', () => {
  let component: TermometroComponent;
  let fixture: ComponentFixture<TermometroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TermometroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TermometroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
