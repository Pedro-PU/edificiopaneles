import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BombasPage } from './bombas.page';

describe('BombasPage', () => {
  let component: BombasPage;
  let fixture: ComponentFixture<BombasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BombasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
