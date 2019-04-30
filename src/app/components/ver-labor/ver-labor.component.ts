import { Component, OnInit } from '@angular/core';
import { Labor } from 'src/app/classes/labor';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ver-labor',
  templateUrl: './ver-labor.component.html',
  styleUrls: ['./ver-labor.component.css']
})
export class VerLaborComponent implements OnInit {
  lab: Labor;
  titulo = '';

  constructor(
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.dataSrv.getLabor(+this.ruta.snapshot.paramMap.get('id')).subscribe(
      (t: Labor) => {
        this.lab = t;
      },
      error => console.log(error));
    this.titulo = 'Detalles de la labor';
  }

}
