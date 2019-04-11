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


@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  labores: Labor[] = [];
  data = [];

  constructor(private datePipe: DatePipe, private httpCli: HttpClient) {
   
  }

  getLabores() {
    return this.httpCli.get(baseUrl + '/api/labores', httpOptions);
  }

  generarExcel() {
    this.getLabores().subscribe((lab: Labor[]) => {
      this.labores = lab;
      this.buildExcel();
    });}

  buildExcel(){  
    //Excel Title, Header, Data
    const title = 'Lista de Labores';
    const header = ["#", "Nombre", "Operador", "Orden", "Parte","Inicio", "Final", "Cantidad","Aptas", "Rechazos", "Terminadas", "Observaciones"]
    this.data = [];
    this.labores.forEach(l => {
      this.data.push([
        l.id,l.nombre,
        l.operador,
        l.nroorden,
        l.parte,
        new Date(this.datePipe.transform(l.inicio, 'yyyy-MM-dd HH:mm:ss')),
        new Date(this.datePipe.transform(l.final, 'yyyy-MM-dd HH:mm:ss')),
        l.aptas + l.rechazos,
      l.aptas,
      l.rechazos,
      l.terminadas?'Sí':'No',
      l.observacion
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
    let subTitleRow = worksheet.addRow(['Fecha : ' + this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm')])

    //Fila vacia 
    worksheet.addRow([]);

    //Encabezados
    let headerRow = worksheet.addRow(header);
    
    // Estilo de celda : Relleno y Borde
    headerRow.eachCell((cell, number) => {
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
      inicio.numFmt = 'DD/MM/YYYY HH:MM:SS';
      let final = row.getCell(7);
      final.numFmt = 'DD/MM/YYYY HH:MM:SS';
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

    worksheet.getColumn(1).width = 5;
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 10;
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(6).width = 21;
    worksheet.getColumn(7).width = 21;
    worksheet.getColumn(8).width = 8;
    worksheet.getColumn(9).width = 8;
    worksheet.getColumn(10).width = 8;
    worksheet.getColumn(11).width = 11;
    worksheet.getColumn(12).width = 60;
    worksheet.addRow([]);

    

    // worksheet.addBackgroundImage(logo);

   

    worksheet.mergeCells('A1:K2');// funde celda titulo
    worksheet.getCell('L,1').value = 'Mec-Parts';
    worksheet.mergeCells('L1:L2');
    worksheet.mergeCells('A3:L4');// funde celda fecha del reporte

    //Pie
    let footerRow = worksheet.addRow(['Generado por sistema. Total de registros: ' + this.data.length]);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    //Fundir Celdas
    worksheet.mergeCells(`A${footerRow.number}:L${footerRow.number}`);

    //Generar archivo de Excel con un nombre
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'parte_diario.xlsx');
    })

  }
}
