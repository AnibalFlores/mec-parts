import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Parte } from '../classes/parte';
import { Operario } from '../classes/operario';
import { Maquina } from '../classes/maquina';
import { Operacion } from '../classes/operacion';

/*import { Articulo } from '../classes/articulo';
import { Rubro } from '../classes/rubro';
import { Proveedor } from '../classes/proveedor';
import { Telefono } from '../classes/telefono';
import { Cliente } from '../classes/cliente';*/

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const baseUrl = 'https://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private httpCli: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  // Verbos para Terminales
  getTerminales() {
    return this.httpCli.get(baseUrl + '/api/terminales', httpOptions);
  }

  // Verbos para Estaciones
  getEstaciones() {
    return this.httpCli.get(baseUrl + '/api/estaciones', httpOptions);
  }

  // Verbos para Partes
  getPartes() {
    return this.httpCli.get(baseUrl + '/api/partes', httpOptions);
  }

  getParte(id: number): Observable<any> {
    return this.httpCli.get(baseUrl + '/api/parte/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  putParte(part: Parte) {
    return this.httpCli.put<Parte>(baseUrl + '/api/parteupdate/' + part.id, JSON.stringify(part), httpOptions);
  }

  newParte(part: Parte) {
    return this.httpCli.post<Parte>(baseUrl + '/api/partenueva/', JSON.stringify(part), httpOptions);
  }

  delParte(id: number) {
    return this.httpCli.delete(baseUrl + '/api/parteborrar/' + id, httpOptions);
  }

  // Verbos para Operarios
  getOperarios() {
    return this.httpCli.get(baseUrl + '/api/operarios', httpOptions);
  }

  getOperario(id: number): Observable<any> {
    return this.httpCli.get(baseUrl + '/api/operario/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  putOperario(ope: Operario) {
    return this.httpCli.put<Operario>(baseUrl + '/api/operarioupdate/' + ope.id, JSON.stringify(ope), httpOptions);
  }

  newOperario(ope: Operario) {
    return this.httpCli.post<Operario>(baseUrl + '/api/operarionuevo/', JSON.stringify(ope), httpOptions);
  }

  delOperario(id: number) {
    return this.httpCli.delete(baseUrl + '/api/operarioborrar/' + id, httpOptions);
  }

  // Verbos para Maquinas
  getMaquinas() {
    return this.httpCli.get(baseUrl + '/api/maquinas', httpOptions);
  }

  getMaquina(id: number): Observable<any> {
    return this.httpCli.get(baseUrl + '/api/maquina/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  putMaquina(maq: Maquina) {
    return this.httpCli.put<Operario>(baseUrl + '/api/maquinaupdate/' + maq.id, JSON.stringify(maq), httpOptions);
  }

  newMaquina(maq: Maquina) {
    return this.httpCli.post<Maquina>(baseUrl + '/api/maquinanueva/', JSON.stringify(maq), httpOptions);
  }

  delMaquina(id: number) {
    return this.httpCli.delete(baseUrl + '/api/maquinaborrar/' + id, httpOptions);
  }

  // Verbos para Operaciones
  getOperaciones() {
    return this.httpCli.get(baseUrl + '/api/operaciones', httpOptions);
  }

  getOperacion(id: number): Observable<any> {
    return this.httpCli.get(baseUrl + '/api/operacion/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  putOperacion(ope: Operacion) {
    return this.httpCli.put<Operario>(baseUrl + '/api/operacionupdate/' + ope.id, JSON.stringify(ope), httpOptions);
  }

  newOperacion(maq: Operacion) {
    return this.httpCli.post<Maquina>(baseUrl + '/api/operacionnueva/', JSON.stringify(maq), httpOptions);
  }

  delOperacion(id: number) {
    return this.httpCli.delete(baseUrl + '/api/operacionborrar/' + id, httpOptions);
  }

}
