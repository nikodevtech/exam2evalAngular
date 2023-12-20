import { Component } from '@angular/core';
import { Puesto } from 'src/app/modelo/puesto';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { NotificacionesService } from 'src/app/servicios/notificacion-service.service';

@Component({
  selector: 'app-listado-puesto',
  templateUrl: './listado-puesto.component.html',
  styleUrls: ['./listado-puesto.component.css']
})
export class ListadoPuestoComponent {

  listaPuestos: Puesto[] = [];

  constructor(
    private _databaseService: BaseDatosService,
    private _notificacionesService: NotificacionesService
    ) {}

  ngOnInit(): void {
    this.getPuesto();
  }

  getPuesto() {
    this._databaseService.obtenerTodos('puestos').subscribe((puestos: Puesto[]) => {
      this.listaPuestos = puestos;
    })
  }


  eliminarPuesto(id: string, dni: string) {
    this._notificacionesService.confirmarEliminar(id, dni, 'puesto', 'puestos');
  }


}
