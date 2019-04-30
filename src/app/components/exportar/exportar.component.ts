import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/excel.service';
import * as _moment from 'moment';
import { unitOfTime } from 'moment';
import { DateButton, DlDateTimePickerChange } from 'angular-bootstrap-datetimepicker';
import { Labor } from 'src/app/classes/labor';

let Moment = _moment;

if ('default' in _moment) {
  Moment = _moment['default'];
}

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.component.html',
  styleUrls: ['./exportar.component.css']
})
export class ExportarComponent implements OnInit {
  titulo = 'Exportar Datos';
  sinfechaspasadas = false;// si es true no se perminten fechas anteriores a hoy
  moment = Moment;
  Desde: Date;
  Hasta: Date;
  duracionmin = 60;// rango minimo de 60 minutos
  registros = 0;


  constructor(private excelService: ExcelService) {
    this.moment.locale('es');

  }

  ngOnInit() {
    // calculo 24 horas del dia anterior como rango por defecto para el reporte
    this.Desde = this.dialaboral();
    this.Desde.setHours(0);
    this.Desde.setMinutes(0);
    // console.log(this.Desde);
    this.Hasta = new Date();
    this.Hasta.setDate(this.Desde.getDate() + 1);
    this.Hasta.setHours(0);
    this.Hasta.setMinutes(0);
    // console.log(this.Hasta);

  }

  private dialaboral(): Date {
    const laboral = new Date();
    laboral.setDate(laboral.getDate() - 1);
    while (!this.eslaboral(laboral)) {
      laboral.setDate(laboral.getDate() - 1);
    }

    return laboral;
  }

  private eslaboral(date: Date) {
    const dia = date.getDay();
    const noEsDomingo = (dia > 0 && dia < 6);// 7mo dia es domingo  
    return noEsDomingo; // && !esFeriado? <- no se si hay un listado para argentina
  }

  desdeDatePickerFilter = (dateButton: DateButton, viewName: string) => {
    return this.sinfechaspasadas
      ? dateButton.value >= this.moment().startOf(viewName as unitOfTime.StartOf).valueOf()
      : true;
  };

  hastaDatePickerFilter = (dateButton: DateButton, viewName: string) => {
    // Trunca el 'now' al inicio de la vista actual. ej. 'dia', etc.
    const now = this.moment().startOf(viewName as unitOfTime.StartOf).valueOf();

    // el desde no debe ponerse al dia de hoy.
    // En su lugar, usar MIN_SAFE_INTEGER como valor `default` de desde.
    const inicio = (this.Desde// si esta fijado el desde ponemos desde+duracionminima
      ? this.moment(this.Desde).add(this.duracionmin, 'minute').startOf(viewName as unitOfTime.StartOf).valueOf()
      : Number.MIN_SAFE_INTEGER);// si no esta fijado el desde va al entero mas chico admitido como default

    return this.sinfechaspasadas // si se bloquean fechas del pasado
      ? dateButton.value >= now && dateButton.value >= inicio // aplicamos el hasta si es mayor a hoy y al inicio
      : dateButton.value >= inicio;// aplicamos si el hasta es mayor al inicio
  };

  desdeChange(event) {// controlamos cada cambio de valor en el desde
    if (event.value) {
      if (this.Hasta && this.Hasta.getTime() < this.moment(event.value).add(this.duracionmin, 'minute').valueOf()) {
        this.Hasta = undefined;// si el hasta es menor al desde borramos el hasta
      }
      this.total_registros();
    }
  }

  hastaChange(event) {// controlamos cada cambio de valor en el hasta
    if (event.value) {
      if (this.Desde && this.Desde.getTime() > this.moment(event.value).subtract(this.duracionmin, 'minute').valueOf()) {
        this.Desde = undefined; // si el desde es mayor al hasta borramos el desde
      }
      this.total_registros();
    }
  }

  private total_registros() {
    if (this.Desde && this.Hasta) {
      this.excelService.getLabores(this.Desde, this.Hasta)
        .subscribe((l: Labor[]) => {
          this.registros = l.length;
        });
    }
  }

  generarExcel() {
    this.excelService.generarExcel(this.Desde, this.Hasta);
  }
}
