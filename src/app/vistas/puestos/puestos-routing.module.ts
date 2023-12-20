import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PuestosComponent } from './puestos.component';
import { ListadoPuestoComponent } from './listado-puesto/listado-puesto.component';
import { DetallePuestoComponent } from './detalle-puesto/detalle-puesto.component';

const routes: Routes = [
  { path: '', component: PuestosComponent, children: [
    {path: 'listado', component: ListadoPuestoComponent},
    {path: 'crear', component: DetallePuestoComponent},
    {path: 'editar/:id', component: DetallePuestoComponent},
    {path: '**', redirectTo: 'listado', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuestosRoutingModule { }
