import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrevistasRoutingModule } from './entrevistas-routing.module';
import { EntrevistasComponent } from './entrevistas.component';
import { DetalleEntrevistasComponent } from './detalle-entrevistas/detalle-entrevistas.component';
import { ListadoEntrevistasComponent } from './listado-entrevistas/listado-entrevistas.component';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Submodulo de entrevistas donde se declaran todos los componentes que son utilizados 
 * y las importaciones de otros modulos ya sea de angular o el propio de renrutamiento
 */
@NgModule({
  declarations: [
    EntrevistasComponent,
    DetalleEntrevistasComponent,
    ListadoEntrevistasComponent
  ],
  imports: [
    CommonModule,
    EntrevistasRoutingModule,
    ReactiveFormsModule
  ]
})
export class EntrevistasModule { }
