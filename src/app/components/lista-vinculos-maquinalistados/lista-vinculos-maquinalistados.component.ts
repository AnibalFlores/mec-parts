import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Maquina } from 'src/app/classes/maquina';

@Component({
  selector: 'app-lista-vinculos-maquinalistados',
  templateUrl: './lista-vinculos-maquinalistados.component.html',
  styleUrls: ['./lista-vinculos-maquinalistados.component.css']
})
export class ListaVinculosMaquinalistadosComponent implements OnInit {

  maquinas: Maquina[];
  titulo = 'Resumen Máquinas y Listados de partes';
  vendedor = false;
  isFirstOpen = true;

  constructor(private authSrv: AuthService, private dataSrv: DataService) { }

  ngOnInit() {
    this.dataSrv.getMaquinas().subscribe((m: Maquina[]) => {
      this.maquinas = m;
    });
    this.vendedor = this.authSrv.isVenta();
  }

}
