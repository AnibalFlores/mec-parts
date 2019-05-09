import { Component, OnInit } from '@angular/core';
import { Maquina } from 'src/app/classes/maquina';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Terminal } from 'src/app/classes/terminal';

@Component({
  selector: 'app-editar-maquinas',
  templateUrl: './editar-maquinas.component.html',
  styleUrls: ['./editar-maquinas.component.css']
})
export class EditarMaquinasComponent implements OnInit {
  maquinaForm = new FormGroup({ tipoControl: new FormControl, terminalControl: new FormControl() });
  maquina: Maquina;
  nuevo = false;
  tipos = ['Máquina', 'Operación'];
  terminales: Terminal[];
  titulo = '';
  enviado = false;
  admin = true;

  constructor(
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router, private authSrv: AuthService) {
    this.dataSrv.getTerminales().subscribe((t: Terminal[]) => {
      this.terminales = t;
    });
  }

  ngOnInit() {
    this.admin = !this.authSrv.isAdmin();
    this.nuevo = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].toString() === 'nueva-maquina';
    if (this.nuevo) {
      this.maquina = new Maquina();
      this.maquina.id = -1;
      this.maquina.nombre = 'Sin nombre';
      this.maquinaForm.controls['tipoControl'].setValue('Máquina'); // pongamos tipo
      this.maquinaForm.controls['terminalControl'].setValue(1); // pongamos terminal 1 = Sin Terminal
      this.titulo = 'Nueva Máquina u Operación';
    } else {
      this.dataSrv.getMaquina(+this.ruta.snapshot.paramMap.get('id')).subscribe(
        (m: Maquina) => {
          this.maquina = m;
          this.maquinaForm.controls['tipoControl'].setValue(this.maquina.tipo);
          this.maquinaForm.controls['terminalControl'].setValue(this.maquina.terminal.id);
        },
        error => console.log(error));
      this.titulo = 'Editar Máquina u Operación';
    }
  }

  // segun estemos editando o agregando hacemos put o post
  confirmado() {
    this.enviado = true;
    const i = this.maquinaForm.controls['terminalControl'].value;
    this.maquina.terminal = this.terminales.find(t => t.id === i);
    this.maquina.tipo = this.maquinaForm.controls['tipoControl'].value;
    if (this.maquina.id !== -1) {
      this.guardarMaquina(); // put o patch
    } else {
      this.nuevaMaquina(); // post
    }

  }

  private guardarMaquina() {
    this.dataSrv.putMaquina(this.maquina).subscribe(
      (a) => this.router.navigate(['/lista-maquinas']),
      error => {
        alert('Error al guardar la máquina: ' + error);
        this.enviado = true;
      }
    );
  }

  private nuevaMaquina() {
    this.maquina.id = null; // ponemos el -1 en null para que no explote
    this.dataSrv.newMaquina(this.maquina).subscribe(
      (a) => this.router.navigate(['/lista-maquinas']),
      error => {
        alert('Error al guardar la máquina: ' + error);
        this.enviado = true;
      }
    );
  }

}


