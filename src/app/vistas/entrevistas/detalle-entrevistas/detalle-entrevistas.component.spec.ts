import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEntrevistasComponent } from './detalle-entrevistas.component';

describe('DetalleEntrevistasComponent', () => {
  let component: DetalleEntrevistasComponent;
  let fixture: ComponentFixture<DetalleEntrevistasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleEntrevistasComponent]
    });
    fixture = TestBed.createComponent(DetalleEntrevistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
