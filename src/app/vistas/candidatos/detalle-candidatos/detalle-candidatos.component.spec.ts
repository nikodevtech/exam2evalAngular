import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCandidatosComponent } from './detalle-candidatos.component';

describe('DetalleCandidatosComponent', () => {
  let component: DetalleCandidatosComponent;
  let fixture: ComponentFixture<DetalleCandidatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleCandidatosComponent]
    });
    fixture = TestBed.createComponent(DetalleCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
