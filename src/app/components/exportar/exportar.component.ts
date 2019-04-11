import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.component.html',
  styleUrls: ['./exportar.component.css']
})
export class ExportarComponent implements OnInit {
 titulo = 'Exportar Datos';
 
  constructor(private excelService: ExcelService) {

  }

  ngOnInit() {
  }

  generarExcel() {
    this.excelService.generarExcel();
  }
}
