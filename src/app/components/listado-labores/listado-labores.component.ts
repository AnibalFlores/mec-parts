import { Component, OnInit } from '@angular/core';
import { Labor } from 'src/app/classes/labor';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-listado-labores',
  templateUrl: './listado-labores.component.html',
  styleUrls: ['./listado-labores.component.css']
})
export class ListadoLaboresComponent implements OnInit {
  labores: Labor[];
  titulo = 'Partes Diarios';

  constructor(private authSrv: AuthService, private dataSrv: DataService) { }

  ngOnInit() {
    this.dataSrv.getLabores().subscribe((lab: Labor[]) => {
      this.labores = lab;
    });
  }

}
