import { Component, OnInit } from '@angular/core';

import { CrudService } from 'src/app/servicio/crud.service';

/* Ayudar a gestionar los controles del formulario, y asi llenar los campos que deseamos */
import { FormGroup, FormBuilder } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router'
import { EmpleadoModule } from 'src/app/servicio/empleado.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {

  formularioDeEmpleados:FormGroup
  elId:string | null;

  constructor(private activeRoute:ActivatedRoute,
              private crudService:CrudService,
              public formulario:FormBuilder,
              private rutiador:Router) {

              this.elId = this.activeRoute.snapshot.paramMap.get('id')

              this.crudService.obtenerEmpleado(this.elId)
              .subscribe( (respuesta:EmpleadoModule[]) => {

                this.formularioDeEmpleados.setValue({
                  nombre:respuesta[0]['nombre'],
                  correo:respuesta[0]['correo']
                })
              })

              this.formularioDeEmpleados = formulario.group({
                nombre:[''],
                correo:['']
              })

              }

  ngOnInit(): void {
  }

  enviarDatos():any{
    this.crudService.editarEmpleado(this.elId,this.formularioDeEmpleados.value)
    .subscribe((respuesta:any) =>{
      if(respuesta["success"] == 1){
        Swal.fire(
          'Exito en la operacion!',
          'Se actualizo existosamente el empleado!',
          'success'
        )
        this.rutiador.navigate(['/listar-empleado'])
      }
    })
  }

}
