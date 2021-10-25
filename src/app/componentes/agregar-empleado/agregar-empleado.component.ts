import { CrudService } from 'src/app/servicio/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent implements OnInit {

  formularioDeEmpleados:FormGroup

  constructor(public formulario:FormBuilder,
              private crudService:CrudService,
              private ruteador:Router) {

    this.formularioDeEmpleados = formulario.group({
      nombre:[''],
      correo:['']
    })
  }

  ngOnInit(): void {
  }

  enviarDatos():void{
    this.crudService.agregarEmpleado(this.formularioDeEmpleados.value)
    .subscribe((respuesta:any) =>{
      if(respuesta["success"] == 1){
        Swal.fire(
          'Exito en la operacion!',
          'Se agrego existosamente el nuevo empleado!',
          'success'
        )
        this.ruteador.navigate(['/listar-empleado'])
      }
    })

  }

}
