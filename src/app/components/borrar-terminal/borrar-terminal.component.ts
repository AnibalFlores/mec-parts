import { Component, OnInit } from '@angular/core';
import { Terminal } from 'src/app/classes/terminal';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-borrar-terminal',
  templateUrl: './borrar-terminal.component.html',
  styleUrls: ['./borrar-terminal.component.css']
})
export class BorrarTerminalComponent implements OnInit {
  term: Terminal;
  titulo = '';

  constructor(
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.dataSrv.getTerminal(+this.ruta.snapshot.paramMap.get('id')).subscribe(
      (t: Terminal) => {
        this.term = t;
      },
      error => console.log(error));
    this.titulo = 'Borrar Terminal';
  }

  borrar() {
    this.dataSrv.delTerminal(this.term.id).subscribe(count => {
      alert('Terminales Borradas ' + count);
      this.router.navigate(['/lista-terminales']);
    });
  }

}
