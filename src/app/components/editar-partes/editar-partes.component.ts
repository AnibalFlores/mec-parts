import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Parte } from 'src/app/classes/parte';
import { Listado } from 'src/app/classes/listado';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editar-partes',
  templateUrl: './editar-partes.component.html',
  styleUrls: ['./editar-partes.component.css']
})
export class EditarPartesComponent implements OnInit {
  parteForm = new FormGroup({ listadoControl: new FormControl() });
  part: Parte;
  nuevo = false;
  titulo = '';
  listados: Listado[];
  enviado = false;
  admin = true;

  constructor(
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router, private authSrv: AuthService) {
    this.dataSrv.getListados().subscribe((l: Listado[]) => {
      this.listados = l;
    });
  }

  ngOnInit() {
    this.admin = !this.authSrv.isAdmin();
    this.nuevo = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].toString() === 'nueva-parte';
    if (this.nuevo) {
      this.part = new Parte();
      this.part.id = -1;
      this.part.codigo = '';
      this.part.activa = true;
      this.part.listado = new Listado();
      this.part.listado.id = 1;
      this.part.listado.nombre = 'MPXX';
      this.parteForm.controls['listadoControl'].setValue(1); // ponemos listado 1 = MPXX
      // console.log(this.part);
      this.titulo = 'Nueva Parte';
    } else {
      this.dataSrv.getParte(+this.ruta.snapshot.paramMap.get('id')).subscribe(
        (a: Parte) => {
          this.part = a;
          this.parteForm.controls['listadoControl'].setValue(this.part.listado.id);
          console.log(this.part.listado);
        },
        error => console.log(error));
      this.titulo = 'Editar Parte';
    }
  }

  // segun estemos editando o agregando hacemos put o post
  confirmado() {
    this.enviado = true;
    const i = this.parteForm.controls['listadoControl'].value;
    this.part.listado = this.listados.find(l => l.id === i);
    if (this.part.id !== -1) {
      this.guardarParte(); // put o patch
    } else {
      this.nuevaParte(); // post
    }

  }

  private guardarParte() {
    this.dataSrv.putParte(this.part).subscribe(
      (a) => this.router.navigate(['/lista-partes']),
      error => {
        alert('Error al guardar la parte: ' + error);
        this.enviado = true;
      }
    );
  }

  private nuevaParte() {
    this.part.id = null; // ponemos el -1 en null para que no explote
    this.dataSrv.newParte(this.part).subscribe(
      (a) => this.router.navigate(['/lista-partes']),
      error => {
        alert('Error al guardar la parte: ' + error);
        this.enviado = true;
      }
    );
  }

}
