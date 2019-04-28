import { Component, OnInit } from '@angular/core';
import { Terminal } from 'src/app/classes/terminal';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Observable, interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-status',
  templateUrl: './lista-status.component.html',
  styleUrls: ['./lista-status.component.css']
})

export class ListaStatusComponent implements OnInit {
  terminales: Terminal[];
  titulo = 'Estado de Terminales';
  ahora = new Date();
  private refresh: Subscription;

  constructor(private dataSrv: DataService, private router: Router) { }

  ngOnInit() {
    this.actualizaPagina();
    this.refresh = interval(10000).subscribe(
      (val) => {
        this.actualizaPagina()
      });
  }

  duracion(inicio: Date) {
    var ini = new Date(inicio);
    var timeDiff = new Date().getTime() - ini.getTime();
    var hours = Math.floor(timeDiff / (1000 * 60 * 60));
    timeDiff -= hours * (1000 * 60 * 60);
    var mins = Math.floor(timeDiff / (1000 * 60));
    timeDiff -= mins * (1000 * 60);
    var secs = Math.floor(timeDiff / 1000)
    timeDiff -= secs * 1000;
    return this.doblecero(hours) + ':' + this.doblecero(mins) + ':' + this.doblecero(secs);
  }

  private doblecero(n): String {
    var res: String;
    if (n < 10) {
      res = "0" + n;
    }else{res = n;}
    return res;
  }

  private actualizaPagina() {
    this.dataSrv.getTerminales().subscribe((ter: Terminal[]) => {
      this.ahora = new Date();
      this.terminales = ter;
    });
  }

  ngOnDestroy() {
    this.refresh.unsubscribe();
  }

}