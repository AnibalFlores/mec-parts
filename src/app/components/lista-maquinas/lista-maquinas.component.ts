import { Component, OnInit } from '@angular/core';
import { Maquina } from 'src/app/classes/maquina';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-lista-maquinas',
  templateUrl: './lista-maquinas.component.html',
  styleUrls: ['./lista-maquinas.component.css']
})
export class ListaMaquinasComponent implements OnInit {
  maquinas: Maquina[];
  titulo = 'Máquinas y Operaciones';

  constructor(private authSrv: AuthService, private dataSrv: DataService) { }

  ngOnInit() {
    this.dataSrv.getMaquinas().subscribe((maq: Maquina[]) => {
      this.maquinas = maq;
    });
  }

}
