import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPuestoComponent } from './listado-puesto.component';

describe('ListadoPuestoComponent', () => {
  let component: ListadoPuestoComponent;
  let fixture: ComponentFixture<ListadoPuestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoPuestoComponent]
    });
    fixture = TestBed.createComponent(ListadoPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
