import { Component, OnInit } from '@angular/core';
import { Listado } from 'src/app/classes/listado';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-borrar-listados',
  templateUrl: './borrar-listados.component.html',
  styleUrls: ['./borrar-listados.component.css']
})
export class BorrarListadosComponent implements OnInit {
  lis: Listado;
  titulo = '';

  constructor(
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.dataSrv.getListado(+this.ruta.snapshot.paramMap.get('id')).subscribe(
      (l: Listado) => {
        this.lis = l;
      },
      error => console.log(error));
    this.titulo = 'Borrar Listado';
  }

  borrar() {
    this.dataSrv.delListado(this.lis.id).subscribe(count => {
      alert('Listados Borrados ' + count);
      this.router.navigate(['/lista-listados']);
    });
  }

}
