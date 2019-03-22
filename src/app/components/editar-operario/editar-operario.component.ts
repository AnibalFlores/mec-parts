import { Component, OnInit } from '@angular/core';
import { Operario } from 'src/app/classes/operario';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editar-operario',
  templateUrl: './editar-operario.component.html',
  styleUrls: ['./editar-operario.component.css']
})
export class EditarOperarioComponent implements OnInit {

  operario: Operario;
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
    this.nuevo = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].toString() === 'nuevo-operario';
    if (this.nuevo) {
      this.operario = new Operario();
      this.operario.id = -1;
      this.operario.nombre = 'Sin nombre';
      this.operario.apellido = 'Sin apellido';
      this.operario.activo = true;
      this.titulo = 'Nuevo Operario';
    } else {
      this.dataSrv.getOperario(+this.ruta.snapshot.paramMap.get('id')).subscribe(
        (o: Operario) => {
          this.operario = o;
        },
        error => console.log(error));
      this.titulo = 'Editar Operario';
    }
  }

  // segun estemos editando o agregando hacemos put o post
  confirmado() {
    this.enviado = true;
    if (this.operario.id !== -1) {
      this.guardarOperario(); // put o patch
    } else {
      this.nuevoOperario(); // post
    }

  }

  private guardarOperario() {
    this.dataSrv.putOperario(this.operario).subscribe(
      (a) => this.router.navigate(['/lista-operarios']),
      error => {
        alert('Error al guardar el operario: ' + error);
        this.enviado = true;
      }
    );
  }

  private nuevoOperario() {
    this.operario.id = null; // ponemos el -1 en null para que no explote
    this.dataSrv.newOperario(this.operario).subscribe(
      (a) => this.router.navigate(['/lista-operarios']),
      error => {
        alert('Error al guardar el operario: ' + error);
        this.enviado = true;
      }
    );
  }

}
