import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidato } from 'src/app/modelo/candidato';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { NotificacionesService } from 'src/app/servicios/notificacion-service.service';

@Component({
  selector: 'app-detalle-candidatos',
  templateUrl: './detalle-candidatos.component.html',
  styleUrls: ['./detalle-candidatos.component.css']
})
export class DetalleCandidatosComponent {

  formCandidato: FormGroup; 
  submitted = false; 
  id: string | null; 
  titulo = 'Registrar nuevo candidato';
  textoButton = 'Registrar';

  constructor(
    private formBuilder: FormBuilder, 
    private _databaseService: BaseDatosService,
    private router: Router, 
    private route: ActivatedRoute, 
    private _notificacionesService: NotificacionesService 
  ) {
    this.formCandidato = this.formBuilder.group({
      //crea un FormGroup con estos campos
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}[a-zA-Z]$/)]],
      email: ['', Validators.required],
      direccion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
    });
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }


  agregarEditarCandidato(): void {
    this.submitted = true;
    //Con este condicional si falta algun dato requerido en el formulario no se crea o modifica el candidato
    if (this.formCandidato.invalid) {
      return;
    }
    // Si el formulario es valido, se crea o se actualiza el candidato
    if (this.id === null) {
      this.registrarCandidato();
    } else {
      this.editarCandidato();
    }
  }


  editarCandidato() {

    if(this.id !== null){
      const candidato: Candidato = {
        id: this.id,
        nombre: this.formCandidato.value.nombre,
        apellidos: this.formCandidato.value.apellidos,
        dni: this.formCandidato.value.dni,
        email: this.formCandidato.value.email,
        direccion: this.formCandidato.value.direccion,
        fechaNacimiento: this.formCandidato.value.fechaNacimiento,
        telefono: this.formCandidato.value.telefono,
      };
      
      this._databaseService
        .actualizar('candidatos', candidato)
        .then(() => {
          // Verifica si realmente se ha modificado algo antes de mostrar la notificación
          if (this.formCandidato.dirty) {
            this._notificacionesService.notificacionModificacion('candidato');
          }
          this.router.navigate(['/candidatos/listado']);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    
  }

  /**
   * Registra un nuevo candidato
   */
  registrarCandidato() {
    const candidato: Candidato = {
      nombre: this.formCandidato.value.nombre,
      apellidos: this.formCandidato.value.apellidos,
      dni: this.formCandidato.value.dni,
      email: this.formCandidato.value.email,
      direccion: this.formCandidato.value.direccion,
      fechaNacimiento: this.formCandidato.value.fechaNacimiento,
      telefono: this.formCandidato.value.telefono,
    };
    this._databaseService
      .insertar('candidatos', candidato)
      .then(() => {
        this._notificacionesService.notificacionRegistrar('candidato');
        this.router.navigate(['/candidatos/listado']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Verifica si se esta editando o creando un nuevo candidato
   * para mostrar en los campos del form los datos correspondientes de dicho candidato
   */
  esEditar() {
    if (this.id !== null) {
      this.textoButton = 'Editar';
      this.titulo = 'Editar candidato';
      this._databaseService
        .obtenerPorId('candidatos', this.id)
        .subscribe((candidato) => {
          this.formCandidato.setValue({
            nombre: candidato.nombre,
            apellidos: candidato.apellidos,
            dni: candidato.dni,
            email: candidato.email,
            direccion: candidato.direccion,
            fechaNacimiento: candidato.fechaNacimiento,
            telefono: candidato.telefono,          
          });
        });
    }
  }

}
