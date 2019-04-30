import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListaListadosComponent } from './components/lista-listados/lista-listados.component';
import { EditarListadosComponent } from './components/editar-listados/editar-listados.component';
import { BorrarListadosComponent } from './components/borrar-listados/borrar-listados.component';
import { VincularListadosComponent } from './components/vincular-listados/vincular-listados.component';
import { ListaVinculosMaquinalistadosComponent } from './components/lista-vinculos-maquinalistados/lista-vinculos-maquinalistados.component';
import { ListaStatusComponent } from './components/lista-status/lista-status.component';
import { VerLaborComponent } from './components/ver-labor/ver-labor.component';
import { ListadoLaboresComponent } from './components/listado-labores/listado-labores.component';
import { ExportarComponent } from './components/exportar/exportar.component';
import { DatePipe } from '@angular/common';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';

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
    ListaListadosComponent,
    EditarListadosComponent,
    BorrarListadosComponent,
    VincularListadosComponent,
    ListaVinculosMaquinalistadosComponent,
    ListaStatusComponent,
    VerLaborComponent,
    ListadoLaboresComponent,
    ExportarComponent
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
    AppRoutingModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule
  ],
  providers: [DatePipe, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
