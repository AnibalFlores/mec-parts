import { Component, OnInit } from '@angular/core';
import { Listado } from 'src/app/classes/listado';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editar-listados',
  templateUrl: './editar-listados.component.html',
  styleUrls: ['./editar-listados.component.css']
})
export class EditarListadosComponent implements OnInit {
  listado: Listado;
  nuevo = false;
  titulo = '';
  enviado = false;
  admin = true;

  constructor(
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router, private authSrv: AuthService) {
  }

  ngOnInit() {
    this.admin = !this.authSrv.isAdmin();
    this.nuevo = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].toString() === 'nuevo-listado';
    if (this.nuevo) {
      this.listado = new Listado();
      this.listado.id = -1;
      this.listado.nombre = 'Sin nombre';
      this.listado.activo = true;
      this.titulo = 'Nuevo Listado';
    } else {
      this.dataSrv.getListado(+this.ruta.snapshot.paramMap.get('id')).subscribe(
        (l: Listado) => {
          this.listado = l;
        },
        error => console.log(error));
      this.titulo = 'Editar Listado';
    }
  }

  // segun estemos editando o agregando hacemos put o post
  confirmado() {
    this.enviado = true;
    if (this.listado.id !== -1) {
      this.guardarListado(); // put o patch
    } else {
      this.nuevoListado(); // post
    }

  }

  private guardarListado() {
    this.dataSrv.putListado(this.listado).subscribe(
      (a) => this.router.navigate(['/lista-listados']),
      error => {
        alert('Error al guardar el listado: ' + error);
        this.enviado = true;
      }
    );
  }

  private nuevoListado() {
    this.listado.id = null; // ponemos el -1 en null para que no explote
    this.dataSrv.newListado(this.listado).subscribe(
      (a) => this.router.navigate(['/lista-listados']),
      error => {
        alert('Error al guardar el listado: ' + error);
        this.enviado = true;
      }
    );
  }

}
