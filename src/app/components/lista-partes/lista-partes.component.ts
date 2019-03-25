import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Parte } from 'src/app/classes/parte';
import { Subscription } from 'rxjs';
import { PartePagina } from 'src/app/classes/partepagina';


@Component({
  selector: 'app-lista-partes',
  templateUrl: './lista-partes.component.html',
  styleUrls: ['./lista-partes.component.css']
})
export class ListaPartesComponent implements OnInit, OnDestroy {

  partes: Parte[] = [];
  // subscription: Subscription;
  titulo = 'Partes';
  buscador = true;
  cantidad = 0;

  constructor(private authSrv: AuthService, private dataSrv: DataService) {
    // suscribimos a la lista de peliculas del data service
    // this.subscription = this.dataSrv.partes.subscribe(p => this.partes = p);
  }

  buscarTermino(query: string) {
    // buscar por texto
    if (query) {
      this.dataSrv.searchEntries(query)
        .subscribe((res: PartePagina) => {
          this.cantidad = res.cantidad;
          this.partes = res.partes;
        });
    } else {
      this.dataSrv.getPartes()
      .subscribe((res: PartePagina) => { this.cantidad = res.cantidad; this.partes = res.partes; });
    }
  }

  ngOnInit() {
    this.dataSrv.getPartes()
      .subscribe((res: PartePagina) => { this.cantidad = res.cantidad; this.partes = res.partes; });
  }

  ngOnDestroy() {
    // des-suscribimos al destruir el componente no se si en los otros me olvide
    // this.subscription.unsubscribe();
  }
}
