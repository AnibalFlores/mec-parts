import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { ListaPartesComponent } from './components/lista-partes/lista-partes.component';
import { EditarPartesComponent } from './components/editar-partes/editar-partes.component';
import { BorrarParteComponent } from './components/borrar-parte/borrar-parte.component';
import { ListaOperariosComponent } from './components/lista-operarios/lista-operarios.component';
import { EditarOperarioComponent } from './components/editar-operario/editar-operario.component';
import { BorrarOperarioComponent } from './components/borrar-operario/borrar-operario.component';
import { ListaMaquinasComponent } from './components/lista-maquinas/lista-maquinas.component';
import { EditarMaquinasComponent } from './components/editar-maquinas/editar-maquinas.component';
import { BorrarMaquinasComponent } from './components/borrar-maquinas/borrar-maquinas.component';
import { ListaTerminalesComponent } from './components/lista-terminales/lista-terminales.component';
import { EditarTerminalComponent } from './components/editar-terminal/editar-terminal.component';
import { BorrarTerminalComponent } from './components/borrar-terminal/borrar-terminal.component';
import { VincularMaquinasComponent } from './components/vincular-maquinas/vincular-maquinas.component';
import { ListaListadosComponent } from './components/lista-listados/lista-listados.component';
import { EditarListadosComponent } from './components/editar-listados/editar-listados.component';
import { BorrarListadosComponent } from './components/borrar-listados/borrar-listados.component';

const routes: Routes = [
  // Ingreso
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginUserComponent },
  // Partes
  { path: 'lista-partes', component: ListaPartesComponent },
  { path: 'editar-parte/:id', component: EditarPartesComponent },
  { path: 'borrar-parte/:id', component: BorrarParteComponent },
  { path: 'nueva-parte', component: EditarPartesComponent },
  // Operarios
  { path: 'lista-operarios', component: ListaOperariosComponent },
  { path: 'editar-operario/:id', component: EditarOperarioComponent },
  { path: 'borrar-operario/:id', component: BorrarOperarioComponent },
  { path: 'nuevo-operario', component: EditarOperarioComponent },
   // Listados
   { path: 'lista-listados', component: ListaListadosComponent },
   { path: 'editar-listado/:id', component: EditarListadosComponent },
   { path: 'borrar-listado/:id', component: BorrarListadosComponent },
   { path: 'nuevo-listado', component: EditarListadosComponent },
  // Maquinas
  { path: 'lista-maquinas', component: ListaMaquinasComponent },
  { path: 'editar-maquina/:id', component: EditarMaquinasComponent },
  { path: 'borrar-maquina/:id', component: BorrarMaquinasComponent },
  { path: 'nueva-maquina', component: EditarMaquinasComponent },
  // Terminales
  { path: 'lista-terminales', component: ListaTerminalesComponent },
  { path: 'editar-terminal/:id', component: EditarTerminalComponent },
  { path: 'borrar-terminal/:id', component: BorrarTerminalComponent },
  { path: 'nuevo-terminal', component: EditarTerminalComponent },
  { path: 'asociar-terminal-maquina', component: VincularMaquinasComponent },
  // Default
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
