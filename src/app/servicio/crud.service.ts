import { Injectable } from '@angular/core';

/* Comunicarnos con nuestra API, para recibir y enviar informacion  */
import { HttpClient } from '@angular/common/http';

/* Un Observable es el que nos ayuda a estar monitoreando lo que va a estar sucediendo en el
  entorno HTML junto con la informacion, que cualquier cambio que exista va a estar monitoreado
*/
import { Observable } from 'rxjs';

/* El modelo porque tiene la estructura de los datos que se van a enviar */
import { EmpleadoModule } from './empleado.module';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  /* Url Api backend PHP C.R.U.D */
  API:string = "http://localhost/empleados/"

  constructor(private clientHttp:HttpClient) { }

  /* Insertar datos en nuestra API */
  agregarEmpleado(datosEmpleado:EmpleadoModule):Observable<object>{
    return this.clientHttp.post<object>(this.API+"?insertar",datosEmpleado)
  }

  /* Consultar datos en nuestra API */
  obtenerEmpleados():Observable<EmpleadoModule[]>{
    return this.clientHttp.get<EmpleadoModule[]>(this.API)
  }

  /* Obtiene dato de un empleado en nuestra API, cual es el que sera editado */
  obtenerEmpleado(id:string|null):Observable<EmpleadoModule[]>{
    return this.clientHttp.get<EmpleadoModule[]>(this.API+"?consultar="+id)
  }

  /* Actualiza el dato de un empleado en nuestra API */
  editarEmpleado(id:string|null,datosEmpleado:EmpleadoModule):Observable<object>{
    return this.clientHttp.post<object>(this.API+"?actualizar="+id,datosEmpleado)
  }

  /* Eliminar dato en nuestra API */
  eliminarEmpleado(id:string):Observable<object>{
    return this.clientHttp.get<object>(this.API+"?borrar="+id)
  }


}
