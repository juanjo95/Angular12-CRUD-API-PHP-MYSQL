import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgregarEmpleadoComponent } from './componentes/agregar-empleado/agregar-empleado.component';
import { EditarEmpleadoComponent } from './componentes/editar-empleado/editar-empleado.component';
import { ListarEmpleadoComponent } from './componentes/listar-empleado/listar-empleado.component';

const routes: Routes = [
  { path: 'agregar-empleado', component: AgregarEmpleadoComponent},
  { path: 'listar-empleado', component: ListarEmpleadoComponent},
  { path: 'editar-empleado/:id', component: EditarEmpleadoComponent},
  { path: '**', pathMatch:'full', redirectTo:'/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
