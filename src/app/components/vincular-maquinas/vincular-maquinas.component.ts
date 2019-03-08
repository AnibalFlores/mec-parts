// https://blog.angularindepth.com/building-interactive-lists-with-the-new-angular-7-drag-and-drop-tool-5f2402f8cb27
// https://material.angular.io/cdk/drag-drop/overview

import { Component, OnInit, NgModule } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MaquinasPorTerminal } from 'src/app/classes/maquinasporterminal';
import { Terminal } from 'src/app/classes/terminal';
import { Maquina } from 'src/app/classes/maquina';

@Component({
  selector: 'app-vincular-maquinas',
  templateUrl: './vincular-maquinas.component.html',
  styleUrls: ['./vincular-maquinas.component.css']
})
export class VincularMaquinasComponent implements OnInit {
  vinculoForm = new FormGroup({ terminalControl: new FormControl() });
  titulo = 'Asociar Máquinas a un Terminal';
  maquinas_terminal = new MaquinasPorTerminal();
  terminales: Terminal[] = [];
  maquinas: Maquina[] = [];
  listadoDisponibles: Maquina[] = [];
  items: MaquinasPorTerminal[] = [];
  seleccion = true;
  term: Terminal;
  enviado = false;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(this.maquinas, event.previousIndex, event.currentIndex);
    }
  }

  constructor(private dataSrv: DataService, private router: Router) {
    this.maquinas_terminal.terminal = this.term;
    this.maquinas_terminal.maquinas = this.maquinas;
  }

  siguiente() {
    // Preguntamos si hay un terminal seleccionado y al menos una máquinaa para vincular
    if (this.vinculoForm.controls['terminalControl'].value !== null && this.maquinas.length !== 0) {
      this.term = this.terminales.find(t => t.id === this.vinculoForm.controls['terminalControl'].value);
      this.cargarItems();
      this.seleccion = false;
    } else {
      alert('Debe seleccionar una terminal y al menos una máquina.\nVuelva a intentar.');
    }
  }

  private cargarItems() {
    const items = new MaquinasPorTerminal();
    items.terminal = this.term;
    for (let i = 0; i < this.maquinas.length; i++) {
      items.maquinas.push(this.maquinas[i]);
    }
  }

  Confirmar() {
    this.enviado = true;
    // this.factura.items = this.items;
    // this.prov.facturas = [this.factura];

    this.dataSrv.newTerminalMaquinas(this.term.id)
      .subscribe(
        term => {
          alert('Registro de Maquinas creado.');
          this.router.navigate(['/vervinculoterminalmaquinas/' + term.id]);
        },
        (error: HttpErrorResponse)  => {
          alert(
            'Error: Verifique Terminal y maquinas elegidas\n' +
            'Status: ' + error.status + '\n' +
            'Status Text: ' + error.statusText + '\n' +
            'Mensaje del Servidor: ' + error.error.name
          );
          this.enviado = false;
        }
      );
  }

  Cancelar() {
    this.seleccion = true;
    this.enviado = false;
    this.maquinas = [];
    this.items = [];
    this.ngOnInit();
    // console.log('cancelado...');

  }

  ngOnInit() {
    this.dataSrv.getMaquinas().subscribe((m: Maquina[]) => this.listadoDisponibles = m);
    this.dataSrv.getTerminales().subscribe((t: Terminal[]) => this.terminales = t);
  }
}
