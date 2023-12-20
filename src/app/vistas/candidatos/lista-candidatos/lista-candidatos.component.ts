import { Component } from '@angular/core';
import { Candidato } from 'src/app/modelo/candidato';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { NotificacionesService } from 'src/app/servicios/notificacion-service.service';

@Component({
  selector: 'app-lista-candidatos',
  templateUrl: './lista-candidatos.component.html',
  styleUrls: ['./lista-candidatos.component.css']
})
export class ListaCandidatosComponent {

  listaCandidatos: Candidato[] = [];

  constructor(
    private _databaseService: BaseDatosService,
    private _notificacionesService: NotificacionesService
    ) {}

  ngOnInit(): void {
    this.getCandidato();
  }

  getCandidato() {
    this._databaseService.obtenerTodos('candidatos').subscribe((candidatos: Candidato[]) => {
      this.listaCandidatos = candidatos;
    })
  }


  eliminarCandidato(id: string, dni: string) {
    this._notificacionesService.confirmarEliminar(id, dni, 'candidato', 'candidatos');
  }

}
