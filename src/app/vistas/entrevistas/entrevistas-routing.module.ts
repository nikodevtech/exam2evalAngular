import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrevistasComponent } from './entrevistas.component';
import { ListadoEntrevistasComponent } from './listado-entrevistas/listado-entrevistas.component';
import { DetalleEntrevistasComponent } from './detalle-entrevistas/detalle-entrevistas.component';

const routes: Routes = [
  { path: '', component: EntrevistasComponent, children: [
    {path: 'listado', component: ListadoEntrevistasComponent},
    {path: 'crear', component: DetalleEntrevistasComponent},
    {path: 'editar/:id', component: DetalleEntrevistasComponent},
    {path: '**', redirectTo: 'listado', pathMatch: 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrevistasRoutingModule { }
