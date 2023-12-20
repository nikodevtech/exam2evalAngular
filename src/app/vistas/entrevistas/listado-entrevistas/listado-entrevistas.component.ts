import { Component } from '@angular/core';
import { Entrevista } from 'src/app/modelo/entrevista';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { NotificacionesService } from 'src/app/servicios/notificacion-service.service';

@Component({
  selector: 'app-listado-entrevistas',
  templateUrl: './listado-entrevistas.component.html',
  styleUrls: ['./listado-entrevistas.component.css']
})
export class ListadoEntrevistasComponent {

  listaEntrevistas: Entrevista[] = [];

  constructor(
    private _databaseService: BaseDatosService,
    private _notificacionesService: NotificacionesService
    ) {}

  ngOnInit(): void {
    this.getEntrevista();
  }

  getEntrevista() {
    this._databaseService.obtenerTodos('entrevistas').subscribe((entrevistas: Entrevista[]) => {
      this.listaEntrevistas = entrevistas;
    })
  }

  eliminarEntrevista(id: string, fechaEntrevista: string) {
    this._notificacionesService.confirmarEliminar(id, fechaEntrevista, 'entrevista', 'entrevistas');
  }

}
