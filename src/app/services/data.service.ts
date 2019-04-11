import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Parte } from '../classes/parte';
import { Operario } from '../classes/operario';
import { Maquina } from '../classes/maquina';
import { Terminal } from '../classes/terminal';
import { Listado } from '../classes/listado';
import { ListadosPorMaquina } from '../classes/listadospormaquina';
import { PartePagina } from '../classes/partepagina';


const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  // private parte$ = new Subject<Parte[]>();

  // partes = this.parte$.asObservable();

  constructor(private httpCli: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  // Verbos para Terminales
  getTerminales() {
    return this.httpCli.get(baseUrl + '/api/terminales', httpOptions);
  }

  getTerminal(id: number): Observable<any> {
    return this.httpCli.get(baseUrl + '/api/terminal/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  putTerminal(term: Terminal) {
    return this.httpCli.put<Terminal>(baseUrl + '/api/terminalupdate/' + term.id, JSON.stringify(term), httpOptions);
  }

  newTerminal(term: Terminal) {
    return this.httpCli.post<Terminal>(baseUrl + '/api/terminalnuevo/', JSON.stringify(term), httpOptions);
  }

  delTerminal(id: number) {
    return this.httpCli.delete(baseUrl + '/api/terminalborrar/' + id, httpOptions);
  }

  newTerminalMaquinas(termid: number) {
    return this.httpCli.post<Terminal>(baseUrl + '/api/terminalnuevo/', JSON.stringify(termid), httpOptions);
  }

  // Verbos para Listados
  getListados() {
    return this.httpCli.get(baseUrl + '/api/listados', httpOptions);
  }

  getListado(id: number): Observable<any> {
    return this.httpCli.get(baseUrl + '/api/listado/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  putListado(listado: Listado) {
    return this.httpCli.put<Parte>(baseUrl + '/api/listadoupdate/' + listado.id, JSON.stringify(listado), httpOptions);
  }

  newListado(listado: Listado) {
    return this.httpCli.post<Listado>(baseUrl + '/api/listadonuevo/', JSON.stringify(listado), httpOptions);
  }

  delListado(id: number) {
    return this.httpCli.delete(baseUrl + '/api/listadoborrar/' + id, httpOptions);
  }

  // Verbos para Partes
  /*getPartes() {
    return this.httpCli.get(baseUrl + '/api/partes', httpOptions);
  }*/
  // Suscribimos un observable para poder hacer busquedas
  getPartes() {
    return this.httpCli.get<PartePagina>(baseUrl + '/api/partes', httpOptions); // .subscribe(p => this.parte$.next(p));
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

  newMaquinaListados(maqylistados: ListadosPorMaquina) {
    // crea un many to many entre maquinas y listados
    return this.httpCli.post<Maquina>(baseUrl + '/api/vincularmaquinalistados/', JSON.stringify(maqylistados), httpOptions);
  }

  // busqueda de partes
  searchEntries(term) {
    return this.httpCli.get<PartePagina>(baseUrl + '/api/partesporcodigo/' + term); // .subscribe(p => this.parte$.next(p));
  }

  // Verbos para labores
  getLabor(id: number): Observable<any> {
    return this.httpCli.get(baseUrl + '/api/labor/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  getLabores() {
    return this.httpCli.get(baseUrl + '/api/labores', httpOptions);
  }
}
