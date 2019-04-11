import { Component, OnInit } from '@angular/core';
import { Terminal } from 'src/app/classes/terminal';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-lista-status',
  templateUrl: './lista-status.component.html',
  styleUrls: ['./lista-status.component.css']
})
export class ListaStatusComponent implements OnInit {
  terminales: Terminal[];
  titulo = 'Estado de Terminales';

  constructor(private authSrv: AuthService, private dataSrv: DataService) { }

  ngOnInit() {
    this.dataSrv.getTerminales().subscribe((ter: Terminal[]) => {
      this.terminales = ter;
    });
  }

}