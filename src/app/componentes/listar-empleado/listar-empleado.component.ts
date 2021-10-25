import { Component, OnInit } from '@angular/core';

import { CrudService } from 'src/app/servicio/crud.service';
import { EmpleadoModule } from 'src/app/servicio/empleado.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-empleado',
  templateUrl: './listar-empleado.component.html',
  styleUrls: ['./listar-empleado.component.css']
})
export class ListarEmpleadoComponent implements OnInit {

  empleados:EmpleadoModule[];

  constructor(private crudService:CrudService) {}

  ngOnInit(): void {
    this.crudService.obtenerEmpleados()
    .subscribe( (respuesta:EmpleadoModule[] | any) => {
      if(respuesta['success'] != 0){
        this.empleados = respuesta
      }
    })
  }

  borrarEmpleado(id:string,iControl:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: "Que desea eliminar el empleado, no podrá revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, bórralo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.crudService.eliminarEmpleado(id)
        .subscribe((respuesta:any) => {
          if(respuesta["success"] == 1){
            swalWithBootstrapButtons.fire(
              'Exito en la operacion!',
              'Se elimino existosamente el empleado!',
              'success'
            )
            this.empleados.splice(iControl,1)

          }else if(respuesta["success"] == 0){
            Swal.fire(
              'Error en la operacion!',
              'No se pudo elimininar el empleado!',
              'error'
            )
          }
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelada',
          'El empleado está seguro, no se elimino',
          'error'
        )
      }
    })
  }


}
