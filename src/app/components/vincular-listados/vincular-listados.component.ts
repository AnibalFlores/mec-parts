import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Maquina } from 'src/app/classes/maquina';
import { Listado } from 'src/app/classes/listado';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ListadosPorMaquina } from 'src/app/classes/listadospormaquina';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-vincular-listados',
  templateUrl: './vincular-listados.component.html',
  styleUrls: ['./vincular-listados.component.css']
})
export class VincularListadosComponent implements OnInit {
  vinculoForm = new FormGroup({ maquinaControl: new FormControl() });
  titulo = 'Asociar Máquinas a un Terminal';
  listados_maquina = new ListadosPorMaquina();
  maquinas: Maquina[] = [];
  listados: Listado[] = [];
  listadosDisponibles: Listado[] = [];
  items: ListadosPorMaquina[] = [];
  seleccion = true;
  maq: Maquina;
  enviado = false;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(this.maquinas, event.previousIndex, event.currentIndex);
    }
  }

  constructor(private dataSrv: DataService, private router: Router) {
    this.listados_maquina.maquina = this.maq;
    this.listados_maquina.listados = this.listados;
  }

  siguiente() {
    // Preguntamos si hay una maquina seleccionada y al menos un listado para vincular
    if (this.vinculoForm.controls['maquinaControl'].value !== null && this.listados.length !== 0) {
      this.maq = this.maquinas.find(m => m.id === this.vinculoForm.controls['maquinaControl'].value);
      this.cargarItems();
      this.seleccion = false;
    } else {
      alert('Seleccione una máquina u operación y al menos un listado.\nVuelva a intentar.');
    }
  }

  private cargarItems() {
    const items = new ListadosPorMaquina();
    items.maquina = this.maq;
    items.listados = [];
    for (let i = 0; i < this.listados.length; i++) {
      items.listados.push(this.listados[i]);
    }
  }

  Confirmar() {
    this.enviado = true;
    this.listados_maquina.maquina = this.maq;
    this.dataSrv.newMaquinaListados(this.listados_maquina)
      .subscribe(
        maq => {
          alert('Registro de vínculo para listados de ' + maq.nombre + ' creado.');
          this.router.navigate(['/lista-vinculos-maquinas-listados/']);
        },
        (error: HttpErrorResponse)  => {
          alert(
            'Error: Verifique Máquina y listados elegidos\n' +
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
    this.dataSrv.getListados().subscribe((l: Listado[]) => this.listadosDisponibles = l);
    this.dataSrv.getMaquinas().subscribe((m: Maquina[]) => this.maquinas = m);
  }
}
