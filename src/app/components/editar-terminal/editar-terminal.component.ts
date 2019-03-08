import { Component, OnInit } from '@angular/core';
import { Terminal } from 'src/app/classes/terminal';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editar-terminal',
  templateUrl: './editar-terminal.component.html',
  styleUrls: ['./editar-terminal.component.css']
})
export class EditarTerminalComponent implements OnInit {

  terminal: Terminal;
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
    this.nuevo = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].toString() === 'nuevo-terminal';
    if (this.nuevo) {
      this.terminal = new Terminal();
      this.terminal.id = -1;
      this.terminal.nombre = 'Sin nombre';
      this.titulo = 'Nueva Máquina';
    } else {
      this.dataSrv.getTerminal(+this.ruta.snapshot.paramMap.get('id')).subscribe(
        (t: Terminal) => {
          this.terminal = t;
        },
        error => console.log(error));
      this.titulo = 'Editar Terminal';
    }
  }

  // segun estemos editando o agregando hacemos put o post
  confirmado() {
    this.enviado = true;
    if (this.terminal.id !== -1) {
      this.guardarTerminal(); // put o patch
    } else {
      this.nuevoTerminal(); // post
    }

  }

  private guardarTerminal() {
    this.dataSrv.putTerminal(this.terminal).subscribe(
      (a) => this.router.navigate(['/lista-terminales']),
      error => {
        alert('Error al guardar el terminal: ' + error);
        this.enviado = true;
      }
    );
  }

  private nuevoTerminal() {
    this.terminal.id = null; // ponemos el -1 en null para que no explote
    this.dataSrv.newTerminal(this.terminal).subscribe(
      (a) => this.router.navigate(['/lista-terminales']),
      error => {
        alert('Error al guardar el terminal: ' + error);
        this.enviado = true;
      }
    );
  }

}
