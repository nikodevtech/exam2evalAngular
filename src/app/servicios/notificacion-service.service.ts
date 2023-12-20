import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { BaseDatosService } from './base-datos.service';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  constructor(private _baseDatosService: BaseDatosService) { }

  /**
  * Muestra una notificación de éxito para la modificación de un elemento.
  * @param {string} elementoAnotificar - Nombre del elemento modificado.
  */
  notificacionModificacion(elementoAnotificar: string) {
   Swal.fire({
     title: `${elementoAnotificar} se ha modificado con exito`,
     text: `${elementoAnotificar} se ha modificado`,
     icon: 'info',
   });
 }

 /**
  * Muestra una notificación de éxito para el registro de un elemento.
  * @param {string} elementoAnotificar - Nombre del elemento registrado.
  */
 notificacionRegistrar(elementoAnotificar: string) {
   Swal.fire({
     title: `${elementoAnotificar} se ha registrado con exito`,
     text: `${elementoAnotificar} se ha registrado`,
     icon: 'success',
   });
 }

 /**
  * Muestra una confirmación para eliminar un elemento y realiza la acción si es confirmada.
  * @param {string} id - Identificador único del elemento a eliminar.
  * @param {string} nombre - Nombre del elemento a eliminar.
  * @param {string} elementoEliminar - Tipo de elemento que se va a eliminar.
  * @param {string} coleccion - Nombre de la colección en la base de datos.
  */
 confirmarEliminar(
   id: string,
   nombre: string,
   elementoEliminar: string,
   coleccion: string
 ) {
   Swal.fire({
     title: `¿Estás seguro de eliminar ${elementoEliminar} ${nombre}?`,
     text: 'Esta acción no se puede deshacer',
     icon: 'error',
     showCancelButton: true,
     confirmButtonColor: '#d33',
     cancelButtonColor: '#3366ff',
     confirmButtonText: 'Confirmar',
     cancelButtonText: 'Cancelar',
   }).then((result) => {
     if (result.isConfirmed) {
       // Si se confirma, realiza la eliminación a través del servicio FirebaseService
       this._baseDatosService
         .eliminar(coleccion, id)
         .then(() => {
           console.log(`${elementoEliminar} eliminado`);
         })
         .catch((error) => {
           console.log(error);
         });
       Swal.fire(
         // Muestra una notificación de éxito
         '¡Acción completada!',
         `${elementoEliminar} se ha eliminado con exito.`,
         'success'
       );
     }
   });
 }

}
