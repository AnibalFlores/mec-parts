import { Component, OnInit } from '@angular/core';
import { Listado } from 'src/app/classes/listado';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-lista-listados',
  templateUrl: './lista-listados.component.html',
  styleUrls: ['./lista-listados.component.css']
})
export class ListaListadosComponent implements OnInit {
  listados: Listado[];
  titulo = 'Listados';

  constructor(private authSrv: AuthService, private dataSrv: DataService) { }

  ngOnInit() {
    this.dataSrv.getListados().subscribe((listados: Listado[]) => {
      this.listados = listados;
    });
  }

}
