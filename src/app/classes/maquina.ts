import { Terminal } from './terminal';
import { Listado } from './listado';

export class Maquina {
    id: number;
    nombre: String;
    terminal: Terminal;
    listados: Listado[];
}
