import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { UiSwitchModule } from 'ngx-toggle-switch';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaPartesComponent } from './components/lista-partes/lista-partes.component';
import { EditarPartesComponent } from './components/editar-partes/editar-partes.component';
import { BorrarParteComponent } from './components/borrar-parte/borrar-parte.component';
import { ActivadaPipe } from './pipes/activada.pipe';
import { ListaOperariosComponent } from './components/lista-operarios/lista-operarios.component';
import { EditarOperarioComponent } from './components/editar-operario/editar-operario.component';
import { BorrarOperarioComponent } from './components/borrar-operario/borrar-operario.component';
import { ListaMaquinasComponent } from './components/lista-maquinas/lista-maquinas.component';
import { BorrarMaquinasComponent } from './components/borrar-maquinas/borrar-maquinas.component';
import { EditarMaquinasComponent } from './components/editar-maquinas/editar-maquinas.component';
import { ListaTerminalesComponent } from './components/lista-terminales/lista-terminales.component';
import { EditarTerminalComponent } from './components/editar-terminal/editar-terminal.component';
import { BorrarTerminalComponent } from './components/borrar-terminal/borrar-terminal.component';
import { VincularMaquinasComponent } from './components/vincular-maquinas/vincular-maquinas.component';
import { VincularPartesComponent } from './components/vincular-partes/vincular-partes.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListaListadosComponent } from './components/lista-listados/lista-listados.component';
import { EditarListadosComponent } from './components/editar-listados/editar-listados.component';
import { BorrarListadosComponent } from './components/borrar-listados/borrar-listados.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginUserComponent,
    ListaPartesComponent,
    EditarPartesComponent,
    BorrarParteComponent,
    ActivadaPipe,
    ListaOperariosComponent,
    EditarOperarioComponent,
    BorrarOperarioComponent,
    ListaMaquinasComponent,
    BorrarMaquinasComponent,
    EditarMaquinasComponent,
    ListaTerminalesComponent,
    EditarTerminalComponent,
    BorrarTerminalComponent,
    VincularMaquinasComponent,
    VincularPartesComponent,
    ListaListadosComponent,
    EditarListadosComponent,
    BorrarListadosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
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
