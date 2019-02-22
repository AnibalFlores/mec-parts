import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-toggle-switch';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaEstacionesComponent } from './components/lista-estaciones/lista-estaciones.component';
import { ListaPartesComponent } from './components/lista-partes/lista-partes.component';
import { EditarPartesComponent } from './components/editar-partes/editar-partes.component';
import { BorrarParteComponent } from './components/borrar-parte/borrar-parte.component';
import { ActivadaPipe } from './pipes/activada.pipe';
import { ListaOperacionesComponent } from './components/lista-operaciones/lista-operaciones.component';
import { ListaOperariosComponent } from './components/lista-operarios/lista-operarios.component';
import { EditarOperarioComponent } from './components/editar-operario/editar-operario.component';
import { EditarOperacionComponent } from './components/editar-operacion/editar-operacion.component';
import { BorrarOperacionComponent } from './components/borrar-operacion/borrar-operacion.component';
import { BorrarOperarioComponent } from './components/borrar-operario/borrar-operario.component';
import { ListaMaquinasComponent } from './components/lista-maquinas/lista-maquinas.component';
import { BorrarMaquinasComponent } from './components/borrar-maquinas/borrar-maquinas.component';
import { EditarMaquinasComponent } from './components/editar-maquinas/editar-maquinas.component';
import { ListaTerminalesComponent } from './components/lista-terminales/lista-terminales.component';
import { EditarTerminalComponent } from './components/editar-terminal/editar-terminal.component';
import { BorrarTerminalComponent } from './components/borrar-terminal/borrar-terminal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginUserComponent,
    ListaEstacionesComponent,
    ListaPartesComponent,
    EditarPartesComponent,
    BorrarParteComponent,
    ActivadaPipe,
    ListaOperacionesComponent,
    ListaOperariosComponent,
    EditarOperarioComponent,
    EditarOperacionComponent,
    BorrarOperacionComponent,
    BorrarOperarioComponent,
    ListaMaquinasComponent,
    BorrarMaquinasComponent,
    EditarMaquinasComponent,
    ListaTerminalesComponent,
    EditarTerminalComponent,
    BorrarTerminalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    UiSwitchModule,
    AccordionModule.forRoot(),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
