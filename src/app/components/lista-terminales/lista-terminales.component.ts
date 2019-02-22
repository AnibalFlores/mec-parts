import { Component, OnInit } from '@angular/core';
import { Terminal } from 'src/app/classes/terminal';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-lista-terminales',
  templateUrl: './lista-terminales.component.html',
  styleUrls: ['./lista-terminales.component.css']
})
export class ListaTerminalesComponent implements OnInit {
  terminales: Terminal[];
  titulo = 'Terminales';

  constructor(private authSrv: AuthService, private dataSrv: DataService) { }

  ngOnInit() {
    this.dataSrv.getTerminales().subscribe((ter: Terminal[]) => {
      this.terminales = ter;
    });
  }

}
