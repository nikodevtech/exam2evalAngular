import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidato } from 'src/app/modelo/candidato';
import { Entrevista } from 'src/app/modelo/entrevista';
import { Puesto } from 'src/app/modelo/puesto';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { NotificacionesService } from 'src/app/servicios/notificacion-service.service';

@Component({
  selector: 'app-detalle-entrevistas',
  templateUrl: './detalle-entrevistas.component.html',
  styleUrls: ['./detalle-entrevistas.component.css'],
})
export class DetalleEntrevistasComponent {
  formEntrevista: FormGroup;
  submitted = false;
  id: string | null;
  titulo = 'Registrar nuevo entrevista';
  textoButton = 'Registrar';
  listaCandidatos: Candidato[] = [];
  listaPuestos: Puesto[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _databaseService: BaseDatosService,
    private router: Router,
    private route: ActivatedRoute,
    private _notificacionesService: NotificacionesService
  ) {
    this.formEntrevista = this.formBuilder.group({
      fechaEntrevista: ['', Validators.required],
      candidatoQueAplica: ['', Validators.required],
      puestoQueOferta: ['', Validators.required],
    });
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.getCandidatos();
    this.getPuestos();
  }

  getCandidatos() {
    this._databaseService.obtenerTodos('candidatos').subscribe((candidatos) => {
        this.listaCandidatos = candidatos;
      });
  }

  getPuestos() {
    this._databaseService.obtenerTodos('puestos').subscribe((puestos) => {
        this.listaPuestos = puestos;
      });
  }

  agregarEditarEntrevista(): void {
    this.submitted = true;
    console.log(this.formEntrevista.value);
    if (this.formEntrevista.invalid) {
      return;
    }
    if (this.id === null) {
      this.registrarEntrevista();
    } else {
      this.editarEntrevista();
    }
  }

  editarEntrevista() {
    if (this.id != null) {
      const entrevista: Entrevista = {
        id: this.id,
        fechaEntrevista: this.formEntrevista.value.fechaEntrevista,
        candidatoQueAplica: this.formEntrevista.value.candidatoQueAplica,
        puestoQueOferta: this.formEntrevista.value.postQueOferta,
      };
      this._databaseService
        .actualizar('entrevistas', entrevista)
        .then(() => {
          // Verifica si realmente se ha modificado algo antes de mostrar la notificación
          if (this.formEntrevista.dirty) {
            this._notificacionesService.notificacionModificacion('entrevista');
          }
          this.router.navigate(['/entrevistas/listado']);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }


  registrarEntrevista() {
    const entrevista: Entrevista = {
      fechaEntrevista: this.formEntrevista.value.fechaEntrevista,
      candidatoQueAplica: this.formEntrevista.value.candidatoQueAplica,
      puestoQueOferta: this.formEntrevista.value.puestoQueOferta,
    };
    this._databaseService
      .insertar('entrevistas', entrevista)
      .then(() => {
        this._notificacionesService.notificacionRegistrar('entrevista');
        this.router.navigate(['/entrevistas/listado']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  esEditar() {
    if (this.id !== null) {
      this.textoButton = 'Editar';
      this.titulo = 'Editar entrevista';
      this._databaseService
        .obtenerPorId('entrevistas', this.id)
        .subscribe((entrevista) => {
          console.log(entrevista);
          this.formEntrevista.setValue({
            fechaEntrevista: entrevista.fechaEntrevista,
            candidatoQueAplica: entrevista.candidatoQueAplica,
            puestoQueOferta: entrevista.puestoQueOferta,
          });
        });
    }
  }
}
