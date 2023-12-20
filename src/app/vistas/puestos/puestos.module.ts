import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PuestosRoutingModule } from './puestos-routing.module';
import { PuestosComponent } from './puestos.component';
import { DetallePuestoComponent } from './detalle-puesto/detalle-puesto.component';
import { ListadoPuestoComponent } from './listado-puesto/listado-puesto.component';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Submodulo de puestos de trabajo donde se declaran todos los componentes que son utilizados 
 * y las importaciones de otros modulos ya sea de angular o el propio de renrutamiento
 */
@NgModule({
  declarations: [
    PuestosComponent,
    DetallePuestoComponent,
    ListadoPuestoComponent
  ],
  imports: [
    CommonModule,
    PuestosRoutingModule,
    ReactiveFormsModule
  ]
})
export class PuestosModule { }
