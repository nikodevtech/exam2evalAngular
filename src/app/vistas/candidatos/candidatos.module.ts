import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatosRoutingModule } from './candidatos-routing.module';
import { CandidatosComponent } from './candidatos.component';
import { ListaCandidatosComponent } from './lista-candidatos/lista-candidatos.component';
import { DetalleCandidatosComponent } from './detalle-candidatos/detalle-candidatos.component';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Submodulo de candidatos donde se declaran todos los componentes que son utilizados 
 * y las importaciones de otros modulos ya sea de angular o el propio de routing
 */
@NgModule({
  declarations: [
    CandidatosComponent,
    ListaCandidatosComponent,
    DetalleCandidatosComponent,
  ],
  imports: [
    CommonModule,
    CandidatosRoutingModule,
    ReactiveFormsModule
  ]
})
export class CandidatosModule { }
