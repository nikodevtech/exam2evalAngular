import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Puesto } from 'src/app/modelo/puesto';
import { BaseDatosService } from 'src/app/servicios/base-datos.service';
import { NotificacionesService } from 'src/app/servicios/notificacion-service.service';

@Component({
  selector: 'app-detalle-puesto',
  templateUrl: './detalle-puesto.component.html',
  styleUrls: ['./detalle-puesto.component.css']
})
export class DetallePuestoComponent {

  formPuesto: FormGroup; 
  submitted = false; 
  id: string | null; 
  titulo = 'Registrar nuevo puesto';
  textoButton = 'Registrar';

  constructor(
    private formBuilder: FormBuilder, 
    private _databaseService: BaseDatosService,
    private router: Router, 
    private route: ActivatedRoute, 
    private _notificacionesService: NotificacionesService 
  ) {
    this.formPuesto = this.formBuilder.group({
      //crea un FormGroup con estos campos
      nombre: ['', Validators.required],
      empresa: ['', Validators.required],     
    });
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }


  agregarEditarPuesto(): void {
    this.submitted = true;
    if (this.formPuesto.invalid) {
      return;
    }
    if (this.id === null) {
      this.registrarPuesto();
    } else {
      this.editarPuesto();
    }
  }


  editarPuesto() {
    if(this.id != null){
      const puesto: Puesto = {
        id : this.id,
        nombre: this.formPuesto.value.nombre,
        empresa: this.formPuesto.value.empresa,
      };
      this._databaseService
      .actualizar('puestos', puesto)
      .then(() => {
        // Verifica si realmente se ha modificado algo antes de mostrar la notificación
        if (this.formPuesto.dirty) {
          this._notificacionesService.notificacionModificacion('puesto');
        }
        this.router.navigate(['/puestos/listado']);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    

    
  }

  /**
   * Registra un nuevo puesto
   */
  registrarPuesto() {
    const puesto: Puesto = {
      nombre: this.formPuesto.value.nombre,
      empresa: this.formPuesto.value.empresa,
    };
    this._databaseService
      .insertar('puestos', puesto)
      .then(() => {
        this._notificacionesService.notificacionRegistrar('puesto');
        this.router.navigate(['/puestos/listado']);
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
      this.titulo = 'Editar puesto';
      this._databaseService
        .obtenerPorId('puestos', this.id)
        .subscribe((puesto) => {
          console.log(puesto);
          this.formPuesto.setValue({
            nombre: puesto.nombre,
            empresa: puesto.empresa,
          });
        });
    }
  }

}
