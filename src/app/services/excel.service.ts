import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Workbook } from 'exceljs'; // en windows
import * as fs from 'file-saver';
import * as logoFile from 'src/assets/mec_logo.js';
import { DatePipe } from '@angular/common';
import * as Excel from "exceljs/dist/exceljs.min.js"; // en linux
import * as ExcelProper from "exceljs"; // en linux
import { Labor } from '../classes/labor';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const baseUrl = 'http://localhost:3000';
const EXCEL_FORMATS = {
  DATE: { numFmt: 'dd/mm/yyyy' },
  DATE_TIME: { numFmt: 'dd/mm/yyyy hh:mm:ss' },
  TIME: { numFmt: 'hh:mm:ss' }
}

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  labores: Labor[] = [];
  data = [];

  constructor(private datePipe: DatePipe, private httpCli: HttpClient) {

  }

  getLabores(desde: Date, hasta: Date ) {
    return this.httpCli.get(baseUrl + '/api/rangolabores/'+ desde.toISOString()+'/'+ hasta.toISOString(), httpOptions);
  }

  generarExcel(desde: Date, hasta: Date) {
    this.getLabores(desde, hasta).subscribe((lab: Labor[]) => {
      this.labores = lab;
      this.buildExcel(desde, hasta);
    });
  }

  gethorafinal(inicio: Date, duracion: number): string {
    let ini = new Date(this.datePipe.transform(inicio, 'yyyy-MM-dd HH:mm:ss'));
    //let dur = new Date(this.datePipe.transform(duracion, 'yyyy-MM-dd HH:mm:ss'));
    return this.datePipe.transform(ini.getTime() + this.getMilisegundos(duracion), 'yyyy-MM-dd HH:mm:ss');
  }

  getDateForExcel(date: Date) {
    return new Date(Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()));
  }

  getMilisegundos(dura: any) {
    var duratStr: String = dura;
    let milisegundos = 0;
    if (duratStr) {
      let valores = duratStr.split(':');
      let horas = parseInt(valores[0]);
      let min = parseInt(valores[1]);
      let seg = parseInt(valores[2]);
      milisegundos = horas * 3600 + min * 60 + seg * 1;
    }
    return milisegundos * 1000;
  }

  buildExcel(Desde: Date, Hasta: Date) {
    //Excel Title, Header, Data
    const title = 'Lista de Labores';
    const header = ["#", "Nombre", "Operador", "Orden", "Parte", "Inicio", "Final", "Cantidad", "Aptas", "Rechazos", "Terminadas", "Observaciones", "Inicio PAP", "Final PAP", "Tiempo PAP", "Inicio MEC", "Final MEC", "Tiempo MEC", "Inicio OPE", "Final OPE", "Tiempo OPE"]
    this.data = [];
    this.labores.forEach((l, index) => {
      this.data.push([
        l.id,
        l.nombre,
        l.operador,
        l.nroorden,
        l.parte,
        l.inicio ? this.getDateForExcel(new Date(l.inicio)) : '',
        l.final ? this.getDateForExcel(new Date(l.final)) : '',
        l.aptas + l.rechazos,
        l.aptas,
        l.rechazos,
        l.terminadas ? 'Sí' : 'No',
        l.observacion,
        l.iniciopap ? this.getDateForExcel(new Date(l.iniciopap)) : '',
        l.iniciopap ? this.getDateForExcel(new Date(this.gethorafinal(l.iniciopap, l.duracionpap))) : '',
        l.iniciopap ? { formula: '+N' + (index + 6) + '-M' + (index + 6) } : '',
        l.iniciomec ? this.getDateForExcel(new Date(l.iniciomec)) : '',
        l.iniciomec ? this.getDateForExcel(new Date(this.gethorafinal(l.iniciomec, l.duracionmec))) : '',
        l.iniciomec ? { formula: '+Q' + (index + 6) + '-P' + (index + 6) } : '',
        l.inicioope ? this.getDateForExcel(new Date(l.inicioope)) : '',
        l.inicioope ? this.getDateForExcel(new Date(this.gethorafinal(l.inicioope, l.duracionope))) : '',
        l.inicioope ? { formula: '+T' + (index + 6) + '-S' + (index + 6) } : '',
      ]);
      // console.log(this.labores);  

    });
    //Crea planilla y hoja
    //let workbook = new Workbook(); // en windows
    let workbook: ExcelProper.Workbook = new Excel.Workbook(); // en linux
    let worksheet = workbook.addWorksheet('Datos');


    //fila y formato
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Arial', family: 4, size: 16, bold: true }
    worksheet.addRow([]);
    // Emisión: 28/04/2019 01:12 | Rango: 27/4/2019 00:00 al 27/4/2019 23:59:59 | Total de registros: 4
    let subTitleRow = 'Emisión: ' + this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm');
    subTitleRow += '| Rango: ' + this.datePipe.transform(Desde, 'dd/MM/yyyy HH:mm');
    subTitleRow += ' al ' + this.datePipe.transform(Hasta, 'dd/MM/yyyy HH:mm');
    subTitleRow += '| Total de registros: ' + this.data.length;
    worksheet.addRow([subTitleRow]);

    //Fila vacia 
    worksheet.addRow([]);

    //Encabezados
    let headerRow = worksheet.addRow(header);

    // Estilo de celda : Relleno y Borde
    headerRow.eachCell((cell, number) => {
      cell.style = { alignment: { horizontal: 'center', vertical: 'middle' }, font: {bold: true} }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFCB450' },// naranja suave
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    })
    // worksheet.addRows(data);


    // Agrega Datos y Formato Condicional
    this.data.forEach(d => {
      let row = worksheet.addRow(d);
      let aptas = row.getCell(8);
      let inicio = row.getCell(6);
      inicio.numFmt = EXCEL_FORMATS.DATE_TIME.numFmt;
      let final = row.getCell(7);
      final.numFmt = EXCEL_FORMATS.DATE_TIME.numFmt;
      let inipap = row.getCell(13);
      inipap.numFmt = EXCEL_FORMATS.DATE_TIME.numFmt;
      let finpap = row.getCell(14);
      finpap.numFmt = EXCEL_FORMATS.DATE_TIME.numFmt;
      let tiempopap = row.getCell(15);
      tiempopap.numFmt = EXCEL_FORMATS.TIME.numFmt;
      let inimec = row.getCell(16);
      inimec.numFmt = EXCEL_FORMATS.DATE_TIME.numFmt;
      let finmec = row.getCell(17);
      finmec.numFmt = EXCEL_FORMATS.DATE_TIME.numFmt;
      let tiempomec = row.getCell(18);
      tiempomec.numFmt = EXCEL_FORMATS.TIME.numFmt;
      let iniope = row.getCell(19);
      iniope.numFmt = EXCEL_FORMATS.DATE_TIME.numFmt;
      let finope = row.getCell(20);
      finope.numFmt = EXCEL_FORMATS.DATE_TIME.numFmt;
      let tiempoope = row.getCell(21);
      tiempoope.numFmt = EXCEL_FORMATS.TIME.numFmt;
      if (+aptas.value < 1) { // si las aptas son 0 resalta en rojo
        aptas.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF9999' }
        }
      }
    });

    //Imagen logo mec-parts en Base64
    let logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });

    worksheet.addImage(logo, {
      tl: { col: 10, row: 0 },
      br: { col: 11, row: 4 },
      editAs: 'oneCell'
    });

    worksheet.getColumn(1).width = 5;// #
    worksheet.getColumn(2).width = 30;// Nombre
    worksheet.getColumn(3).width = 30;// Operador
    worksheet.getColumn(4).width = 10;// Orden
    worksheet.getColumn(5).width = 15;// Parte
    worksheet.getColumn(6).width = 21;// Inicio
    worksheet.getColumn(7).width = 21;// Final
    worksheet.getColumn(8).width = 11;// Cantidad
    worksheet.getColumn(9).width = 11;// Aptas
    worksheet.getColumn(10).width = 11;// Rechazos
    worksheet.getColumn(11).width = 13;// Terminadas
    worksheet.getColumn(12).width = 60;// Observaciones
    worksheet.getColumn(13).width = 21;// Inicio pap
    worksheet.getColumn(14).width = 21;// Final pap
    worksheet.getColumn(15).width = 14;// Tiempo pap
    worksheet.getColumn(16).width = 21;// Inicio mec
    worksheet.getColumn(17).width = 21;// Final mec
    worksheet.getColumn(18).width = 14;// Tiempo mec
    worksheet.getColumn(19).width = 21;// Inicio ope
    worksheet.getColumn(20).width = 21;// Final ope
    worksheet.getColumn(21).width = 14;// Tiempo ope
    worksheet.addRow([]);



    // worksheet.addBackgroundImage(logo);



    worksheet.mergeCells('A1:K2');// funde celda titulo
    worksheet.getCell('L,1').value = 'Mec-Parts';
    worksheet.mergeCells('L1:U2');
    worksheet.mergeCells('A3:U4');// funde celda fecha del reporte

    //Pie
    let footerRow = worksheet.addRow(['Generado por sistema.']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    //Fundir Celdas
    worksheet.mergeCells(`A${footerRow.number}:U${footerRow.number}`);

    //Generar archivo de Excel con un nombre
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'reporte.xlsx');
    })

  }
}
